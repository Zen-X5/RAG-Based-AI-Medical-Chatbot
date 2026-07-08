from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.medicalRoutes import router as medicalRoutes
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(medicalRoutes)

@app.get("/")
def home():
    return {
        "success": "FastAPI is running..."
    }