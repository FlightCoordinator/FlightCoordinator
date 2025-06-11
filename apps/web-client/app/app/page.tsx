import { Metadata } from "next";

import { RootPageContents } from "@/components/page-content/root-page-contents";

export const metadata: Metadata = {
  title: "Main Page",
};

const AppRootPage = () => {
  return <RootPageContents />;
};

export default AppRootPage;
