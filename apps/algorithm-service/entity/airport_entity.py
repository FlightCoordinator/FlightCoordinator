from sqlalchemy import Column, String, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.ext.declarative import declarative_base
from enums import AirportType, CountryCode

Base = declarative_base()


class AirportEntity(Base):
    __tablename__ = "airport_table"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    iata_code = Column(String, nullable=False, unique=True)
    icao_code = Column(String, nullable=False, unique=True)
    country_code = Column(Enum(CountryCode), nullable=False)
    type = Column(Enum(AirportType), nullable=False)

    runways = relationship(
        "Runway",
        back_populates="airport",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    vehicles_present = relationship(
        "Vehicle",
        back_populates="airport",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    planes_present = relationship(
        "Plane",
        back_populates="current_location",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    routes_originating_from_airport = relationship(
        "Route",
        back_populates="origin_airport",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    routes_destined_for_airport = relationship(
        "Route",
        back_populates="destination_airport",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    crew_members_present = relationship(
        "Crew",
        back_populates="base_airport",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
