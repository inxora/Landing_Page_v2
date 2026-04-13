import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import SeoHead from "../components/seo-head";
import { SaraAssistWidget } from "../components/sara-assist-widget";

const SiteLayout: FunctionComponent = () => {
  return (
    <>
      <SeoHead />
      <Outlet />
      <SiteFooter />
      <SiteHeader />
      <SaraAssistWidget />
    </>
  );
};

export default SiteLayout;
