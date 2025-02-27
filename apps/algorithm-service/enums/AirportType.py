from enum import Enum


class AirportType(str, Enum):
    INTERNATIONAL = "International"
    REGIONAL = "Regional"
    DOMESTIC = "Domestic"
