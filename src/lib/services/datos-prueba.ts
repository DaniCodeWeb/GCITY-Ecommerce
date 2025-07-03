// src/pages/api/datos-prueba.ts
import { supabase } from "../../lib/supabase.js"
import type { APIRoute } from "astro"

// Función helper para crear respuestas
function createResponse<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

function createErrorResponse(error: string, status = 500): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

// Datos de ejemplo para generar productos
const categorias = ["Camisetas", "Pantalones", "Chaquetas", "Zapatos", "Accesorios", "Vestidos", "Faldas", "Shorts"]
const nombres = [
  "Camiseta Básica",
  "Pantalón Vaquero",
  "Chaqueta Deportiva",
  "Zapatos Casuales",
  "Bolso de Mano",
  "Vestido Elegante",
  "Falda Plisada",
  "Shorts Deportivos",
  "Camiseta Estampada",
  "Pantalón Chino",
  "Chaqueta de Cuero",
  "Zapatos Formales",
  "Gorra Deportiva",
  "Vestido Casual",
  "Falda Vaquera",
  "Shorts de Playa",
]
const descripciones = [
  "Producto de alta calidad",
  "Diseño moderno y elegante",
  "Perfecto para uso diario",
  "Material resistente y duradero",
  "Estilo versátil",
  "Comodidad garantizada",
]

// Interfaces para los tipos de datos
interface ProductoInput {
  nombre: string
  descripcion?: string
  precio: number
  categoria: string
  stock_minimo?: number
  imagen_url?: string
  activo?: boolean
}

// Función tipada para generar producto aleatorio
function generarProductoAleatorio(): ProductoInput {
  const categoria = categorias[Math.floor(Math.random() * categorias.length)]
  const nombre = nombres[Math.floor(Math.random() * nombres.length)]
  const descripcion = descripciones[Math.floor(Math.random() * descripciones.length)]

  // Generar URL de imagen placeholder
  const imageWidth = 300
  const imageHeight = 300
  const imagenUrl = `/placeholder.png?height=${imageHeight}&width=${imageWidth}&text=${encodeURIComponent(nombre)}`

  return {
    nombre: `${nombre} ${Math.floor(Math.random() * 1000)}`,
    descripcion,
    precio: Math.round((Math.random() * 200 + 10) * 100) / 100,
    categoria,
    stock_minimo: Math.floor(Math.random() * 20) + 5,
    imagen_url: imagenUrl,
    activo: Math.random() > 0.1, // 90% activos
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const cantidad = body.cantidad || 500

    // Generar productos aleatorios con tipo correcto
    const productos: ProductoInput[] = []
    for (let i = 0; i < cantidad; i++) {
      productos.push(generarProductoAleatorio())
    }

    // Insertar en la base de datos
    const { data, error } = await supabase.from("productos").insert(productos).select()

    if (error) throw error

    return createResponse({
      message: `${cantidad} productos generados exitosamente`,
      productos: data?.length || 0,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    return createErrorResponse(errorMessage)
  }
}

export const DELETE: APIRoute = async () => {
  try {
    // Primero eliminar registros de inventario relacionados
    const { error: inventarioError } = await supabase.from("inventario").delete().neq("id", 0) // Eliminar todos los registros

    if (inventarioError) {
      console.warn("Error eliminando inventario:", inventarioError)
      // Continuar aunque haya error en inventario
    }

    // Luego eliminar todos los productos
    const { error: productosError } = await supabase.from("productos").delete().neq("id", 0) // Eliminar todos los registros

    if (productosError) throw productosError

    return createResponse({
      message: "Todos los datos han sido eliminados exitosamente",
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    return createErrorResponse(errorMessage)
  }
}
