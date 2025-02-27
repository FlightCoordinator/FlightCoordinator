import os
from pydantic import BaseModel, Field


class ConfigModel(BaseModel):
    api_version: str = Field(default_factory=lambda: os.getenv("API_VERSION"))
    database_url: str = Field(default_factory=lambda: os.getenv("DATABASE_URL"))
    auth_service_url: str = Field(default_factory=lambda: os.getenv("AUTH_SERVICE_URL"))
    auth_service_endpoint: str = Field(
        default_factory=lambda: os.getenv("AUTH_SERVICE_ENDPOINT")
    )
    validator_key: str = Field(default_factory=lambda: os.getenv("SECRET_KEY"))
    validator_max_time_diff: str = Field(
        default_factory=lambda: os.getenv("SECRET_KEY")
    )


config = ConfigModel()
