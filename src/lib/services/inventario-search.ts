import { supabase } from '../supabase';

// Servicio de búsquedas para inventario
export class InventarioSearchService {
  
  // Obtener productos con bajo stock
  static async obtenerBajoStock(limite: number = 10): Promise<any[]> {
    const { data, error } = await supabase
      .from('inventario')
      .select(`
        *,
        productos:producto_id (
          id,
          nombre,
          categoria,
          marca
        )
      `)
      .lte('cantidad', limite)
      .order('cantidad', { ascending: true });
    
    if (error) {
      throw new Error(`Error obteniendo productos con bajo stock: ${error.message}`);
    }
    
    return data || [];
  }
  
  // Buscar en inventario por ubicación
  static async buscarPorUbicacion(ubicacion: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('inventario')
      .select(`
        *,
        productos:producto_id (
          id,
          nombre,
          categoria,
          marca
        )
      `)
      .eq('ubicacion', ubicacion);
    
    if (error) {
      throw new Error(`Error buscando por ubicación: ${error.message}`);
    }
    
    return data || [];
  }
  
  // Buscar por proveedor
  static async buscarPorProveedor(proveedor: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('inventario')
      .select(`
        *,
        productos:producto_id (
          id,
          nombre,
          categoria,
          marca
        )
      `)
      .eq('proveedor', proveedor);
    
    if (error) {
      throw new Error(`Error buscando por proveedor: ${error.message}`);
    }
    
    return data || [];
  }
  
  // Buscar por rango de fechas de ingreso
  static async buscarPorRangoFechas(fechaInicio: string, fechaFin: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('inventario')
      .select(`
        *,
        productos:producto_id (
          id,
          nombre,
          categoria,
          marca
        )
      `)
      .gte('fecha_ingreso', fechaInicio)
      .lte('fecha_ingreso', fechaFin)
      .order('fecha_ingreso', { ascending: false });
    
    if (error) {
      throw new Error(`Error buscando por rango de fechas: ${error.message}`);
    }
    
    return data || [];
  }
  
  // Buscar por rango de costos
  static async buscarPorRangoCosto(min: number, max: number): Promise<any[]> {
    const { data, error } = await supabase
      .from('inventario')
      .select(`
        *,
        productos:producto_id (
          id,
          nombre,
          categoria,
          marca
        )
      `)
      .gte('costo_unitario', min)
      .lte('costo_unitario', max)
      .order('costo_unitario', { ascending: true });
    
    if (error) {
      throw new Error(`Error buscando por rango de costo: ${error.message}`);
    }
    
    return data || [];
  }
}