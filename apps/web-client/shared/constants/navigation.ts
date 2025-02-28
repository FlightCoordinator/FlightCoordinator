import {
  ClipboardCheck,
  LucideProps,
  Luggage,
  Plane,
  PlaneTakeoff,
  RefreshCcw,
  SearchCheck,
  SmartphoneNfc,
  TowerControl,
  UserRound,
} from "lucide-react";

interface NavigationProps {
  sectionKey: string;
  sectionLabel: string;
  sectionItems: {
    key: string;
    label: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  }[];
}

const navigation: NavigationProps[] = [
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
        key: "app/algorithm/run",
        label: "Algorithm Runs",
        icon: RefreshCcw,
      },
      {
        key: "app/algorithm/result",
        label: "Algorithm Results",
        icon: SearchCheck,
      },
    ],
  },
  {
    sectionKey: "aircraft",
    sectionLabel: "Aircraft",
    sectionItems: [
      {
        key: "app/plane",
        label: "Plane",
        icon: Plane,
      },
      {
        key: "app/model",
        label: "Plane Model",
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
        icon: PlaneTakeoff,
      },
    ],
  },
  {
    sectionKey: "datasource",
    sectionLabel: "Data Source",
    sectionItems: [
      {
        key: "app/external-apis",
        label: "External APIs",
        icon: SmartphoneNfc,
      },
    ],
  },
];

export default navigation;
