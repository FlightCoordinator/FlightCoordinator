from sqlalchemy import Column, String, Integer, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
import uuid
from enums import CertificationIssuer, CrewRole

Base = declarative_base()


class Certification(Base):
    __tablename__ = "certification_table"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    certification_number = Column(Integer, nullable=False)
    issuer = Column(Enum(CertificationIssuer), nullable=False)
    expiration_date = Column(Date, nullable=False)
    validity_period = Column(Integer, nullable=False)
    assignable_role = Column(Enum(CrewRole), nullable=False)
    description = Column(String, nullable=False)

    assigned_crew_member_id = Column(
        UUID(as_uuid=True), ForeignKey("crew_table.id"), nullable=False
    )
    assigned_crew_member = relationship("Crew", back_populates="certifications")

    def __repr__(self):
        return f"<Certification(name={self.name}, certification_number={self.certification_number})>"
