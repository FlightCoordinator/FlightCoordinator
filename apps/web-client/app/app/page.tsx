import { Metadata } from "next";

import AppRootPageContents from "@/components/page-content/AppRootPageContents";

export const metadata: Metadata = {
  title: "Main Page",
};

const AppRootPage = () => {
  return <AppRootPageContents />;
};

export default AppRootPage;
