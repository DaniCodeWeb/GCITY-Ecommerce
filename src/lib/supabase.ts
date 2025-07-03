import { createClient } from '@supabase/supabase-js';

// Arreglar el tipado de import.meta.env
const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string) || '';
const supabaseAnonKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string) || '';

// Validar que las variables de entorno existan
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase. Verifica PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para TypeScript
export interface Producto {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria: string;
  marca?: string;
  talla?: string;
  color?: string;
  material?: string;
  genero?: string;
  temporada?: string;
  tags?: string[];
  stock_minimo?: number;  // Agregado
  imagen_url?: string;    // Agregado
  activo?: boolean;       // Agregado
  created_at?: string;
  updated_at?: string;
}

export interface Inventario {
  id?: number;
  producto_id: number;
  cantidad: number;
  ubicacion?: string;
  proveedor?: string;
  fecha_ingreso?: string;
  fecha_vencimiento?: string;
  costo_unitario?: number;
  created_at?: string;
  updated_at?: string;
}

// Función para insertar datos de prueba
export async function insertarDatosPrueba() {
  const productos: Producto[] = [
    {
      nombre: "Camiseta Básica",
      descripcion: "Camiseta de algodón 100%",
      precio: 25.99,
      categoria: "Camisetas",
      marca: "BasicWear",
      talla: "M",
      color: "Blanco",
      material: "Algodón",
      genero: "Unisex",
      temporada: "Verano",
      tags: ["basico", "algodon", "casual"],
      stock_minimo: 10,
      imagen_url: "/placeholder.svg?height=300&width=300&text=Camiseta",
      activo: true
    },
    {
      nombre: "Jeans Clásicos",
      descripcion: "Jeans de corte clásico",
      precio: 79.99,
      categoria: "Pantalones",
      marca: "DenimCo",
      talla: "32",
      color: "Azul",
      material: "Denim",
      genero: "Masculino",
      temporada: "Todo el año",
      tags: ["jeans", "clasico", "denim"],
      stock_minimo: 5,
      imagen_url: "/placeholder.svg?height=300&width=300&text=Jeans",
      activo: true
    },
    // Agregar más productos según necesites
  ];

  const { data, error } = await supabase
    .from('productos')
    .insert(productos);

  if (error) {
    console.error('Error insertando productos:', error);
    throw error;
  } else {
    console.log('Productos insertados:', data);
    return data;
  }
}