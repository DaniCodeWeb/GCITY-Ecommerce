from sqlalchemy import Column, Integer, String, Float, Text
from .database import Base

class Producto(Base):
    __tablename__ = "productos"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    descripcion = Column(Text)
    precio = Column(Float, nullable=False)
    categoria = Column(String(100))
    talla = Column(String(10))
    color = Column(String(50))
    stock = Column(Integer, nullable=False)