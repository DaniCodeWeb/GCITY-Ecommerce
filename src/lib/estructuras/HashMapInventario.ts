import type { InventarioItem, OperationResult, SearchResult } from "../../types/inventario"

export class HashMapInventario {
  private items: Map<number, InventarioItem> = new Map()

  agregar(item: InventarioItem): void {
    const existingItem = this.items.get(item.producto_id)
    if (existingItem) {
      existingItem.cantidad += item.cantidad
    } else {
      this.items.set(item.producto_id, { ...item })
    }
  }

  quitar(producto_id: number, cantidad: number): OperationResult {
    const startTime = performance.now()
    const item = this.items.get(producto_id)

    if (item && item.cantidad >= cantidad) {
      item.cantidad -= cantidad
      if (item.cantidad === 0) {
        this.items.delete(producto_id)
      }
      const endTime = performance.now()
      return { success: true, tiempoEjecucion: endTime - startTime }
    }

    const endTime = performance.now()
    return { success: false, tiempoEjecucion: endTime - startTime }
  }

  buscar(producto_id: number): SearchResult {
    const startTime = performance.now()
    const item = this.items.get(producto_id) || null
    const endTime = performance.now()
    return { item, tiempoEjecucion: endTime - startTime }
  }

  obtenerTodos(): InventarioItem[] {
    return Array.from(this.items.values())
  }

  limpiar(): void {
    this.items.clear()
  }
}
