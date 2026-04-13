import {
  FunctionComponent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@mui/material";
import { ApiError } from "../lib/api/client";
import {
  CHAT_GATEWAY_ERROR_MESSAGE,
  getSaraConversation,
  isGatewayErrorBody,
  sendSaraChatMessage,
  type SaraChatAttachment,
  type SaraChatAttachmentContentType,
} from "../lib/services/sara-chat.service";
import { useLandingTranslations } from "../hooks/useLandingTranslations";
import styles from "./sara-assist-widget.module.css";

const CHAT_SESSION_STORAGE_KEY = "inxora_chat_session_id";
const CHAT_MESSAGES_STORAGE_KEY = "inxora_chat_messages";

const MAX_IMAGES = 5;
const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set<SaraChatAttachmentContentType>([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type ChatRole = "user" | "assistant" | "asesor";

type ChatMessage = {
  role: ChatRole;
  content: string;
  attachmentPreviews?: string[];
};

type PendingAttachment = {
  id: string;
  content_type: SaraChatAttachmentContentType;
  data: string;
  preview: string;
};

function normalizeOutgoingChatInput(raw: string): string {
  return raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      const i = data.indexOf(",");
      resolve(i >= 0 ? data.slice(i + 1) : data);
    };
    reader.onerror = () => reject(reader.error ?? new Error("read"));
    reader.readAsDataURL(file);
  });
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const markdownComponents = {
  a: ({
    href,
    children,
  }: {
    href?: string;
    children?: ReactNode;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.mdLink}
    >
      {children}
    </a>
  ),
};

export const SaraAssistWidget: FunctionComponent = () => {
  const t = useLandingTranslations();
  const a = t.assistance;
  const panelTitleId = useId();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachmentsRef = useRef(attachments);
  attachmentsRef.current = attachments;

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = listRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sessionId = sessionStorage.getItem(CHAT_SESSION_STORAGE_KEY);
    if (sessionId) {
      getSaraConversation(sessionId)
        .then((res) => {
          const msgs = res?.data?.mensajes;
          if (Array.isArray(msgs) && msgs.length > 0) {
            const valid = msgs.filter(
              (m): m is ChatMessage =>
                m &&
                typeof m === "object" &&
                (m.role === "user" ||
                  m.role === "assistant" ||
                  m.role === "asesor") &&
                typeof m.content === "string"
            );
            if (valid.length > 0) {
              setMessages(valid);
              sessionStorage.setItem(
                CHAT_MESSAGES_STORAGE_KEY,
                JSON.stringify(valid)
              );
            }
          }
        })
        .catch(() => {
          const raw = sessionStorage.getItem(CHAT_MESSAGES_STORAGE_KEY);
          if (!raw) return;
          try {
            const parsed = JSON.parse(raw) as unknown;
            if (
              Array.isArray(parsed) &&
              parsed.every(
                (m) =>
                  m &&
                  typeof m === "object" &&
                  "role" in m &&
                  "content" in m
              )
            ) {
              setMessages(parsed as ChatMessage[]);
            }
          } catch {
            /* ignore */
          }
        });
    } else {
      const raw = sessionStorage.getItem(CHAT_MESSAGES_STORAGE_KEY);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (m) =>
              m && typeof m === "object" && "role" in m && "content" in m
          )
        ) {
          setMessages(parsed as ChatMessage[]);
        }
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || messages.length === 0) return;
    sessionStorage.setItem(
      CHAT_MESSAGES_STORAGE_KEY,
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, messages, loading, scrollToBottom]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const getStoredSessionId = useCallback((): string | null => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(CHAT_SESSION_STORAGE_KEY);
  }, []);

  const addImageFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      setError(null);
      const toAdd: PendingAttachment[] = [];
      const startLen = attachmentsRef.current.length;
      for (let i = 0; i < files.length; i++) {
        if (startLen + toAdd.length >= MAX_IMAGES) break;
        const file = files[i];
        const ct = file.type as SaraChatAttachmentContentType;
        if (!ALLOWED_IMAGE_TYPES.has(ct)) {
          setError(a.error422);
          return;
        }
        if (file.size > MAX_BYTES) {
          setError(a.error422);
          return;
        }
        try {
          const data = await readFileAsBase64(file);
          const preview = `data:${ct};base64,${data}`;
          toAdd.push({
            id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2)}`,
            content_type: ct,
            data,
            preview,
          });
        } catch {
          setError(a.errorGeneric);
          return;
        }
      }
      if (toAdd.length) {
        setAttachments((p) => [...p, ...toAdd].slice(0, MAX_IMAGES));
      }
    },
    [a.error422, a.errorGeneric]
  );

  const sendMessage = useCallback(async () => {
    const text = normalizeOutgoingChatInput(input);
    const hasAtt = attachments.length > 0;
    if ((!text && !hasAtt) || loading) return;

    const apiAttachments: SaraChatAttachment[] | undefined = hasAtt
      ? attachments.map((x) => ({
          content_type: x.content_type,
          data: x.data,
        }))
      : undefined;
    const previews = attachments.map((x) => x.preview);
    const parts: string[] = [];
    if (text) parts.push(text);
    if (hasAtt) parts.push(`[${attachments.length} imagen(es)]`);
    const userContent = parts.join("\n");

    setInput("");
    setAttachments([]);
    setError(null);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userContent, attachmentPreviews: previews },
    ]);
    setLoading(true);
    scrollToBottom();

    const sid = getStoredSessionId();
    try {
      const res = await sendSaraChatMessage(
        text || "",
        sid ?? undefined,
        apiAttachments
      );
      if (res.session_id && typeof window !== "undefined") {
        sessionStorage.setItem(CHAT_SESSION_STORAGE_KEY, res.session_id);
      }
      let responseText = res.response;
      if (isGatewayErrorBody(responseText)) {
        responseText = CHAT_GATEWAY_ERROR_MESSAGE;
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: responseText },
      ]);
      scrollToBottom();
    } catch (e) {
      let msg = a.errorGeneric;
      if (e instanceof ApiError) {
        if (e.status === 422) msg = a.error422;
        else msg = e.message || msg;
      } else if (e instanceof Error && e.name === "AbortError") {
        msg = a.gatewayError;
      }
      if (isGatewayErrorBody(msg)) msg = a.gatewayError;
      setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
      scrollToBottom();
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [
    a.error422,
    a.errorGeneric,
    a.gatewayError,
    attachments,
    getStoredSessionId,
    input,
    loading,
    scrollToBottom,
  ]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const openPanel = () => {
    setError(null);
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const canSend =
    (normalizeOutgoingChatInput(input).length > 0 || attachments.length > 0) &&
    !loading;

  return (
    <div className={styles.anchor}>
      {!open ? (
        <>
          <Button
            className={styles.launcherButton}
            variant="contained"
            disableElevation
            onClick={openPanel}
          >
            {a.label}
          </Button>
          <img
            className={styles.spacerIcon}
            alt=""
            src="/Spacer@2x.png"
            onClick={openPanel}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPanel();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={a.openChatAria}
          />
        </>
      ) : (
        <section
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby={panelTitleId}
        >
          <header className={styles.header}>
            <img
              className={styles.headerAvatar}
              alt=""
              src="/Spacer@2x.png"
            />
            <div className={styles.headerText}>
              <h2 className={styles.headerTitle} id={panelTitleId}>
                {a.chatTitle}
              </h2>
              <p className={styles.headerSubtitle}>{a.chatSubtitle}</p>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              aria-label={a.closeAria}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </header>

          {error ? (
            <div className={styles.errorBar} role="alert">
              {error}
            </div>
          ) : null}

          <div ref={listRef} className={styles.messages}>
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const rowClass = isUser
                ? `${styles.bubbleRow} ${styles.bubbleRowUser}`
                : `${styles.bubbleRow} ${styles.bubbleRowAssistant}`;
              const bubbleClass = isUser
                ? `${styles.bubble} ${styles.bubbleUser}`
                : `${styles.bubble} ${styles.bubbleAssistant}`;
              return (
                <div key={i} className={rowClass}>
                  <div className={bubbleClass}>
                    {m.attachmentPreviews?.length ? (
                      <div className={styles.previewRow}>
                        {m.attachmentPreviews.map((src) => (
                          <img
                            key={src}
                            className={styles.previewImg}
                            src={src}
                            alt=""
                          />
                        ))}
                      </div>
                    ) : null}
                    {isUser ? (
                      <span style={{ whiteSpace: "pre-wrap" }}>
                        {m.content}
                      </span>
                    ) : (
                      <ReactMarkdown components={markdownComponents}>
                        {m.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              );
            })}
            {loading ? (
              <div className={styles.typing}>{a.typing}</div>
            ) : null}
          </div>

          <div className={styles.inputArea}>
            <div className={styles.inputShell}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className={styles.hiddenFile}
                tabIndex={-1}
                onChange={(e) => {
                  void addImageFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                className={styles.attachBtn}
                aria-label={a.attachAria}
                disabled={loading || attachments.length >= MAX_IMAGES}
                onClick={() => fileInputRef.current?.click()}
              >
                <PaperclipIcon />
              </button>
              <textarea
                ref={inputRef}
                className={styles.textarea}
                rows={1}
                placeholder={a.inputPlaceholder}
                value={input}
                disabled={loading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <button
                type="button"
                className={styles.sendBtn}
                aria-label={a.sendAria}
                disabled={!canSend}
                onClick={() => void sendMessage()}
              >
                <SendIcon />
              </button>
            </div>
          </div>

          <p className={styles.disclaimer}>{a.disclaimer}</p>
        </section>
      )}
    </div>
  );
};
