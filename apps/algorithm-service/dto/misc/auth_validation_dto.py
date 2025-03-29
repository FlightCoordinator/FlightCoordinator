from pydantic import BaseModel


class AuthValidationDTO(BaseModel):
    isAuthenticated: bool
