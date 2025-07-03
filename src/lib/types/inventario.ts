export interface InventarioItem {
  producto_id: number
  cantidad: number
  ubicacion: string
  proveedor: string
}

export interface Producto {
  id: number
  nombre: string
}

export interface BenchmarkResult {
  operacion: string
  tiempo: number
  timestamp: string
}

export interface OperationResult {
  success: boolean
  tiempoEjecucion: number
}

export interface SearchResult {
  item: InventarioItem | null
  tiempoEjecucion: number
}

export interface BenchmarkTimes {
  agregar: number
  buscar: number
  quitar: number
}

export type EstructuraType = "array" | "hashmap" | "bst" | "linkedlist"
export type NotificationType = "success" | "error" | "warning" | "info"
