import type { InventarioItem, OperationResult, SearchResult } from "../../types/inventario"

export class ArrayInventario {
  private items: InventarioItem[] = []

  agregar(item: InventarioItem): void {
    const existingIndex = this.items.findIndex((i) => i.producto_id === item.producto_id)
    if (existingIndex >= 0) {
      this.items[existingIndex].cantidad += item.cantidad
    } else {
      this.items.push({ ...item })
    }
  }

  quitar(producto_id: number, cantidad: number): OperationResult {
    const startTime = performance.now()
    const index = this.items.findIndex((i) => i.producto_id === producto_id)

    if (index >= 0) {
      if (this.items[index].cantidad >= cantidad) {
        this.items[index].cantidad -= cantidad
        if (this.items[index].cantidad === 0) {
          this.items.splice(index, 1)
        }
        const endTime = performance.now()
        return { success: true, tiempoEjecucion: endTime - startTime }
      }
    }

    const endTime = performance.now()
    return { success: false, tiempoEjecucion: endTime - startTime }
  }

  buscar(producto_id: number): SearchResult {
    const startTime = performance.now()
    const item = this.items.find((i) => i.producto_id === producto_id) || null
    const endTime = performance.now()
    return { item, tiempoEjecucion: endTime - startTime }
  }

  obtenerTodos(): InventarioItem[] {
    return [...this.items]
  }

  limpiar(): void {
    this.items = []
  }
}
