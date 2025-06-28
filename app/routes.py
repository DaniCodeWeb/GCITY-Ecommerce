from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .models import Producto
from .database import SessionLocal
from .structures.hash_table import HashTable

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/productos/")
def read_productos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    productos = db.query(Producto).offset(skip).limit(limit).all()
    return productos

@router.get("/productos/hash/")
def read_productos_hash():
    # Implementación con tabla hash
    ht = HashTable()
    # Aquí cargarías los productos en la tabla hash
    result = ht.search("some_key")
    return {
        "result": result['value'],
        "time_taken": result['time']
    }