import { supabase, type Producto } from '../supabase';

// Servicio de búsquedas para productos (para benchmarking)
export class ProductoSearchService {
  
  // Búsquedas específicas para el benchmark
  static async buscarPorCategoria(categoria: string): Promise<Producto[]> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('categoria', categoria);
    
    if (error) {
      throw new Error(`Error buscando por categoría: ${error.message}`);
    }
    
    return data || [];
  }
  
  static async buscarPorMarca(marca: string): Promise<Producto[]> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('marca', marca);
    
    if (error) {
      throw new Error(`Error buscando por marca: ${error.message}`);
    }
    
    return data || [];
  }
  
  static async buscarPorRangoPrecio(min: number, max: number): Promise<Producto[]> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .gte('precio', min)
      .lte('precio', max);
    
    if (error) {
      throw new Error(`Error buscando por rango de precio: ${error.message}`);
    }
    
    return data || [];
  }
  
  static async buscarPorNombre(nombre: string): Promise<Producto[]> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .ilike('nombre', `%${nombre}%`);
    
    if (error) {
      throw new Error(`Error buscando por nombre: ${error.message}`);
    }
    
    return data || [];
  }
  
  // Búsqueda con filtros múltiples
  static async buscarConFiltros(filtros: {
    categoria?: string;
    marca?: string;
    precioMin?: number;
    precioMax?: number;
    color?: string;
    talla?: string;
    genero?: string;
  }): Promise<Producto[]> {
    let query = supabase.from('productos').select('*');
    
    if (filtros.categoria) {
      query = query.eq('categoria', filtros.categoria);
    }
    
    if (filtros.marca) {
      query = query.eq('marca', filtros.marca);
    }
    
    if (filtros.precioMin !== undefined) {
      query = query.gte('precio', filtros.precioMin);
    }
    
    if (filtros.precioMax !== undefined) {
      query = query.lte('precio', filtros.precioMax);
    }
    
    if (filtros.color) {
      query = query.eq('color', filtros.color);
    }
    
    if (filtros.talla) {
      query = query.eq('talla', filtros.talla);
    }
    
    if (filtros.genero) {
      query = query.eq('genero', filtros.genero);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Error buscando con filtros: ${error.message}`);
    }
    
    return data || [];
  }
}