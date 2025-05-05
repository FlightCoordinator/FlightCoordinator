from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid
from pydantic import BaseModel, validator
from typing import Optional

Base = declarative_base()

class AirportEntity(Base):
    __tablename__ = "airport_table"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    name = Column(String, nullable=False)
    iata_code = Column(String, nullable=False)
    icao_code = Column(String, nullable=False)
from enum import Enum

class CountryCode(str, Enum):
    TR = "TR"
    US = "US"
    DE = "DE"


class AirportType(str, Enum):
    INTERNATIONAL = "INTERNATIONAL"
    DOMESTIC = "DOMESTIC"
  
from enum import Enum

class NoiseCategory(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    
