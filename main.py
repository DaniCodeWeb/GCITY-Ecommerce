from fastapi import FastAPI
from app.routes import router as api_router
from app.database import engine, Base

app = FastAPI()

# Crear tablas de la base de datos
Base.metadata.create_all(bind=engine)

app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)