import type { InventarioItem, Producto, BenchmarkResult, EstructuraType, BenchmarkTimes } from "../types/inventario"

import { ArrayInventario } from "./estructuras/ArrayInventario"
import { HashMapInventario } from "./estructuras/HashMapInventario"
import { BSTInventario } from "./estructuras/BSTInventario"
import { LinkedListInventario } from "./estructuras/LinkedListInventario"

export class InventarioManager {
  private arrayInventario: ArrayInventario
  private hashMapInventario: HashMapInventario
  private bstInventario: BSTInventario
  private linkedListInventario: LinkedListInventario

  private inventario: InventarioItem[] = []
  private productos: Producto[] = []
  private benchmarkResults: BenchmarkResult[] = []

  constructor() {
    this.arrayInventario = new ArrayInventario()
    this.hashMapInventario = new HashMapInventario()
    this.bstInventario = new BSTInventario()
    this.linkedListInventario = new LinkedListInventario()

    this.inicializar()
  }

  private async inicializar(): Promise<void> {
    await this.cargarInventario()
    await this.cargarProductos()
  }

  private async cargarInventario(): Promise<void> {
    try {
      // Datos de demo - aquí podrías conectar con Supabase
      this.inventario = [
        { producto_id: 1, cantidad: 100, ubicacion: "Almacén A", proveedor: "Proveedor 1" },
        { producto_id: 2, cantidad: 50, ubicacion: "Almacén B", proveedor: "Proveedor 2" },
        { producto_id: 3, cantidad: 75, ubicacion: "Almacén C", proveedor: "Proveedor 3" },
        { producto_id: 4, cantidad: 200, ubicacion: "Almacén A", proveedor: "Proveedor 1" },
        { producto_id: 5, cantidad: 30, ubicacion: "Almacén B", proveedor: "Proveedor 2" },
      ]

      this.cargarEstructurasDatos()
    } catch (error) {
      console.error("Error al cargar inventario:", error)
    }
  }

  private async cargarProductos(): Promise<void> {
    try {
      this.productos = [
        { id: 1, nombre: "Laptop Dell" },
        { id: 2, nombre: "Mouse Logitech" },
        { id: 3, nombre: "Teclado Mecánico" },
        { id: 4, nombre: 'Monitor 24"' },
        { id: 5, nombre: "Webcam HD" },
      ]
    } catch (error) {
      console.error("Error al cargar productos:", error)
    }
  }

  private cargarEstructurasDatos(): void {
    this.arrayInventario.limpiar()
    this.hashMapInventario.limpiar()
    this.bstInventario.limpiar()
    this.linkedListInventario.limpiar()

    this.inventario.forEach((item) => {
      this.arrayInventario.agregar(item)
      this.hashMapInventario.agregar(item)
      this.bstInventario.agregar(item)
      this.linkedListInventario.agregar(item)
    })
  }

  private obtenerEstructura(tipo: EstructuraType) {
    switch (tipo) {
      case "array":
        return this.arrayInventario
      case "hashmap":
        return this.hashMapInventario
      case "bst":
        return this.bstInventario
      case "linkedlist":
        return this.linkedListInventario
      default:
        return this.arrayInventario
    }
  }

  async añadirStock(
    producto_id: number,
    cantidad: number,
    estructura: EstructuraType,
  ): Promise<{ success: boolean; tiempo: number; mensaje: string }> {
    try {
      const startTime = performance.now()

      const item: InventarioItem = {
        producto_id,
        cantidad,
        ubicacion: "Almacén General",
        proveedor: "Proveedor Test",
      }

      this.obtenerEstructura(estructura).agregar(item)
      const endTime = performance.now()

      // Actualizar inventario local
      const existingIndex = this.inventario.findIndex((item) => item.producto_id === producto_id)
      if (existingIndex >= 0) {
        this.inventario[existingIndex].cantidad += cantidad
      } else {
        this.inventario.push(item)
      }

      await this.cargarInventario()

      return {
        success: true,
        tiempo: endTime - startTime,
        mensaje: "Stock añadido correctamente",
      }
    } catch (error) {
      return {
        success: false,
        tiempo: 0,
        mensaje: `Error: ${error instanceof Error ? error.message : "Error desconocido"}`,
      }
    }
  }

