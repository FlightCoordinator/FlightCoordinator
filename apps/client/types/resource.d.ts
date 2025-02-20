import type DataTransfer from "./dto";

namespace ResourceTypes {
  interface ObjectBase {
    id: string;
  }
  export namespace Airport {
    export interface AirportObject extends ObjectBase {
      name: string;
      iataCode: string;
      icaoCode: string;
      countryCode: string;
      type: Enums.AirportType;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<AirportObject, "id">;
      export type UpdateMutationParams = AirportObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
      export type QueryResponseParams = DataTransfer.AirportDTO[];
    }
  }
  export namespace Certification {
    export interface CertificationObject extends ObjectBase {
      name: string;
      certificationNumber: number;
      issuer: Enums.CertificationIssuer;
      issuingCountry: Enums.CertificationIssuingCountry;
      expirationDate: Date;
      validityPeriod: number;
      assignableRole: Enums.CrewRoles;
      description: string;
      assignedCrewMember: string;
    }
    export namespace Mutations {
      export type CreateMutationParams = Omit<CertificationObject, "id">;
      export type UpdateMutationParams = CertificationObject;
      export type DeleteMutationParams = ObjectBase;
    }
    export namespace Queries {
      export type QueryByIdRequestParams = ObjectBase;
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
