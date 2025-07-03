// src/pages/api/inventario.ts
import { supabase } from '../../lib/supabase.js';
import type { APIRoute } from 'astro';

// Tipos para la base de datos
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  created_at?: string;
  updated_at?: string;
}

export interface InventarioItem {
  id: number;
  producto_id: number;
  cantidad: number;
  ubicacion?: string;
  proveedor?: string;
  created_at?: string;
  updated_at?: string;
  productos?: Producto;
}

// Tipos para requests
export interface CreateInventarioRequest {
  producto_id: number;
  cantidad: number;
  ubicacion?: string;
  proveedor?: string;
}

export interface UpdateInventarioRequest {
  id: number;
  cantidad?: number;
  ubicacion?: string;
  proveedor?: string;
}

export interface DeleteInventarioRequest {
  id: number;
}

// Tipos para responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface SuccessResponse {
  success: boolean;
}

// Función helper para crear respuestas
function createResponse<T>(data: T, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function createErrorResponse(error: string, status: number = 500): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const GET: APIRoute = async () => {
  try {
    const { data, error } = await supabase
      .from('inventario')
      .select(`
        *,
        productos (
          nombre,
          precio,
          categoria
        )
      `)
      .order('id', { ascending: true });

    if (error) throw error;

    return createResponse<InventarioItem[]>(data || []);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createErrorResponse(errorMessage);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: CreateInventarioRequest = await request.json();
    
    // Validación básica
    if (!body.producto_id || !body.cantidad) {
      return createErrorResponse('producto_id y cantidad son requeridos', 400);
    }

    if (body.cantidad <= 0) {
      return createErrorResponse('La cantidad debe ser mayor a 0', 400);
    }

    const { data, error } = await supabase
      .from('inventario')
      .insert([body])
      .select();

    if (error) throw error;

    return createResponse<InventarioItem>(data[0], 201);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createErrorResponse(errorMessage);
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body: UpdateInventarioRequest = await request.json();
    const { id, ...updateData } = body;
    
    // Validación básica
    if (!id) {
      return createErrorResponse('ID es requerido', 400);
    }

    if (updateData.cantidad !== undefined && updateData.cantidad < 0) {
      return createErrorResponse('La cantidad no puede ser negativa', 400);
    }

    const { data, error } = await supabase
      .from('inventario')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return createErrorResponse('Inventario no encontrado', 404);
    }

    return createResponse<InventarioItem>(data[0]);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createErrorResponse(errorMessage);
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const body: DeleteInventarioRequest = await request.json();
    const { id } = body;
    
    // Validación básica
    if (!id) {
      return createErrorResponse('ID es requerido', 400);
    }

    const { error } = await supabase
      .from('inventario')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return createResponse<SuccessResponse>({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createErrorResponse(errorMessage);
  }
};