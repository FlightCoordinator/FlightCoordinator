import {
  ClipboardCheck,
  FlipHorizontal,
  Logs,
  LucideProps,
  Luggage,
  Plane,
  PlaneTakeoff,
  TicketsPlane,
  TowerControl,
  UserRound,
} from "lucide-react";

interface SidebarNavigationProps {
  sectionKey: string;
  sectionLabel: string;
  sectionItems: {
    key: string;
    label: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  }[];
}

interface LandingNavigationProps {
  key: string;
  label: string;
  link: string;
  isExternal: boolean;
}

export const sidebarNavigation: SidebarNavigationProps[] = [
  {
    sectionKey: "main",
    sectionLabel: "Main",
    sectionItems: [
      {
        key: "app/flight",
        label: "Flights",
        icon: Luggage,
      },
      {
        key: "app/flight-plan",
        label: "Flight Plan",
        icon: TicketsPlane,
      },
    ],
  },
  {
    sectionKey: "aircraft",
    sectionLabel: "Aircraft",
    sectionItems: [
      {
        key: "app/plane",
        label: "Plane Details",
        icon: Logs,
      },
      {
        key: "app/model",
        label: "Plane Models",
        icon: Plane,
      },
    ],
  },
  {
    sectionKey: "crew",
    sectionLabel: "Crew",
    sectionItems: [
      {
        key: "app/crew",
        label: "Crew Members",
        icon: UserRound,
      },
      {
        key: "app/certification",
        label: "Crew Certifications",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    sectionKey: "infrastructure",
    sectionLabel: "Infrastructure",
    sectionItems: [
      {
        key: "app/airport",
        label: "Airport Details",
        icon: TowerControl,
      },
      {
        key: "app/runway",
        label: "Runway Details",
        icon: PlaneTakeoff,
      },
      {
        key: "app/taxiway",
        label: "Taxiway Details",
        icon: FlipHorizontal,
      },
    ],
  },
];

export const landingNavigation: LandingNavigationProps[] = [
  {
    key: "homepage",
    label: "Homepage",
    link: "/",
    isExternal: false,
  },
  {
    key: "docs",
    label: "Documentation",
    link: "/",
    isExternal: false,
  },
  {
    key: "repository",
    label: "Repository",
    link: "https://github.com/FlightCoordinator/FlightCoordinator",
    isExternal: true,
  },
];
