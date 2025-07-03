// src/pages/api/productos/[id].ts
import type { APIRoute } from "astro"
import { ProductoService } from "../../../lib/services/productos"

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = Number.parseInt(params.id as string)
    const producto = await ProductoService.obtenerPorId(id)

    if (!producto) {
      return new Response(JSON.stringify({ error: "Producto no encontrado" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    return new Response(JSON.stringify(producto), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al obtener producto" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = Number.parseInt(params.id as string)
    const producto = await request.json()
    const productoActualizado = await ProductoService.actualizar(id, producto)

    return new Response(JSON.stringify(productoActualizado), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al actualizar producto" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = Number.parseInt(params.id as string)
    await ProductoService.eliminar(id)

    return new Response(JSON.stringify({ message: "Producto eliminado" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al eliminar producto" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
