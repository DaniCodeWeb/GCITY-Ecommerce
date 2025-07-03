// src/scripts/inventario-manager.js

// ======================================================
// ESTRUCTURAS DE DATOS PARA INVENTARIO
// ======================================================

// 1. Array Simple
class ArrayInventario {
  constructor() {
    this.items = [];
  }

  agregar(item) {
    const existingIndex = this.items.findIndex(i => i.producto_id === item.producto_id);
    if (existingIndex >= 0) {
      this.items[existingIndex].cantidad += item.cantidad;
    } else {
      this.items.push(item);
    }
  }

  quitar(producto_id, cantidad) {
    const startTime = performance.now();
    const index = this.items.findIndex(i => i.producto_id === producto_id);
    if (index >= 0) {
      if (this.items[index].cantidad >= cantidad) {
        this.items[index].cantidad -= cantidad;
        if (this.items[index].cantidad === 0) {
          this.items.splice(index, 1);
        }
        const endTime = performance.now();
        return { success: true, tiempoEjecucion: endTime - startTime };
      }
    }
    const endTime = performance.now();
    return { success: false, tiempoEjecucion: endTime - startTime };
  }

  buscar(producto_id) {
    const startTime = performance.now();
    const item = this.items.find(i => i.producto_id === producto_id);
    const endTime = performance.now();
    return { item, tiempoEjecucion: endTime - startTime };
  }

  obtenerTodos() {
    return this.items;
  }

  limpiar() {
    this.items = [];
  }
}

// 2. HashMap
class HashMapInventario {
  constructor() {
    this.items = new Map();
  }

  agregar(item) {
    const existingItem = this.items.get(item.producto_id);
    if (existingItem) {
      existingItem.cantidad += item.cantidad;
    } else {
      this.items.set(item.producto_id, item);
    }
  }

  quitar(producto_id, cantidad) {
    const startTime = performance.now();
    const item = this.items.get(producto_id);
    if (item && item.cantidad >= cantidad) {
      item.cantidad -= cantidad;
      if (item.cantidad === 0) {
        this.items.delete(producto_id);
      }
      const endTime = performance.now();
      return { success: true, tiempoEjecucion: endTime - startTime };
    }
    const endTime = performance.now();
    return { success: false, tiempoEjecucion: endTime - startTime };
  }

  buscar(producto_id) {
    const startTime = performance.now();
    const item = this.items.get(producto_id);
    const endTime = performance.now();
    return { item, tiempoEjecucion: endTime - startTime };
  }

  obtenerTodos() {
    return Array.from(this.items.values());
  }

  limpiar() {
    this.items.clear();
  }
}

// 3. BST (Binary Search Tree)
class BSTNode {
  constructor(item) {
    this.item = item;
    this.left = null;
    this.right = null;
  }
}

class BSTInventario {
  constructor() {
    this.root = null;
  }

  agregar(item) {
    const existingItem = this.buscarNodo(item.producto_id);
    if (existingItem) {
      existingItem.cantidad += item.cantidad;
    } else {
      this.root = this.insertarNodo(this.root, item);
    }
  }

  insertarNodo(node, item) {
    if (node === null) {
      return new BSTNode(item);
    }

    if (item.producto_id < node.item.producto_id) {
      node.left = this.insertarNodo(node.left, item);
    } else if (item.producto_id > node.item.producto_id) {
      node.right = this.insertarNodo(node.right, item);
    }

    return node;
  }

  buscarNodo(producto_id) {
    const startTime = performance.now();
    const resultado = this.buscarNodoRecursivo(this.root, producto_id);
    const endTime = performance.now();
    return resultado;
  }

  buscarNodoRecursivo(node, producto_id) {
    if (node === null) {
      return null;
    }

    if (producto_id === node.item.producto_id) {
      return node.item;
    }

    if (producto_id < node.item.producto_id) {
      return this.buscarNodoRecursivo(node.left, producto_id);
    } else {
      return this.buscarNodoRecursivo(node.right, producto_id);
    }
  }

  buscar(producto_id) {
    const startTime = performance.now();
    const item = this.buscarNodoRecursivo(this.root, producto_id);
    const endTime = performance.now();
    return { item, tiempoEjecucion: endTime - startTime };
  }

