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
        key: "algorithm/run",
        label: "Algorithm Runs",
        icon: RefreshCcw,
      },
      {
        key: "algorithm/result",
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
        key: "plane",
        label: "Plane",
        icon: Plane,
      },
      {
        key: "vehicle",
        label: "Vehicle",
        icon: Bus,
      },
      {
        key: "flight",
        label: "Flight",
        icon: Luggage,
      },
      {
        key: "route",
        label: "Route",
        icon: Route,
      },
      {
        key: "crew",
        label: "Crew",
        icon: UserRound,
      },
      {
        key: "certification",
        label: "Certification",
        icon: ClipboardCheck,
      },
      {
        key: "airport",
        label: "Airport",
        icon: TowerControl,
      },
      {
        key: "runway",
        label: "Runway",
        icon: PlaneTakeoff,
      },
    ],
  },
];

export default navigation;
