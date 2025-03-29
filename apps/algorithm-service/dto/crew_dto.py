from typing import List

from app.enums import CrewMemberRole, CrewMemberStatus


class CrewDTO:
    def __init__(
        self,
        id: str = None,
        fullName: str = None,
        email: str = None,
        phoneNumber: str = None,
        role: CrewMemberRole = None,
        certificationIds: List[str] = None,
        totalFlightHours: int = None,
        baseAirportId: str = None,
        currentAirportId: str = None,
        status: CrewMemberStatus = None,
    ):
        self.id = id
        self.fullName = fullName
        self.email = email
        self.phoneNumber = phoneNumber
        self.role = role
        self.certificationIds = certificationIds or []
        self.totalFlightHours = totalFlightHours
        self.baseAirportId = baseAirportId
        self.currentAirportId = currentAirportId
        self.status = status
