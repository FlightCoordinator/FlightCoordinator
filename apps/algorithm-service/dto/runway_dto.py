from app.enums import SurfaceType, VisualApproachAid, RunwayStatus


class RunwayDTO:
    def __init__(
        self,
        id: str = None,
        runwayNumber: str = None,
        airportId: str = None,
        length: float = None,
        width: float = None,
        surfaceType: SurfaceType = None,
        maxWeightCapacity: float = None,
        hasMarkings: bool = None,
        hasLighting: bool = None,
        hasILS: bool = None,
        hasSafetyArea: bool = None,
        visualApproachAid: VisualApproachAid = None,
        altitude: float = None,
        status: RunwayStatus = None,
        crosswindLimit: float = None,
    ):
        self.id = id
        self.runwayNumber = runwayNumber
        self.airportId = airportId
        self.length = length
        self.width = width
        self.surfaceType = surfaceType
        self.maxWeightCapacity = maxWeightCapacity
        self.hasMarkings = hasMarkings
        self.hasLighting = hasLighting
        self.hasILS = hasILS
        self.hasSafetyArea = hasSafetyArea
        self.visualApproachAid = visualApproachAid
        self.altitude = altitude
        self.status = status
        self.crosswindLimit = crosswindLimit
