from typing import List

from app.enums import CountryCode, AirportType, NoiseCategory


class AirportDTO:
    def __init__(
        self,
        id: str = None,
        name: str = None,
        iataCode: str = None,
        icaoCode: str = None,
        countryCode: CountryCode = None,
        type: AirportType = None,
        operationStartTime: str = None,
        operationStopTime: str = None,
        elevation: float = None,
        slope: float = None,
        possibleNoiseCategory: NoiseCategory = None,
        runwayIds: List[str] = None,
        taxiwayIds: List[str] = None,
        planesPresentIds: List[str] = None,
        flightFromAirportIds: List[str] = None,
        flightToAirportIds: List[str] = None,
        crewMembersPresentIds: List[str] = None,
    ):
        self.id = id
        self.name = name
        self.iataCode = iataCode
        self.icaoCode = icaoCode
        self.countryCode = countryCode
        self.type = type
        self.operationStartTime = operationStartTime
        self.operationStopTime = operationStopTime
        self.elevation = elevation
        self.slope = slope
        self.possibleNoiseCategory = possibleNoiseCategory
        self.runwayIds = runwayIds or []
        self.taxiwayIds = taxiwayIds or []
        self.planesPresentIds = planesPresentIds or []
        self.flightFromAirportIds = flightFromAirportIds or []
        self.flightToAirportIds = flightToAirportIds or []
        self.crewMembersPresentIds = crewMembersPresentIds or []
