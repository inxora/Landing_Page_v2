/**
 * Chat Sara Xora — mismo contrato que ecommerce-inxora (POST /api/chat/).
 */
import { apiClient } from "../api/client";

const CHAT_BASE = "/api/chat";
const CHAT_TIMEOUT_MS = 90000;

export type SaraChatAttachmentContentType = "image/jpeg" | "image/png" | "image/webp";

export interface SaraChatAttachment {
  content_type: SaraChatAttachmentContentType;
  data: string;
}

export interface SaraChatRequest {
  user_message: string;
  session_id?: string;
  id_cliente?: number;
  moneda_usuario?: string;
  attachments?: SaraChatAttachment[];
}

export interface SaraChatResponse {
  response: string;
  session_id: string;
}

export interface SaraMensaje {
  role: "user" | "assistant" | "asesor";
  content: string;
}

export interface SaraConversacionResponse {
  success: boolean;
  data: {
    session_id: string;
    mensajes: SaraMensaje[];
    [key: string]: unknown;
  };
}

export async function getSaraConversation(
  sessionId: string
): Promise<SaraConversacionResponse> {
  return apiClient<SaraConversacionResponse>(
    `${CHAT_BASE}/sesion/${encodeURIComponent(sessionId)}`,
    { method: "GET", timeout: 15000 }
  );
}

export async function sendSaraChatMessage(
  userMessage: string,
  sessionId?: string,
  attachments?: SaraChatAttachment[]
): Promise<SaraChatResponse> {
  const body: SaraChatRequest = {
    user_message: userMessage,
    ...(sessionId && { session_id: sessionId }),
    ...(attachments && attachments.length > 0 && { attachments }),
  };
  return apiClient<SaraChatResponse>(`${CHAT_BASE}/`, {
    method: "POST",
    body: JSON.stringify(body),
    timeout: CHAT_TIMEOUT_MS,
  });
}

export const CHAT_GATEWAY_ERROR_MESSAGE =
  "La solicitud tardó demasiado. Por favor, intente de nuevo. Si envió una imagen, puede probar con una más pequeña o sin imagen.";

export function isGatewayErrorBody(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  const t = text.trim().toLowerCase();
  return (
    t.includes("<html") ||
    t.includes("<head") ||
    t.includes("504") ||
    t.includes("502") ||
    t.includes("503") ||
    t.includes("gateway time-out") ||
    t.includes("bad gateway") ||
    t.includes("service unavailable")
  );
}
