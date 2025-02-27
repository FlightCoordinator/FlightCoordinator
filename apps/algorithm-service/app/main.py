from fastapi import FastAPI
import config

app = FastAPI()


@app.get(f"/api/{config.config.api_version}/algorithm/trigger_run")
async def trigger_algorithm_run():
    return {"message": "Hello World!"}