  quitar(producto_id, cantidad) {
    const startTime = performance.now();
    const item = this.buscarNodoRecursivo(this.root, producto_id);
    if (item && item.cantidad >= cantidad) {
      item.cantidad -= cantidad;
      if (item.cantidad === 0) {
        this.root = this.eliminarNodo(this.root, producto_id);
      }
      const endTime = performance.now();
      return { success: true, tiempoEjecucion: endTime - startTime };
    }
    const endTime = performance.now();
    return { success: false, tiempoEjecucion: endTime - startTime };
  }

  eliminarNodo(node, producto_id) {
    if (node === null) {
      return node;
    }

    if (producto_id < node.item.producto_id) {
      node.left = this.eliminarNodo(node.left, producto_id);
    } else if (producto_id > node.item.producto_id) {
      node.right = this.eliminarNodo(node.right, producto_id);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      node.item = this.encontrarMinimo(node.right);
      node.right = this.eliminarNodo(node.right, node.item.producto_id);
    }

    return node;
  }

  encontrarMinimo(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.item;
  }

  obtenerTodos() {
    const items = [];
    this.inOrder(this.root, items);
    return items;
  }

  inOrder(node, items) {
    if (node !== null) {
      this.inOrder(node.left, items);
      items.push(node.item);
      this.inOrder(node.right, items);
    }
  }

  limpiar() {
    this.root = null;
  }
}

// 4. LinkedList
class LinkedListNode {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class LinkedListInventario {
  constructor() {
    this.head = null;
  }

