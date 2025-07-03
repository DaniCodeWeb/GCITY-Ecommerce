import { supabase, type Producto } from '../supabase';

// Servicio para productos
export class ProductoService {
  
  // Crear producto
  static async crear(producto: Omit<Producto, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('productos')
      .insert([producto])
      .select();
    
    if (error) {
      throw new Error(`Error creando producto: ${error.message}`);
    }
    
    return data[0];
  }
  
  // Obtener todos los productos
  static async obtenerTodos(): Promise<Producto[]> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error obteniendo productos: ${error.message}`);
    }
    
    return data || [];
  }
  
  // Obtener producto por ID
  static async obtenerPorId(id: number): Promise<Producto | null> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No encontrado
      }
      throw new Error(`Error obteniendo producto: ${error.message}`);
    }
    
    return data;
  }
  
  // Actualizar producto
  static async actualizar(id: number, producto: Partial<Producto>) {
    const { data, error } = await supabase
      .from('productos')
      .update(producto)
      .eq('id', id)
      .select();
    
    if (error) {
      throw new Error(`Error actualizando producto: ${error.message}`);
    }
    
    return data[0];
  }
  
  // Eliminar producto (CORREGIDO)
  static async eliminar(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error eliminando producto: ${error.message}`);
    }
    
    return true;
  }
}