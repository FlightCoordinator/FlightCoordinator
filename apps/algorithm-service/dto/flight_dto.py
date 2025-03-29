class FlightDTO:
    def __init__(
        self,
        id: str = None,
        passengerCount: int = None,
        cargoWeight: float = None,
        originAirportId: str = None,
        destinationAirportId: str = None,
        distance: float = None,
        estimatedTakeoffTime: str = None,
        estimatedLandingTime: str = None,
        estimatedFlightDuration: float = None,
    ):
        self.id = id
        self.passengerCount = passengerCount
        self.cargoWeight = cargoWeight
        self.originAirportId = originAirportId
        self.destinationAirportId = destinationAirportId
        self.distance = distance
        self.estimatedTakeoffTime = estimatedTakeoffTime
        self.estimatedLandingTime = estimatedLandingTime
        self.estimatedFlightDuration = estimatedFlightDuration
