from fastapi import FastAPI
import config

app = FastAPI()


@app.get(f"/api/{config.config.api_version}/algorithm/trigger")
async def trigger_algorithm_run():
    return {"message": "Hello World!"}
 