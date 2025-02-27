from fastapi import Request
from httpx import AsyncClient
from dto import AuthValidationDTO

from app.config import config

auth_validation_url = config.auth_service_url + config.auth_service_endpoint


async def validate_auth(request: Request) -> bool:
    cookies = request.cookies

    async with AsyncClient() as client:
        response = await client.post(auth_validation_url, cookies=cookies)

        if response.status_code == 200:
            auth_validation = AuthValidationDTO(**response.json())
            if auth_validation.isAuthenticated:
                return True
            else:
                return False

        else:
            return False
