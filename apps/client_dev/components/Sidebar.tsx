import React from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Bus,
  ClipboardCheck,
  Luggage,
  Plane,
  PlaneTakeoff,
  RefreshCcw,
  Route,
  SearchCheck,
  TowerControl,
  UserRound,
} from "lucide-react";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./base-ui/sidebar";

interface SectionProps {
  key: string;
  label: string;
  items: {
    key: string;
    label: string;
    icon: React.ReactNode;
  }[];
}

const sections: SectionProps[] = [
  {
    key: "algorithm",
    label: "Algorithm",
    items: [
      {
        key: "algorithm/run",
        label: "Algorithm Runs",
        icon: <RefreshCcw />,
      },
      {
        key: "algorithm/result",
        label: "Algorithm Results",
        icon: <SearchCheck />,
      },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    items: [
      {
        key: "plane",
        label: "Plane",
        icon: <Plane />,
      },
      {
        key: "vehicle",
        label: "Vehicle",
        icon: <Bus />,
      },
      {
        key: "flight",
        label: "Flight",
        icon: <Luggage />,
      },
      {
        key: "route",
        label: "Route",
        icon: <Route />,
      },
      {
        key: "crew",
        label: "Crew",
        icon: <UserRound />,
      },
      {
        key: "certification",
        label: "Certification",
        icon: <ClipboardCheck />,
      },
      {
        key: "airport",
        label: "Airport",
        icon: <TowerControl />,
      },
      {
        key: "runway",
        label: "Runway",
        icon: <PlaneTakeoff />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <SidebarComponent>
      <SidebarHeader>
        <Image src="/images/logo.png" alt="Flight Coordinator Logo" width={64} height={64} />
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.key}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton asChild>
                      <Link href={"/" + item.key}>
                        {item.icon} {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