  agregar(item) {
    const existingNode = this.encontrarNodo(item.producto_id);
    if (existingNode) {
      existingNode.item.cantidad += item.cantidad;
    } else {
      const newNode = new LinkedListNode(item);
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  encontrarNodo(producto_id) {
    let current = this.head;
    while (current !== null) {
      if (current.item.producto_id === producto_id) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  buscar(producto_id) {
    const startTime = performance.now();
    const node = this.encontrarNodo(producto_id);
    const endTime = performance.now();
    return { item: node ? node.item : null, tiempoEjecucion: endTime - startTime };
  }

  quitar(producto_id, cantidad) {
    const startTime = performance.now();
    const node = this.encontrarNodo(producto_id);
    if (node && node.item.cantidad >= cantidad) {
      node.item.cantidad -= cantidad;
      if (node.item.cantidad === 0) {
        this.eliminarNodo(producto_id);
      }
      const endTime = performance.now();
      return { success: true, tiempoEjecucion: endTime - startTime };
    }
    const endTime = performance.now();
    return { success: false, tiempoEjecucion: endTime - startTime };
  }

  eliminarNodo(producto_id) {
    if (this.head === null) return;

    if (this.head.item.producto_id === producto_id) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      if (current.next.item.producto_id === producto_id) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  obtenerTodos() {
    const items = [];
    let current = this.head;
    while (current !== null) {
      items.push(current.item);
      current = current.next;
    }
    return items;
  }

  limpiar() {
    this.head = null;
  }
}

// ======================================================
// GESTOR DE INVENTARIO
// ======================================================

class InventarioManager {
  constructor() {
    console.log('🚀 Inicializando InventarioManager...');
    
    // Estructuras de datos
    this.arrayInventario = new ArrayInventario();
    this.hashMapInventario = new HashMapInventario();
    this.bstInventario = new BSTInventario();
    this.linkedListInventario = new LinkedListInventario();
    
    // Estado de la aplicación
    this.inventario = [];
    this.productos = [];
    this.benchmarkResults = [];
    
    // Inicializar
    this.inicializar();
  }

  async inicializar() {
    console.log('🔧 Inicializando elementos DOM...');
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.obtenerElementosDOM();
    this.registrarEventListeners();
    await this.cargarInventario();
    await this.cargarProductos();
  }

  obtenerElementosDOM() {
    this.elementos = {};
    
    const elementosIds = [
      'producto-id-add', 'cantidad-add', 'estructura-add', 'btn-add-stock',
      'producto-id-remove', 'cantidad-remove', 'estructura-remove', 'btn-remove-stock',
      'producto-id-search', 'estructura-search', 'btn-search-inventory',
      'num-operaciones', 'btn-massive-benchmark', 'btn-clear-results',
      'btn-refresh-inventory', 'benchmark-results', 'inventario-table'
    ];
    
    elementosIds.forEach(id => {
      const elemento = document.getElementById(id);
      if (elemento) {
        this.elementos[id] = elemento;
        console.log(`✅ Elemento encontrado: ${id}`);
      } else {
        console.error(`❌ Elemento NO encontrado: ${id}`);
      }
    });
  }

  registrarEventListeners() {
    console.log('🎯 Registrando event listeners...');
    
    // Añadir stock
    if (this.elementos['btn-add-stock']) {
      this.elementos['btn-add-stock'].addEventListener('click', () => {
        this.añadirStock();
      });
    }

    // Quitar stock
    if (this.elementos['btn-remove-stock']) {
      this.elementos['btn-remove-stock'].addEventListener('click', () => {
        this.quitarStock();
      });
    }

    // Buscar inventario
    if (this.elementos['btn-search-inventory']) {
      this.elementos['btn-search-inventory'].addEventListener('click', () => {
        this.buscarInventario();
      });
    }

    // Benchmark masivo
    if (this.elementos['btn-massive-benchmark']) {
      this.elementos['btn-massive-benchmark'].addEventListener('click', () => {
        this.ejecutarBenchmarkMasivo();
      });
    }

    // Limpiar resultados
    if (this.elementos['btn-clear-results']) {
      this.elementos['btn-clear-results'].addEventListener('click', () => {
        this.limpiarResultados();
      });
    }

    // Refrescar inventario
    if (this.elementos['btn-refresh-inventory']) {
      this.elementos['btn-refresh-inventory'].addEventListener('click', () => {
        this.cargarInventario();
      });
    }
  }

  async cargarInventario() {
    try {
      console.log('📥 Cargando inventario...');
      
      const response = await fetch('/api/inventario');
      if (!response.ok) {
        throw new Error(`Error al cargar inventario: ${response.status}`);
      }
      
      const data = await response.json();
      this.inventario = data;
      
      // Cargar en estructuras de datos
      this.cargarEstructurasDatos();
      
      // Actualizar UI
      this.actualizarTablaInventario();
      
      console.log(`✅ Inventario cargado: ${this.inventario.length} items`);
    } catch (error) {
      console.error('❌ Error al cargar inventario:', error);
      this.mostrarNotificacion('Error al cargar inventario', 'error');
    }
  }

  async cargarProductos() {
    try {
      const response = await fetch('/api/productos');
      if (!response.ok) {
        throw new Error(`Error al cargar productos: ${response.status}`);
      }
      
      const data = await response.json();
      this.productos = data;
      
      console.log(`✅ Productos cargados: ${this.productos.length} productos`);
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
    }
  }

  cargarEstructurasDatos() {
    console.log('🏗️ Cargando estructuras de datos...');
    
    // Limpiar estructuras
    this.arrayInventario.limpiar();
    this.hashMapInventario.limpiar();
    this.bstInventario.limpiar();
    this.linkedListInventario.limpiar();
    
    // Cargar inventario en cada estructura
    this.inventario.forEach(item => {
      this.arrayInventario.agregar(item);
      this.hashMapInventario.agregar(item);
      this.bstInventario.agregar(item);
      this.linkedListInventario.agregar(item);
    });
    
    console.log(`✅ Estructuras cargadas con ${this.inventario.length} items`);
  }

  async añadirStock() {
    const producto_id = parseInt(this.elementos['producto-id-add'].value);
    const cantidad = parseInt(this.elementos['cantidad-add'].value);
    const estructura = this.elementos['estructura-add'].value;

    if (!producto_id || !cantidad || cantidad <= 0) {
      this.mostrarNotificacion('Por favor, ingrese valores válidos', 'error');
      return;
    }

    try {
      const response = await fetch('/api/inventario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          producto_id,
          cantidad,
          operacion: 'add'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al añadir stock');
      }

      const data = await response.json();
      
      // Medir rendimiento con la estructura seleccionada
      const startTime = performance.now();
      this.obtenerEstructura(estructura).agregar({
        producto_id,
        cantidad,
        ubicacion: 'Almacén General',
        proveedor: 'Proveedor Test'
      });
      const endTime = performance.now();
      
      this.agregarResultadoBenchmark(`Añadir Stock (${estructura.toUpperCase()})`, endTime - startTime);
      this.mostrarNotificacion(`Stock añadido correctamente`, 'success');
      
      await this.cargarInventario();
      
      // Limpiar campos
      this.elementos['producto-id-add'].value = '';
      this.elementos['cantidad-add'].value = '';
      
    } catch (error) {
      console.error('❌ Error al añadir stock:', error);
      this.mostrarNotificacion(`Error: ${error.message}`, 'error');
    }
  }

  async quitarStock() {
    const producto_id = parseInt(this.elementos['producto-id-remove'].value);
    const cantidad = parseInt(this.elementos['cantidad-remove'].value);
    const estructura = this.elementos['estructura-remove'].value;

    if (!producto_id || !cantidad || cantidad <= 0) {
      this.mostrarNotificacion('Por favor, ingrese valores válidos', 'error');
      return;
    }

    try {
      const response = await fetch('/api/inventario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          producto_id,
          cantidad,
          operacion: 'remove'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al quitar stock');
      }

      // Medir rendimiento con la estructura seleccionada
      const resultado = this.obtenerEstructura(estructura).quitar(producto_id, cantidad);
      
      this.agregarResultadoBenchmark(`Quitar Stock (${estructura.toUpperCase()})`, resultado.tiempoEjecucion);
      
      if (resultado.success) {
        this.mostrarNotificacion(`Stock removido correctamente`, 'success');
      } else {
        this.mostrarNotificacion(`No hay suficiente stock disponible`, 'error');
      }
      
      await this.cargarInventario();
      
      // Limpiar campos
      this.elementos['producto-id-remove'].value = '';
      this.elementos['cantidad-remove'].value = '';
      
    } catch (error) {
      console.error('❌ Error al quitar stock:', error);
      this.mostrarNotificacion(`Error: ${error.message}`, 'error');
    }
  }

  buscarInventario() {
    const producto_id = parseInt(this.elementos['producto-id-search'].value);
    const estructura = this.elementos['estructura-search'].value;

    if (!producto_id) {
      this.mostrarNotificacion('Por favor, ingrese un ID de producto', 'error');
      return;
    }

    const resultado = this.obtenerEstructura(estructura).buscar(producto_id);
    
    this.agregarResultadoBenchmark(`Buscar Inventario (${estructura.toUpperCase()})`, resultado.tiempoEjecucion);
    
    if (resultado.item) {
      this.mostrarNotificacion(`Producto encontrado: ${resultado.item.cantidad} unidades`, 'success');
    } else {
      this.mostrarNotificacion(`Producto no encontrado en inventario`, 'error');
    }
    
    // Limpiar campo
    this.elementos['producto-id-search'].value = '';
  }

  ejecutarBenchmarkMasivo() {
    const numOperaciones = parseInt(this.elementos['num-operaciones'].value) || 1000;
    
    console.log(`🚀 Ejecutando benchmark masivo con ${numOperaciones} operaciones`);
    
    const estructuras = ['array', 'hashmap', 'bst', 'linkedlist'];
    const tiempos = {};
    
    estructuras.forEach(estructura => {
      const startTime = performance.now();
      
      // Simular operaciones mixtas
      for (let i = 0; i < numOperaciones; i++) {
        const operacion = Math.random();
        const producto_id = Math.floor(Math.random() * 100) + 1;
        const cantidad = Math.floor(Math.random() * 10) + 1;
        
        if (operacion < 0.4) {
          // 40% búsquedas
          this.obtenerEstructura(estructura).buscar(producto_id);
        } else if (operacion < 0.7) {
          // 30% adiciones
          this.obtenerEstructura(estructura).agregar({
            producto_id,
            cantidad,
            ubicacion: 'Almacén Test',
            proveedor: 'Proveedor Test'
          });
        } else {
          // 30% remociones
          this.obtenerEstructura(estructura).quitar(producto_id, cantidad);
        }
      }
      
      const endTime = performance.now();
      tiempos[estructura] = endTime - startTime;
    });
    
    // Mostrar resultados
    Object.entries(tiempos).forEach(([estructura, tiempo]) => {
      this.agregarResultadoBenchmark(
        `Benchmark Masivo ${numOperaciones} ops (${estructura.toUpperCase()})`, 
        tiempo
      );
    });
    
    this.mostrarNotificacion(`Benchmark masivo completado`, 'success');
  }

  obtenerEstructura(tipo) {
    switch (tipo) {
      case 'array':
        return this.arrayInventario;
      case 'hashmap':
        return this.hashMapInventario;
      case 'bst':
        return this.bstInventario;
      case 'linkedlist':
        return this.linkedListInventario;
      default:
        return this.arrayInventario;
    }
  }

  agregarResultadoBenchmark(operacion, tiempo) {
    const resultado = {
      operacion,
      tiempo: tiempo.toFixed(3),
      timestamp: new Date().toLocaleTimeString()
    };
    
    this.benchmarkResults.unshift(resultado);
    
    // Mantener solo los últimos 50 resultados
    if (this.benchmarkResults.length > 50) {
      this.benchmarkResults = this.benchmarkResults.slice(0, 50);
    }
    
    this.actualizarResultadosBenchmark();
  }

  actualizarResultadosBenchmark() {
    if (!this.elementos['benchmark-results']) return;
    
    if (this.benchmarkResults.length === 0) {
      this.elementos['benchmark-results'].innerHTML = '<p class="text-gray-600">Los resultados de rendimiento aparecerán aquí...</p>';
      return;
    }
    
    const html = this.benchmarkResults.map(resultado => `
      <div class="bg-white p-3 rounded border-l-4 border-blue-500">
        <div class="flex justify-between items-center">
          <span class="font-medium">${resultado.operacion}</span>
          <span class="text-blue-600 font-mono">${resultado.tiempo} ms</span>
        </div>
        <div class="text-sm text-gray-500">${resultado.timestamp}</div>
      </div>
    `).join('');
    
    this.elementos['benchmark-results'].innerHTML = html;
  }

  limpiarResultados() {
    this.benchmarkResults = [];
    this.actualizarResultadosBenchmark();
    this.mostrarNotificacion('Resultados limpiados', 'success');
  }

  actualizarTablaInventario() {
    if (!this.elementos['inventario-table']) return;
    
    if (this.inventario.length === 0) {
      this.elementos['inventario-table'].innerHTML = `
        <tr>
          <td colspan="6" class="px-4 py-8 text-center text-gray-500">No hay items en el inventario</td>
        </tr>
      `;
      return;
    }
    
    const html = this.inventario.map(item => {
      const producto = this.productos.find(p => p.id === item.producto_id);
      const nombreProducto = producto ? producto.nombre : `Producto ${item.producto_id}`;
      
      return `
        <tr class="border-b hover:bg-gray-50">
          <td class="px-4 py-3 text-sm font-medium text-gray-900">${item.producto_id}</td>
          <td class="px-4 py-3 text-sm text-gray-900">${nombreProducto}</td>
          <td class="px-4 py-3 text-sm text-gray-900">${item.cantidad}</td>
          <td class="px-4 py-3 text-sm text-gray-900">${item.ubicacion || 'N/A'}</td>
          <td class="px-4 py-3 text-sm text-gray-900">${item.proveedor || 'N/A'}</td>
          <td class="px-4 py-3 text-sm text-gray-900">
            <button onclick="window.inventarioManager.eliminarItem(${item.producto_id})" 
                    class="text-red-600 hover:text-red-800">
              Eliminar
            </button>
          </td>
        </tr>
      `;
    }).join('');
    
    this.elementos['inventario-table'].innerHTML = html;
  }

  async eliminarItem(producto_id) {
    if (!confirm('¿Estás seguro de eliminar este item del inventario?')) {
      return;
    }
    
    try {
      const response = await fetch('/api/inventario', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ producto_id })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar item');
      }
      
      this.mostrarNotificacion('Item eliminado correctamente', 'success');
      await this.cargarInventario();
      
    } catch (error) {
      console.error('❌ Error al eliminar item:', error);
      this.mostrarNotificacion(`Error: ${error.message}`, 'error');
    }
  }

  mostrarNotificacion(mensaje, tipo = 'info') {
    console.log(`📢 Notificación ${tipo}:`, mensaje);
    
    const notificacion = document.createElement('div');
    notificacion.className = `mb-2 p-3 rounded-md shadow-md transition-opacity duration-500 ${
      tipo === 'error' ? 'bg-red-100 text-red-800 border-l-4 border-red-500' :
      tipo === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' :
      'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
    }`;
    
    notificacion.innerHTML = mensaje;
    
    const notificaciones = document.getElementById('notificaciones');
    if (notificaciones) {
      notificaciones.appendChild(notificacion);
      
      // Auto-eliminar después de 5 segundos
      setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
          if (notificaciones.contains(notificacion)) {
            notificaciones.removeChild(notificacion);
          }
        }, 500);
      }, 5000);
    }
  }
}

// Inicializar aplicación
function inicializarInventario() {
  if (!window.inventarioManager) {
    console.log('🌟 Inicializando InventarioManager...');
    window.inventarioManager = new InventarioManager();
  } else {
    console.log('⚠️ InventarioManager ya está inicializado');
  }
}

// Verificar si el DOM está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarInventario);
} else {
  inicializarInventario();
}