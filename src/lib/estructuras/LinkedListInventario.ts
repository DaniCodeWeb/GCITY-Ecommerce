import type { InventarioItem, OperationResult, SearchResult } from "../../types/inventario"

class LinkedListNode {
  item: InventarioItem
  next: LinkedListNode | null = null

  constructor(item: InventarioItem) {
    this.item = { ...item }
  }
}

export class LinkedListInventario {
  private head: LinkedListNode | null = null

  agregar(item: InventarioItem): void {
    const existingNode = this.encontrarNodo(item.producto_id)
    if (existingNode) {
      existingNode.item.cantidad += item.cantidad
    } else {
      const newNode = new LinkedListNode(item)
      newNode.next = this.head
      this.head = newNode
    }
  }

  private encontrarNodo(producto_id: number): LinkedListNode | null {
    let current = this.head
    while (current !== null) {
      if (current.item.producto_id === producto_id) {
        return current
      }
      current = current.next
    }
    return null
  }

  buscar(producto_id: number): SearchResult {
    const startTime = performance.now()
    const node = this.encontrarNodo(producto_id)
    const endTime = performance.now()
    return { item: node ? node.item : null, tiempoEjecucion: endTime - startTime }
  }

  quitar(producto_id: number, cantidad: number): OperationResult {
    const startTime = performance.now()
    const node = this.encontrarNodo(producto_id)

    if (node && node.item.cantidad >= cantidad) {
      node.item.cantidad -= cantidad
      if (node.item.cantidad === 0) {
        this.eliminarNodo(producto_id)
      }
      const endTime = performance.now()
      return { success: true, tiempoEjecucion: endTime - startTime }
    }

    const endTime = performance.now()
    return { success: false, tiempoEjecucion: endTime - startTime }
  }

  private eliminarNodo(producto_id: number): void {
    if (this.head === null) return

    if (this.head.item.producto_id === producto_id) {
      this.head = this.head.next
      return
    }

    let current = this.head
    while (current.next !== null) {
      if (current.next.item.producto_id === producto_id) {
        current.next = current.next.next
        return
      }
      current = current.next
    }
  }

  obtenerTodos(): InventarioItem[] {
    const items: InventarioItem[] = []
    let current = this.head
    while (current !== null) {
      items.push({ ...current.item })
      current = current.next
    }
    return items
  }

  limpiar(): void {
    this.head = null
  }
}
