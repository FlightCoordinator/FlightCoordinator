class TaxiwayDTO:
    def __init__(
        self,
        id: str = None,
        name: str = None,
        airportId: str = None,
        loadCapacity: float = None,
        hasHoldingPoint: bool = None,
        hasHighSpeedExit: bool = None,
        width: float = None,
        length: float = None,
        maxTurningRadius: float = None,
        maxWeightCapacity: float = None,
        hasLighting: bool = None,
        hasSignage: bool = None,
        connectedRunwayId: str = None,
    ):
        self.id = id
        self.name = name
        self.airportId = airportId
        self.loadCapacity = loadCapacity
        self.hasHoldingPoint = hasHoldingPoint
        self.hasHighSpeedExit = hasHighSpeedExit
        self.width = width
        self.length = length
        self.maxTurningRadius = maxTurningRadius
        self.maxWeightCapacity = maxWeightCapacity
        self.hasLighting = hasLighting
        self.hasSignage = hasSignage
        self.connectedRunwayId = connectedRunwayId
