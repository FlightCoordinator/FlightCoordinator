from app.enums import Certifier, CertificationStatus, NoiseCategory, EngineType


class ModelDTO:
    def __init__(
        self,
        id: str = None,
        manufacturer: str = None,
        planeIdentifier: str = None,
        modelName: str = None,
        certifier: Certifier = None,
        certificationStatus: CertificationStatus = None,
        noiseCategory: NoiseCategory = None,
        fuelCapacity: float = None,
        fuelEfficiency: float = None,
        maxPassengerCapacity: int = None,
        maxCargoCapacity: float = None,
        emptyWeight: float = None,
        tailHeight: float = None,
        wingspan: float = None,
        engineType: EngineType = None,
        engineCount: int = None,
        thrustPerEngine: float = None,
        maxCrosswindComp: float = None,
        requiredRunwayLength: float = None,
        requiredRunwayWidth: float = None,
        minRotationRadius: float = None,
        cruiseSpeed: float = None,
        maxSpeed: float = None,
        stallSpeed: float = None,
        maxAltitude: float = None,
        climbRate: float = None,
        descentRate: float = None,
        maxFlightRange: float = None,
        hasWeatherRadar: float = None,
        hasAutopilot: bool = None,
        hasFlyByWire: bool = None,
        hasFireSupression: bool = None,
        gpsEnabled: bool = None,
    ):
        self.id = id
        self.manufacturer = manufacturer
        self.planeIdentifier = planeIdentifier
        self.modelName = modelName
        self.certifier = certifier
        self.certificationStatus = certificationStatus
        self.noiseCategory = noiseCategory
        self.fuelCapacity = fuelCapacity
        self.fuelEfficiency = fuelEfficiency
        self.maxPassengerCapacity = maxPassengerCapacity
        self.maxCargoCapacity = maxCargoCapacity
        self.emptyWeight = emptyWeight
        self.tailHeight = tailHeight
        self.wingspan = wingspan
        self.engineType = engineType
        self.engineCount = engineCount
        self.thrustPerEngine = thrustPerEngine
        self.maxCrosswindComp = maxCrosswindComp
        self.requiredRunwayLength = requiredRunwayLength
        self.requiredRunwayWidth = requiredRunwayWidth
        self.minRotationRadius = minRotationRadius
        self.cruiseSpeed = cruiseSpeed
        self.maxSpeed = maxSpeed
        self.stallSpeed = stallSpeed
        self.maxAltitude = maxAltitude
        self.climbRate = climbRate
        self.descentRate = descentRate
        self.maxFlightRange = maxFlightRange
        self.hasWeatherRadar = hasWeatherRadar
        self.hasAutopilot = hasAutopilot
        self.hasFlyByWire = hasFlyByWire
        self.hasFireSupression = hasFireSupression
        self.gpsEnabled = gpsEnabled
