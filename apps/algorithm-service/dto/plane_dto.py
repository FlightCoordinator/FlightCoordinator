from datetime import datetime

from app.enums import PlaneStatus


class PlaneDTO:
    def __init__(
        self,
        id: str = None,
        modelId: str = None,
        tailNumber: str = None,
        nextMaintenanceDate: datetime = None,
        cyclesSinceLastMaintenance: int = None,
        retirementDate: datetime = None,
        engineHours: float = None,
        currentWearLevel: float = None,
        totalFlightHours: float = None,
        fuelAmount: float = None,
        planeStatus: PlaneStatus = None,
        currentLocationId: str = None,
        aircraftOperator: str = None,
    ):
        self.id = id
        self.modelId = modelId
        self.tailNumber = tailNumber
        self.nextMaintenanceDate = nextMaintenanceDate
        self.cyclesSinceLastMaintenance = cyclesSinceLastMaintenance
        self.retirementDate = retirementDate
        self.engineHours = engineHours
        self.currentWearLevel = currentWearLevel
        self.totalFlightHours = totalFlightHours
        self.fuelAmount = fuelAmount
        self.planeStatus = planeStatus
        self.currentLocationId = currentLocationId
        self.aircraftOperator = aircraftOperator
