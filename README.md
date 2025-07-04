# **C.CITY - Tienda de Ropa con Comparación de Estructuras de Datos**  

![C.CITY Logo](https://via.placeholder.com/150x50?text=C.CITY+Logo)  

**C.CITY** es una tienda de ropa online que no solo ofrece productos de moda, sino que también demuestra el rendimiento de diferentes estructuras de datos en aplicaciones web reales.  

## **Tecnologías Utilizadas**  
- **Frontend**:  
  - **Astro** (Framework web estático)  
  - **Tailwind CSS** (Estilos)  
  - **TypeScript** (Tipado estático)  
- **Backend**:  
  - **Python** (Lógica del servidor)  
  - **FastAPI** (API REST)  
  - **SQLAlchemy** (ORM para PostgreSQL)  
- **Base de Datos**:  
  - **PostgreSQL** (Base de datos relacional)  
- **Estructuras de Datos Implementadas**:  
  - **Tablas Hash** (Búsqueda rápida de productos)  
  - **Árboles Binarios de Búsqueda (BST)** (Ordenamiento eficiente)  
  - **Grafos** (Sistema de recomendaciones)  

---  

## **Características Principales**  

### **1. Catálogo de Productos (1000+ items)**  
- Visualización rápida de productos usando diferentes estructuras de datos.  
- Filtros por categoría, talla, color y precio.  

### **2. Sistema de Recomendaciones**  
- Basado en grafos para sugerencias personalizadas.  
- Comparación de tiempos de respuesta entre métodos tradicionales y estructuras avanzadas.  

### **3. Panel de Administración (CRUD)**  
- Gestión de inventario con operaciones eficientes.  
- Uso de BST para ordenamiento automático de productos.  

### **4. Benchmarks en Tiempo Real**  
- Muestra el rendimiento de cada estructura de datos en la UI.  
- Gráficos comparativos usando Chart.js o similar.  

---  

## **Estructura del Proyecto**  

```
C.CITY/
├── frontend/                  # Astro + Tailwind
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/             # Rutas de la página
│   │   ├── styles/            # Estilos globales
│   │   └── lib/               # Lógica de estructuras de datos (TypeScript)
│   └── public/                # Assets estáticos
│
├── backend/                   # FastAPI + Python
│   ├── app/
│   │   ├── models.py          # Modelos de DB
│   │   ├── schemas.py         # Esquemas Pydantic
│   │   ├── crud.py            # Operaciones CRUD
│   │   ├── structures/        # Implementación de estructuras
│   │   │   ├── hash_table.py
│   │   │   ├── bst.py
│   │   │   └── graph.py
│   │   └── api/               # Endpoints
│   ├── requirements.txt       # Dependencias
│   └── main.py                # Punto de entrada
│
├── database/                  # Scripts de PostgreSQL
│   ├── init.sql               # Tablas e índices
│   └── dummy_data.sql         # Datos de prueba
│
└── README.md                  # Este archivo
```

---  

## **Cómo Ejecutar el Proyecto**  

### **1. Frontend (Astro)**  
```bash
cd frontend
npm install
npm run dev
```
**Abre:** `http://localhost:3000`  

### **2. Backend (FastAPI)**  
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
**Abre:** `http://localhost:8000/docs` (Swagger UI)  

### **3. Base de Datos (PostgreSQL)**  
1. Instalar PostgreSQL y crear una DB llamada `ccity`.  
2. Ejecutar scripts SQL:  
```bash
psql -U postgres -d ccity -f database/init.sql
psql -U postgres -d ccity -f database/dummy_data.sql
```

---  

## **Comparación de Estructuras de Datos**  

| Estructura      | Operación       | Tiempo (ms) | Uso en C.CITY               |
|----------------|----------------|------------|-----------------------------|
| **Tabla Hash** | Búsqueda       | ~0.1       | Filtrado rápido por nombre  |
| **BST**        | Ordenamiento   | ~0.3       | Productos ordenados por precio |
| **Grafo**      | Recomendación  | ~0.5       | "Clientes que vieron esto también compraron..." |
| **SQL**        | Query normal   | ~2.0       | Búsqueda tradicional        |

---  

## **Despliegue en Hosting Gratuito**  

### **Opción 1: Render.com**  
1. Conectar repositorio GitHub.  
2. Configurar PostgreSQL y variables de entorno.  
3. Desplegar Frontend (Astro) y Backend (FastAPI) como servicios separados.  

### **Opción 2: Railway.app**  
- Soporta PostgreSQL + Python fácilmente.  
- Automatiza despliegue con `requirements.txt`.  

---  

## **Contribuciones**  
¿Quieres mejorar C.CITY?  
1. Haz fork del proyecto.  
2. Crea una rama (`git checkout -b feature/nueva-funcion`).  
3. Haz commit (`git commit -m "Añade X característica"`).  
4. Push (`git push origin feature/nueva-funcion`).  
5. Abre un **Pull Request**.  

---  

**📌 ¿Preguntas?**  
Abre un *issue* o contacta al equipo en `dev@ccity.example.com`.  

---  

**© 2024 C.CITY - Moda Rápida, Código Más Rápido.** 🚀