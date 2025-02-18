import type DataTransfer from "./dto";

namespace ResourceTypes {
  export namespace Airport {
    type AirportId = { airportId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.AirportDTO;
      export type UpdateMutationParams = AirportId & DataTransfer.AirportDTO;
      export type DeleteMutationParams = AirportId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = AirportId;
      export type QueryResponseParams = DataTransfer.AirportDTO[];
    }
  }
  export namespace Certification {
    type CertificationId = { certificationId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.CertificationDTO;
      export type UpdateMutationParams = CertificationId & DataTransfer.CertificationDTO;
      export type DeleteMutationParams = CertificationId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = CertificationId;
      export type QueryResponseParams = DataTransfer.CertificationDTO[];
    }
  }
  export namespace Crew {
    type CrewMemberId = { crewMemberId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.CrewDTO;
      export type UpdateMutationParams = CrewMemberId & DataTransfer.CrewDTO;
      export type DeleteMutationParams = CrewMemberId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = CrewMemberId;
      export type QueryResponseParams = DataTransfer.CrewDTO[];
    }
  }
  export namespace Plane {
    type PlaneId = { planeId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.PlaneDTO;
      export type UpdateMutationParams = PlaneId & DataTransfer.PlaneDTO;
      export type DeleteMutationParams = PlaneId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = PlaneId;
      export type QueryResponseParams = DataTransfer.PlaneDTO[];
    }
  }
  export namespace Route {
    type RouteId = { routeId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.RouteDTO;
      export type UpdateMutationParams = RouteId & DataTransfer.RouteDTO;
      export type DeleteMutationParams = RouteId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = RouteId;
      export type QueryResponseParams = DataTransfer.RouteDTO[];
    }
  }
  export namespace Runway {
    type RunwayId = { runwayId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.RunwayDTO;
      export type UpdateMutationParams = RunwayId & DataTransfer.RunwayDTO;
      export type DeleteMutationParams = RunwayId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = RunwayId;
      export type QueryResponseParams = EntityTypes.RunwayEntity[];
    }
  }
  export namespace Vehicle {
    type VehicleId = { vehicleId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.VehicleDTO;
      export type UpdateMutationParams = VehicleId & DataTransfer.VehicleDTO;
      export type DeleteMutationParams = VehicleId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = VehicleId;
      export type QueryResponseParams = EntityTypes.VehicleEntity[];
    }
  }
  export namespace Flight {
    type FlightId = { flightId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.FlightDTO;
      export type UpdateMutationParams = FlightId & DataTransfer.FlightDTO;
      export type DeleteMutationParams = FlightId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = FlightId;
      export type QueryResponseParams = DataTransfer.FlightDTO[];
    }
  }
  export namespace AlgorithmResult {
    type AlgorithmResultId = { algorithmResultId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.AlgorithmResultDTO;
      export type UpdateMutationParams = AlgorithmResultId & DataTransfer.AlgorithmResultDTO;
      export type DeleteMutationParams = AlgorithmResultId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = AlgorithmResultId;
      export type QueryResponseParams = DataTransfer.AlgorithmResultDTO[];
    }
  }
  export namespace AlgorithmRun {
    type AlgorithmRunId = { algorithmRunId: string };
    export namespace Mutations {
      export type CreateMutationParams = DataTransfer.AlgorithmRunDTO;
      export type UpdateMutationParams = AlgorithmRunId & DataTransfer.AlgorithmRunDTO;
      export type DeleteMutationParams = AlgorithmRunId;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = AlgorithmRunId;
      export type QueryResponseParams = DataTransfer.AlgorithmRunDTO[];
    }
  }
}

export default ResourceTypes;
