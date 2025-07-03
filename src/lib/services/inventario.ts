import { supabase, type Inventario } from '../supabase';

// Servicio para inventario
export class InventarioService {
  
  // Crear entrada de inventario
  static async crear(inventario: Omit<Inventario, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('inventario')
      .insert([inventario])
      .select();
    
    if (error) {
      throw new Error(`Error creando inventario: ${error.message}`);
    }
    
    return data[0];
  }
  
  // Obtener todo el inventario con información del producto
  static async obtenerTodos(): Promise<any[]> {
    const { data, error } = await supabase
      .from('inventario')
      .select(`
        *,
        productos:producto_id (
          id,
          nombre,
          categoria,
          marca,
          precio
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error obteniendo inventario: ${error.message}`);
    }
    
    return data || [];
  }
  
  // Obtener inventario por producto
  static async obtenerPorProducto(productoId: number): Promise<Inventario[]> {
    const { data, error } = await supabase
      .from('inventario')
      .select('*')
      .eq('producto_id', productoId);
    
    if (error) {
      throw new Error(`Error obteniendo inventario por producto: ${error.message}`);
    }
    
    return data || [];
  }
  
  // Actualizar cantidad de inventario
  static async actualizarCantidad(id: number, cantidad: number) {
    const { data, error } = await supabase
      .from('inventario')
      .update({ cantidad })
      .eq('id', id)
      .select();
    
    if (error) {
      throw new Error(`Error actualizando cantidad: ${error.message}`);
    }
    
    return data[0];
  }
  
  // Eliminar entrada de inventario (CORREGIDO)
  static async eliminar(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('inventario')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error eliminando inventario: ${error.message}`);
    }
    
    return true;
  }
}