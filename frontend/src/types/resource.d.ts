import type ComponentTypes from "./components";

import type DataTransfer from "./dto";
import type GlobalTypes from "./globals";

namespace ResourceTypes {
  export namespace Airport {
    type AirportId = { airportId: string };
    namespace Mutations {
      type CreateMutationParams = DataTransfer.AirportDTO;
      type UpdateMutationParams = AirportId & DataTransfer.AirportDTO;
      type DeleteMutationParams = AirportId;
    }
    namespace Queries {
      type QueryByIdRequestParams = AirportId;
      type QueryResponseParams = DataTransfer.AirportDTO[];
    }
    namespace Page {
      type RowParams = ComponentTypes.BaseDataGridRowParams & Omit<DataTransfer.AirportDTO, "id">;
    }
  }
  namespace Certification {
    type CertificationId = { certificationId: string };
    namespace Mutations {
      type CreateMutationParams = DataTransfer.CertificationDTO;
      type UpdateMutationParams = CertificationId & DataTransfer.CertificationDTO;
      type DeleteMutationParams = CertificationId;
    }
    namespace Queries {
      type QueryByIdRequestParams = CertificationId;
      type QueryResponseParams = DataTransfer.CertificationDTO[];
    }
    namespace Page {
      type RowParams = ComponentTypes.BaseDataGridRowParams &
        Omit<DataTransfer.CertificationDTO, "id">;
    }
  }
  namespace Crew {
    type CrewMemberId = { crewMemberId: string };
    namespace Mutations {
      type CreateMutationParams = DataTransfer.CrewDTO;
      type UpdateMutationParams = CrewMemberId & DataTransfer.CrewDTO;
      type DeleteMutationParams = CrewMemberId;
    }
    namespace Queries {
      type QueryByIdRequestParams = CrewMemberId;
      type QueryResponseParams = DataTransfer.CrewDTO[];
    }
    namespace Page {
      type RowParams = ComponentTypes.BaseDataGridRowParams & Omit<DataTransfer.CrewDTO, "id">;
    }
  }
  namespace Plane {
    type PlaneId = { planeId: string };
    namespace Mutations {
      type CreateMutationParams = DataTransfer.PlaneDTO;
      type UpdateMutationParams = PlaneId & DataTransfer.PlaneDTO;
      type DeleteMutationParams = PlaneId;
    }
    namespace Queries {
      type QueryByIdRequestParams = PlaneId;
      type QueryResponseParams = DataTransfer.PlaneDTO[];
    }
    namespace Page {
      type RowParams = ComponentTypes.BaseDataGridRowParams & Omit<DataTransfer.PlaneDTO, "id">;
    }
  }
  namespace Route {
    type RouteId = { routeId: string };
    namespace Mutations {
      type CreateMutationParams = DataTransfer.RouteDTO;
      type UpdateMutationParams = RouteId & DataTransfer.RouteDTO;
      type DeleteMutationParams = RouteId;
    }
    namespace Queries {
      type QueryByIdRequestParams = RouteId;
      type QueryResponseParams = DataTransfer.RouteDTO[];
    }
    namespace Page {
      type RowParams = ComponentTypes.BaseDataGridRowParams & Omit<DataTransfer.RouteDTO, "id">;
    }
  }
  namespace Runway {
    type RunwayId = { runwayId: string };
    namespace Mutations {
      type CreateMutationParams = DataTransfer.RunwayDTO;
      type UpdateMutationParams = RunwayId & DataTransfer.RunwayDTO;
      type DeleteMutationParams = RunwayId;
    }
    namespace Queries {
      type QueryByIdRequestParams = RunwayId;
      type QueryResponseParams = EntityTypes.RunwayEntity[];
    }
    namespace Page {
      type RowParams = ComponentTypes.BaseDataGridRowParams & Omit<DataTransfer.RunwayDTO, "id">;
    }
  }
  namespace Vehicle {
    type VehicleId = { vehicleId: string };
    namespace Mutations {
      type CreateMutationParams = DataTransfer.VehicleDTO;
      type UpdateMutationParams = VehicleId & DataTransfer.VehicleDTO;
      type DeleteMutationParams = VehicleId;
    }
    namespace Queries {
      type QueryByIdRequestParams = VehicleId;
      type QueryResponseParams = EntityTypes.VehicleEntity[];
    }
    namespace Page {
      type RowParams = ComponentTypes.BaseDataGridRowParams & Omit<DataTransfer.VehicleDTO, "id">;
    }
  }
}
export default ResourceTypes;
