// src/pages/api/productos.ts
import { supabase } from '../../lib/supabase.js';
import type { APIRoute } from 'astro';

// Tipos para la base de datos
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion?: string;
  imagen_url?: string;
  stock_minimo?: number;
  activo?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Tipos para requests
export interface CreateProductoRequest {
  nombre: string;
  precio: number;
  categoria: string;
  descripcion?: string;
  imagen_url?: string;
  stock_minimo?: number;
  activo?: boolean;
}

export interface UpdateProductoRequest {
  id: number;
  nombre?: string;
  precio?: number;
  categoria?: string;
  descripcion?: string;
  imagen_url?: string;
  stock_minimo?: number;
  activo?: boolean;
}

export interface DeleteProductoRequest {
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

// Función de validación para productos
function validateProducto(producto: Partial<CreateProductoRequest>): string | null {
  if (!producto.nombre || producto.nombre.trim().length === 0) {
    return 'El nombre del producto es requerido';
  }
  
  if (!producto.precio || producto.precio <= 0) {
    return 'El precio debe ser mayor a 0';
  }
  
  if (!producto.categoria || producto.categoria.trim().length === 0) {
    return 'La categoría es requerida';
  }
  
  if (producto.stock_minimo && producto.stock_minimo < 0) {
    return 'El stock mínimo no puede ser negativo';
  }
  
  return null;
}

export const GET: APIRoute = async () => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    return createResponse<Producto[]>(data || []);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createErrorResponse(errorMessage);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: CreateProductoRequest = await request.json();
    
    // Validación
    const validationError = validateProducto(body);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    // Limpiar datos
    const cleanBody = {
      ...body,
      nombre: body.nombre.trim(),
      categoria: body.categoria.trim(),
      descripcion: body.descripcion?.trim(),
      precio: Number(body.precio),
      stock_minimo: body.stock_minimo ? Number(body.stock_minimo) : undefined,
      activo: body.activo !== undefined ? body.activo : true
    };

    const { data, error } = await supabase
      .from('productos')
      .insert([cleanBody])
      .select();

    if (error) throw error;

    return createResponse<Producto>(data[0], 201);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createErrorResponse(errorMessage);
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body: UpdateProductoRequest = await request.json();
    const { id, ...updateData } = body;
    
    // Validación básica
    if (!id) {
      return createErrorResponse('ID es requerido', 400);
    }

    // Validar campos si están presentes
    if (updateData.nombre !== undefined && updateData.nombre.trim().length === 0) {
      return createErrorResponse('El nombre no puede estar vacío', 400);
    }
    
    if (updateData.precio !== undefined && updateData.precio <= 0) {
      return createErrorResponse('El precio debe ser mayor a 0', 400);
    }
    
    if (updateData.categoria !== undefined && updateData.categoria.trim().length === 0) {
      return createErrorResponse('La categoría no puede estar vacía', 400);
    }
    
    if (updateData.stock_minimo !== undefined && updateData.stock_minimo < 0) {
      return createErrorResponse('El stock mínimo no puede ser negativo', 400);
    }

    // Limpiar datos
    const cleanUpdateData = {
      ...updateData,
      nombre: updateData.nombre?.trim(),
      categoria: updateData.categoria?.trim(),
      descripcion: updateData.descripcion?.trim(),
      precio: updateData.precio ? Number(updateData.precio) : undefined,
      stock_minimo: updateData.stock_minimo ? Number(updateData.stock_minimo) : undefined
    };

    // Remover campos undefined
    Object.keys(cleanUpdateData).forEach(key => {
      if (cleanUpdateData[key as keyof typeof cleanUpdateData] === undefined) {
        delete cleanUpdateData[key as keyof typeof cleanUpdateData];
      }
    });

    const { data, error } = await supabase
      .from('productos')
      .update(cleanUpdateData)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return createErrorResponse('Producto no encontrado', 404);
    }

    return createResponse<Producto>(data[0]);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createErrorResponse(errorMessage);
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const body: DeleteProductoRequest = await request.json();
    const { id } = body;
    
    // Validación básica
    if (!id) {
      return createErrorResponse('ID es requerido', 400);
    }

    // Verificar si el producto existe y si tiene inventario asociado
    const { data: inventarioData, error: inventarioError } = await supabase
      .from('inventario')
      .select('id')
      .eq('producto_id', id)
      .limit(1);

    if (inventarioError) throw inventarioError;

    if (inventarioData && inventarioData.length > 0) {
      return createErrorResponse('No se puede eliminar el producto porque tiene inventario asociado', 400);
    }

    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return createResponse<SuccessResponse>({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createErrorResponse(errorMessage);
  }
};