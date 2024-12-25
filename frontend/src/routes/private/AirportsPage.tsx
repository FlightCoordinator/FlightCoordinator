import { useTranslation } from "react-i18next";

import Enums from "@/constants/enums";
import EnumValues from "@/constants/enumValues";
import DataTransfer from "@/types/dto";
import ResourceTypes from "@/types/resource";
import { GridColDef } from "@mui/x-data-grid";

import DataGrid from "@/components/DataGrid";
import GridOverlay from "@/components/GridOverlay";

import useAirportQuery from "@/hooks/airport/useAirportAllQuery";
import useAirportCreateMutation from "@/hooks/airport/useAirportCreateMutation";
import useAirportDeleteMutation from "@/hooks/airport/useAirportDeleteMutation";
import useAirportUpdateMutation from "@/hooks/airport/useAirportUpdateMutation";

const AirportsPage = () => {
  const { t } = useTranslation();

  const { mutateAsync: airportCreateMutation } = useAirportCreateMutation();
  const { mutateAsync: airportUpdateMutation } = useAirportUpdateMutation();
  const { mutateAsync: airportDeleteMutation } = useAirportDeleteMutation();

  const { data: airportQueryData, isLoading: isAirportQueryLoading } = useAirportQuery();

  if (isAirportQueryLoading) {
    return <GridOverlay type="loading" />;
  }
  if (!airportQueryData?.isSuccess) {
    return <GridOverlay type="error" message={airportQueryData?.message} />;
  }

  const airports = airportQueryData.data;

  if (!airports) {
    return <GridOverlay type="error" message={airportQueryData.message} />;
  }

  const parsedAirportData: ResourceTypes.Airport.Page.RowParams[] = airports.map(
    (airport, index) => ({
      id: index + 1,
      uniqueId: airport.id,
      name: airport.name,
      iataCode: airport.iataCode,
      icaoCode: airport.icaoCode,
      countryCode: airport.countryCode,
      type: Enums.AirportType[airport.type as keyof typeof Enums.AirportType],
      runwayIds: airport.runwayIds.map((runway: DataTransfer.RunwayDTO) => runway.id).join(", "),
      vehiclesPresentIds: airport.vehiclesPresentIds
        .map((vehicle: DataTransfer.VehicleDTO) => vehicle.id)
        .join(", "),
      planesPresentIds: airport.planesPresentIds
        .map((plane: DataTransfer.PlaneDTO) => plane.id)
        .join(", "),
      routesOriginatingFromAirportIds: airport.routesOriginatingFromAirportIds
        .map((route: DataTransfer.RouteDTO) => route.id)
        .join(", "),
      routesDestinedForAirportIds: airport.routesDestinedForAirportIds
        .map((route: DataTransfer.RouteDTO) => route.id)
        .join(", "),
      crewMembersPresentIds: airport.crewMembersPresentIds
        .map((crew: DataTransfer.CrewDTO) => crew.id)
        .join(", "),
    }),
  );

  const airportColumns: GridColDef[] = [
    {
      field: "id",
      headerName: t("columns.airport.id"),
      width: 100,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "uniqueId",
      type: "string",
      headerName: t("columns.airport.uniqueId"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "iataCode",
      type: "string",
      headerName: t("columns.airport.iataCode"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "icaoCode",
      type: "string",
      headerName: t("columns.airport.icaoCode"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "countryCode",
      type: "string",
      headerName: t("columns.airport.countryCode"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "type",
      type: "singleSelect",
      headerName: t("columns.airport.type"),
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      valueOptions: [
        EnumValues.AirportType.INTERNATIONAL,
        EnumValues.AirportType.DOMESTIC,
        EnumValues.AirportType.REGIONAL,
      ],
    },
    {
      field: "runways",
      type: "string",
      headerName: t("columns.airport.runways"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "vehiclesPresent",
      type: "string",
      headerName: t("columns.airport.vehiclesPresent"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "planesPresent",
      type: "string",
      headerName: t("columns.airport.planesPresent"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "routesOriginatingFromAirport",
      type: "string",
      headerName: t("columns.airport.routesOriginatingFromAirport"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "routesDestinedForAirport",
      type: "string",
      headerName: t("columns.airport.routesDestinedForAirport"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "crewMembersPresent",
      type: "string",
      headerName: t("columns.airport.crewMembersPresent"),
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
  ];

  const airportNewDataObject: Omit<DataTransfer.AirportDTO, "id"> = {
    name: "",
    iataCode: "",
    icaoCode: "",
    countryCode: "",
    type: Enums.AirportType.INTERNATIONAL,
    runwayIds: [],
    vehiclesPresentIds: [],
    planesPresentIds: [],
    routesOriginatingFromAirportIds: [],
    routesDestinedForAirportIds: [],
    crewMembersPresentIds: [],
  };

  return (
    <DataGrid<
      ResourceTypes.Airport.Mutations.CreateMutationParams,
      ResourceTypes.Airport.Mutations.UpdateMutationParams,
      ResourceTypes.Airport.Mutations.DeleteMutationParams
    >
      key={JSON.stringify(parsedAirportData)}
      rowsProp={parsedAirportData}
      columnsProp={airportColumns}
      dataCategory="airport"
      newDataObject={airportNewDataObject}
      newDataFunction={airportCreateMutation}
      updateDataFunction={airportUpdateMutation}
      deleteDataFunction={airportDeleteMutation}
    />
  );
};

export default AirportsPage;
