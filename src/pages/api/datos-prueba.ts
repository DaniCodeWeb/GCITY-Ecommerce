// src/pages/api/datos-prueba.ts

import { supabase } from '../../lib/supabase.js';
import type { APIRoute } from 'astro';

// Definir la interfaz para el producto
interface ProductoInput {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  marca: string;
  stock_minimo: number;
  imagen_url: string;
  activo: boolean;
}

// Función helper para crear respuestas
function createResponse<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function createErrorResponse(error: string, status = 500): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Datos de ejemplo para generar productos
const categorias = ["Camisetas", "Pantalones", "Chaquetas", "Zapatos", "Accesorios", "Vestidos", "Faldas", "Shorts"];
const marcas = ["Nike", "Adidas", "Zara", "H&M", "Uniqlo", "Forever21", "Pull&Bear", "Bershka"];
const nombres = [
  "Camiseta Básica", "Pantalón Vaquero", "Chaqueta Deportiva", "Zapatos Casuales",
  "Bolso de Mano", "Vestido Elegante", "Falda Plisada", "Shorts Deportivos",
  "Camiseta Estampada", "Pantalón Chino", "Chaqueta de Cuero", "Zapatos Formales",
  "Gorra Deportiva", "Vestido Casual", "Falda Vaquera", "Shorts de Playa"
];

const descripciones = [
  "Producto de alta calidad", "Diseño moderno y elegante", "Perfecto para uso diario",
  "Material resistente y duradero", "Estilo versátil", "Comodidad garantizada"
];

// Función tipada para generar producto aleatorio
function generarProductoAleatorio(): ProductoInput {
  const categoria = categorias[Math.floor(Math.random() * categorias.length)];
  const marca = marcas[Math.floor(Math.random() * marcas.length)];
  const nombre = nombres[Math.floor(Math.random() * nombres.length)];
  const descripcion = descripciones[Math.floor(Math.random() * descripciones.length)];
  
  return {
    nombre: `${nombre} ${Math.floor(Math.random() * 1000)}`,
    descripcion,
    precio: Math.round((Math.random() * 200 + 10) * 100) / 100,
    categoria,
    marca,
    stock_minimo: Math.floor(Math.random() * 20) + 5,
    imagen_url: `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(nombre)}`,
    activo: Math.random() > 0.1, // 90% activos
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('📡 Recibida petición POST para generar datos');
    
    const body = await request.json();
    const cantidad = body.cantidad || 500;
    
    console.log(`🎲 Generando ${cantidad} productos...`);
    
    // Generar productos aleatorios con tipo correcto
    const productos: ProductoInput[] = [];
    for (let i = 0; i < cantidad; i++) {
      productos.push(generarProductoAleatorio());
    }
    
    // Insertar en la base de datos
    const { data, error } = await supabase
      .from('productos')
      .insert(productos)
      .select();
    
    if (error) {
      console.error('❌ Error insertando en Supabase:', error);
      throw error;
    }
    
    console.log(`✅ ${cantidad} productos insertados en la base de datos`);
    
    return createResponse({
      message: `${cantidad} productos generados exitosamente`,
      productos: data?.length || 0,
    });
  } catch (error) {
    console.error('❌ Error generando datos:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createErrorResponse(errorMessage);
  }
};

export const DELETE: APIRoute = async () => {
  try {
    console.log('📡 Recibida petición DELETE para limpiar datos');
    
    // Primero eliminar registros de inventario relacionados
    const { error: inventarioError } = await supabase
      .from('inventario')
      .delete()
      .neq('id', 0); // Eliminar todos los registros
    
    if (inventarioError) {
      console.warn('⚠️ Error eliminando inventario:', inventarioError);
      // Continuar aunque haya error en inventario
    }
    
    // Luego eliminar todos los productos
    const { error: productosError } = await supabase
      .from('productos')
      .delete()
      .neq('id', 0); // Eliminar todos los registros
    
    if (productosError) {
      console.error('❌ Error eliminando productos:', productosError);
      throw productosError;
    }
    
    console.log('🗑️ Todos los datos eliminados de la base de datos');
    
    
    return createResponse({
      message: 'Todos los datos han sido eliminados exitosamente',
    });
  } catch (error) {
    console.error('❌ Error limpiando datos:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return createErrorResponse(errorMessage);
  }
};