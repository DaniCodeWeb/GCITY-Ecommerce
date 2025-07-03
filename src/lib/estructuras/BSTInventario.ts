import type { InventarioItem, OperationResult, SearchResult } from "../../types/inventario"

class BSTNode {
  item: InventarioItem
  left: BSTNode | null = null
  right: BSTNode | null = null

  constructor(item: InventarioItem) {
    this.item = { ...item }
  }
}

export class BSTInventario {
  private root: BSTNode | null = null

  agregar(item: InventarioItem): void {
    const existingItem = this.buscarNodo(item.producto_id)
    if (existingItem) {
      existingItem.cantidad += item.cantidad
    } else {
      this.root = this.insertarNodo(this.root, item)
    }
  }

  private insertarNodo(node: BSTNode | null, item: InventarioItem): BSTNode {
    if (node === null) {
      return new BSTNode(item)
    }

    if (item.producto_id < node.item.producto_id) {
      node.left = this.insertarNodo(node.left, item)
    } else if (item.producto_id > node.item.producto_id) {
      node.right = this.insertarNodo(node.right, item)
    }

    return node
  }

  private buscarNodo(producto_id: number): InventarioItem | null {
    return this.buscarNodoRecursivo(this.root, producto_id)
  }

  private buscarNodoRecursivo(node: BSTNode | null, producto_id: number): InventarioItem | null {
    if (node === null) {
      return null
    }

    if (producto_id === node.item.producto_id) {
      return node.item
    }

    if (producto_id < node.item.producto_id) {
      return this.buscarNodoRecursivo(node.left, producto_id)
    } else {
      return this.buscarNodoRecursivo(node.right, producto_id)
    }
  }

  buscar(producto_id: number): SearchResult {
    const startTime = performance.now()
    const item = this.buscarNodoRecursivo(this.root, producto_id)
    const endTime = performance.now()
    return { item, tiempoEjecucion: endTime - startTime }
  }

  quitar(producto_id: number, cantidad: number): OperationResult {
    const startTime = performance.now()
    const item = this.buscarNodoRecursivo(this.root, producto_id)

    if (item && item.cantidad >= cantidad) {
      item.cantidad -= cantidad
      if (item.cantidad === 0) {
        this.root = this.eliminarNodo(this.root, producto_id)
      }
      const endTime = performance.now()
      return { success: true, tiempoEjecucion: endTime - startTime }
    }

    const endTime = performance.now()
    return { success: false, tiempoEjecucion: endTime - startTime }
  }

  private eliminarNodo(node: BSTNode | null, producto_id: number): BSTNode | null {
    if (node === null) {
      return node
    }

    if (producto_id < node.item.producto_id) {
      node.left = this.eliminarNodo(node.left, producto_id)
    } else if (producto_id > node.item.producto_id) {
      node.right = this.eliminarNodo(node.right, producto_id)
    } else {
      if (node.left === null) {
        return node.right
      } else if (node.right === null) {
        return node.left
      }

      const minNode = this.encontrarMinimo(node.right)
      node.item = { ...minNode.item }
      node.right = this.eliminarNodo(node.right, node.item.producto_id)
    }

    return node
  }

  private encontrarMinimo(node: BSTNode): BSTNode {
    while (node.left !== null) {
      node = node.left
    }
    return node
  }

  obtenerTodos(): InventarioItem[] {
    const items: InventarioItem[] = []
    this.inOrder(this.root, items)
    return items
  }

  private inOrder(node: BSTNode | null, items: InventarioItem[]): void {
    if (node !== null) {
      this.inOrder(node.left, items)
      items.push({ ...node.item })
      this.inOrder(node.right, items)
    }
  }

  limpiar(): void {
    this.root = null
  }
}
