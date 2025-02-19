import React from "react";

import Image from "next/image";
import Link from "next/link";

import navigation from "@/shared/constants/navigation";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../base-ui/sidebar";

const Sidebar = () => {
  return (
    <SidebarComponent collapsible="none" className="border-r h-dvh">
      <SidebarHeader>
        <div className="flex flex-row items-center justify-start gap-2 overflow-hidden">
          <Image src="/images/logo.png" alt="Flight Coordinator Logo" width={48} height={48} />
          <h1 className="text-xl leading-none tracking-tight font-semibold select-none">
            Flight
            <br />
            Coordinator
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((section) => (
          <SidebarGroup key={section.sectionKey}>
            <SidebarGroupLabel>{section.sectionLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.sectionItems.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton asChild>
                      <Link href={"/" + item.key}>
                        <item.icon /> {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>User details and settings modal</SidebarFooter>
      <SidebarRail />
    </SidebarComponent>
  );
};

export default Sidebar;
