"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarNavigation } from "@/shared/constants/navigation";

import {
  Sidebar,
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
import SettingsDialog from "./SettingsDialog";

const MainSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="none" className="border-r h-dvh w-[18rem]">
      <SidebarHeader>
        <Link className="flex flex-row items-center justify-start gap-2 overflow-hidden" href={"/app"}>
          <Image src="/images/logo.png" alt="Flight Coordinator Logo" width={48} height={48} />
          <h1 className="text-xl leading-none tracking-tight font-semibold select-none">
            Flight <br /> Coordinator
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {sidebarNavigation.map((section) => (
          <SidebarGroup key={section.sectionKey}>
            <SidebarGroupLabel>{section.sectionLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.sectionItems.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton asChild isActive={"/" + item.key === pathname}>
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
      <SidebarFooter className="border-t">
        <SettingsDialog />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default MainSidebar;
