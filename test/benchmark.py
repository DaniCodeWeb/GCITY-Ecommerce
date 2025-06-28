import time
from app.structures.hash_table import HashTable
from app.structures.bst import BST
from app.database import SessionLocal
from app.models import Producto

def benchmark_database():
    db = SessionLocal()
    start = time.time()
    products = db.query(Producto).limit(1000).all()
    return time.time() - start

def benchmark_hash_table():
    ht = HashTable()
    # Asume que hemos cargado datos
    start = time.time()
    result = ht.search("producto_500")
    return result['time']

if __name__ == "__main__":
    db_time = benchmark_database()
    ht_time = benchmark_hash_table()
    
    print(f"Base de datos: {db_time:.6f} segundos")
    print(f"Tabla hash: {ht_time:.6f} segundos")