  async quitarStock(
    producto_id: number,
    cantidad: number,
    estructura: EstructuraType,
  ): Promise<{ success: boolean; tiempo: number; mensaje: string }> {
    try {
      const resultado = this.obtenerEstructura(estructura).quitar(producto_id, cantidad)

      if (resultado.success) {
        const existingIndex = this.inventario.findIndex((item) => item.producto_id === producto_id)
        if (existingIndex >= 0) {
          this.inventario[existingIndex].cantidad -= cantidad
          if (this.inventario[existingIndex].cantidad <= 0) {
            this.inventario.splice(existingIndex, 1)
          }
        }

        await this.cargarInventario()

        return {
          success: true,
          tiempo: resultado.tiempoEjecucion,
          mensaje: "Stock removido correctamente",
        }
      } else {
        return {
          success: false,
          tiempo: resultado.tiempoEjecucion,
          mensaje: "No hay suficiente stock disponible",
        }
      }
    } catch (error) {
      return {
        success: false,
        tiempo: 0,
        mensaje: `Error: ${error instanceof Error ? error.message : "Error desconocido"}`,
      }
    }
  }

  buscarInventario(
    producto_id: number,
    estructura: EstructuraType,
  ): { item: InventarioItem | null; tiempo: number; mensaje: string } {
    try {
      const resultado = this.obtenerEstructura(estructura).buscar(producto_id)

      if (resultado.item) {
        const nombreProducto = this.obtenerNombreProducto(producto_id)
        return {
          item: resultado.item,
          tiempo: resultado.tiempoEjecucion,
          mensaje: `Producto encontrado: ${nombreProducto} - Cantidad: ${resultado.item.cantidad}`,
        }
      } else {
        return {
          item: null,
          tiempo: resultado.tiempoEjecucion,
          mensaje: `Producto con ID ${producto_id} no encontrado`,
        }
      }
    } catch (error) {
      return {
        item: null,
        tiempo: 0,
        mensaje: `Error: ${error instanceof Error ? error.message : "Error desconocido"}`,
      }
    }
  }

  async ejecutarBenchmarkMasivo(numOperaciones: number): Promise<Record<EstructuraType, BenchmarkTimes>> {
    const estructuras: EstructuraType[] = ["array", "hashmap", "bst", "linkedlist"]
    const resultados: Record<EstructuraType, BenchmarkTimes> = {} as Record<EstructuraType, BenchmarkTimes>

    for (const estructura of estructuras) {
      resultados[estructura] = await this.benchmarkEstructura(estructura, numOperaciones)
    }

    return resultados
  }

  private async benchmarkEstructura(estructura: EstructuraType, numOperaciones: number): Promise<BenchmarkTimes> {
    const estructuraObj = this.obtenerEstructura(estructura)
    const tiempos: BenchmarkTimes = {
      agregar: 0,
      buscar: 0,
      quitar: 0,
    }

    // Benchmark Agregar
    const startAdd = performance.now()
    for (let i = 0; i < numOperaciones; i++) {
      const item: InventarioItem = {
        producto_id: Math.floor(Math.random() * 10000) + 1000,
        cantidad: Math.floor(Math.random() * 100) + 1,
        ubicacion: `Almacén ${Math.floor(Math.random() * 5) + 1}`,
        proveedor: `Proveedor ${Math.floor(Math.random() * 3) + 1}`,
      }
      estructuraObj.agregar(item)
    }
    const endAdd = performance.now()
    tiempos.agregar = endAdd - startAdd

    // Benchmark Buscar
    const startSearch = performance.now()
    for (let i = 0; i < numOperaciones; i++) {
      const producto_id = Math.floor(Math.random() * 10000) + 1000
      estructuraObj.buscar(producto_id)
    }
    const endSearch = performance.now()
    tiempos.buscar = endSearch - startSearch

    // Benchmark Quitar
    const startRemove = performance.now()
    for (let i = 0; i < numOperaciones / 2; i++) {
      const producto_id = Math.floor(Math.random() * 10000) + 1000
      estructuraObj.quitar(producto_id, 1)
    }
    const endRemove = performance.now()
    tiempos.quitar = endRemove - startRemove

    return tiempos
  }

  private obtenerNombreProducto(producto_id: number): string {
    const producto = this.productos.find((p) => p.id === producto_id)
    return producto ? producto.nombre : `Producto ${producto_id}`
  }

  getInventario(): InventarioItem[] {
    return [...this.inventario]
  }

  getProductos(): Producto[] {
    return [...this.productos]
  }

  editarItem(producto_id: number, nuevaCantidad: number): boolean {
    const item = this.inventario.find((i) => i.producto_id === producto_id)
    if (item && nuevaCantidad >= 0) {
      item.cantidad = nuevaCantidad
      this.cargarEstructurasDatos()
      return true
    }
    return false
  }

  eliminarItem(producto_id: number): boolean {
    const index = this.inventario.findIndex((i) => i.producto_id === producto_id)
    if (index >= 0) {
      this.inventario.splice(index, 1)
      this.cargarEstructurasDatos()
      return true
    }
    return false
  }
}
