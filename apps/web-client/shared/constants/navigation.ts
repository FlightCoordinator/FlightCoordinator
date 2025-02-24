import {
  Bus,
  ClipboardCheck,
  LucideProps,
  Luggage,
  Plane,
  PlaneTakeoff,
  RefreshCcw,
  Route,
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
    sectionKey: "algorithm",
    sectionLabel: "Algorithm",
    sectionItems: [
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
    sectionKey: "resources",
    sectionLabel: "Resources",
    sectionItems: [
      {
        key: "app/plane",
        label: "Plane",
        icon: Plane,
      },
      {
        key: "app/vehicle",
        label: "Vehicle",
        icon: Bus,
      },
      {
        key: "app/flight",
        label: "Flight",
        icon: Luggage,
      },
      {
        key: "app/route",
        label: "Route",
        icon: Route,
      },
      {
        key: "app/crew",
        label: "Crew",
        icon: UserRound,
      },
      {
        key: "app/certification",
        label: "Certification",
        icon: ClipboardCheck,
      },
      {
        key: "app/airport",
        label: "Airport",
        icon: TowerControl,
      },
      {
        key: "app/runway",
        label: "Runway",
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
