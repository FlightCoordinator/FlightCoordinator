from datetime import datetime

from app.enums import Certifier


class CertificationDTO:
    def __init__(
        self,
        id: str = None,
        name: str = None,
        certification_number: str = None,
        issuer: Certifier = None,
        expiration_date: datetime = None,
        validity_period: int = None,
        description: str = None,
        assigned_crew_member: str = None,
    ):
        self.id = id
        self.name = name
        self.certification_number = certification_number
        self.issuer = issuer
        self.expiration_date = expiration_date
        self.validity_period = validity_period
        self.description = description
        self.assigned_crew_member = assigned_crew_member
