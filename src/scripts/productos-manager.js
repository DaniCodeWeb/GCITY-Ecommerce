// src/scripts/productos-manager.js

// ======================================================
// ESTRUCTURAS DE DATOS PARA BENCHMARK
// ======================================================

// [Mantengo las mismas clases de estructuras de datos que antes...]
// (Para ahorrar espacio, las estructuras de datos son las mismas)

// 1. Lista Simple (Array)
class ListaSimple {
  constructor() {
    this.items = [];
  }

  agregar(item) {
    this.items.push(item);
  }

  buscarConFiltros(filtros) {
    const startTime = performance.now();
    let resultados = [...this.items];
    
    if (filtros.nombre) {
      resultados = resultados.filter(item => 
        item.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      );
    }
    
    if (filtros.categoria) {
      resultados = resultados.filter(item => 
        item.categoria === filtros.categoria
      );
    }
    
    if (filtros.marca) {
      resultados = resultados.filter(item => 
        item.marca === filtros.marca
      );
    }
    
    if (filtros.precioMin !== undefined && filtros.precioMax !== undefined) {
      resultados = resultados.filter(item => 
        item.precio >= filtros.precioMin && item.precio <= filtros.precioMax
      );
    }
    
    const endTime = performance.now();
    return {
      resultados,
      tiempoEjecucion: endTime - startTime
    };
  }

  obtenerTodos() {
    return this.items;
  }

  limpiar() {
    this.items = [];
  }
}

// 2. Tabla Hash (versión simplificada para debug)
class TablaHash {
  constructor() {
    this.items = new Map();
  }

  agregar(item) {
    this.items.set(item.id, item);
  }

  buscarConFiltros(filtros) {
    const startTime = performance.now();
    let resultados = Array.from(this.items.values());
    
    if (filtros.nombre) {
      resultados = resultados.filter(item => 
        item.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      );
    }
    
    if (filtros.categoria) {
      resultados = resultados.filter(item => 
        item.categoria === filtros.categoria
      );
    }
    
    if (filtros.marca) {
      resultados = resultados.filter(item => 
        item.marca === filtros.marca
      );
    }
    
    if (filtros.precioMin !== undefined && filtros.precioMax !== undefined) {
      resultados = resultados.filter(item => 
        item.precio >= filtros.precioMin && item.precio <= filtros.precioMax
      );
    }
    
    const endTime = performance.now();
    return {
      resultados,
      tiempoEjecucion: endTime - startTime
    };
  }

  obtenerTodos() {
    return Array.from(this.items.values());
  }

  limpiar() {
    this.items.clear();
  }
}

// 3. Árbol Binario (versión simplificada)
class ArbolBinario {
  constructor() {
    this.productos = [];
  }

  agregar(producto) {
    this.productos.push(producto);
  }

  buscarConFiltros(filtros) {
    const startTime = performance.now();
    let resultados = [...this.productos];
    
    if (filtros.nombre) {
      resultados = resultados.filter(producto => 
        producto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      );
    }
    
    if (filtros.categoria) {
      resultados = resultados.filter(producto => 
        producto.categoria === filtros.categoria
      );
    }
    
    if (filtros.marca) {
      resultados = resultados.filter(producto => 
        producto.marca === filtros.marca
      );
    }
    
    if (filtros.precioMin !== undefined && filtros.precioMax !== undefined) {
      resultados = resultados.filter(producto => 
        producto.precio >= filtros.precioMin && producto.precio <= filtros.precioMax
      );
    }
    
    const endTime = performance.now();
    return {
      resultados,
      tiempoEjecucion: endTime - startTime
    };
  }

  obtenerTodos() {
    return this.productos;
  }

  limpiar() {
    this.productos = [];
  }
}

// 4. Grafo (versión simplificada)
class Grafo {
  constructor() {
    this.nodos = new Map();
  }

  agregar(producto) {
    this.nodos.set(producto.id, producto);
  }

  buscarConFiltros(filtros) {
    const startTime = performance.now();
    let resultados = Array.from(this.nodos.values());
    
    if (filtros.nombre) {
      resultados = resultados.filter(producto => 
        producto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      );
    }
    
    if (filtros.categoria) {
      resultados = resultados.filter(producto => 
        producto.categoria === filtros.categoria
      );
    }
    
    if (filtros.marca) {
      resultados = resultados.filter(producto => 
        producto.marca === filtros.marca
      );
    }
    
    if (filtros.precioMin !== undefined && filtros.precioMax !== undefined) {
      resultados = resultados.filter(producto => 
        producto.precio >= filtros.precioMin && producto.precio <= filtros.precioMax
      );
    }
    
    const endTime = performance.now();
    return {
      resultados,
      tiempoEjecucion: endTime - startTime
    };
  }

  obtenerTodos() {
    return Array.from(this.nodos.values());
  }

  limpiar() {
    this.nodos.clear();
  }
}

// ======================================================
// GESTOR DE PRODUCTOS CON DEBUG
// ======================================================

class ProductosManager {
  constructor() {
    console.log('🚀 Inicializando ProductosManager...');
    
    // Estructuras de datos
    this.listaSimple = new ListaSimple();
    this.tablaHash = new TablaHash();
    this.arbolBinario = new ArbolBinario();
    this.grafo = new Grafo();
    
    // Estado de la aplicación
    this.productos = [];
    this.productoSeleccionado = null;
    this.modoEdicion = false;
    
    // Inicializar
    this.inicializar();
  }
  
  async inicializar() {
    console.log('🔧 Inicializando elementos DOM...');
    
    // Esperar un poco para asegurar que el DOM esté completamente cargado
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.obtenerElementosDOM();
    this.registrarEventListeners();
    await this.cargarProductos();
  }
  
  obtenerElementosDOM() {
    // Referencias a elementos DOM con verificación
    this.elementos = {};
    
    const elementosIds = [
      'loading', 'listaProductos', 'noResultados', 'contadorProductos',
      'modalProducto', 'formProducto', 'modalTitulo', 'buscarNombre',
      'filtroCategoria', 'filtroMarca', 'precioMin', 'precioMax',
      'buscarLista', 'buscarHash', 'buscarArbol', 'buscarGrafo',
      'limpiarFiltros', 'generarDatos', 'limpiarDatos', 'agregarProducto',
      'cancelarModal', 'benchmarkResultados', 'tiemposEjecucion', 'cargarProductosBtn'
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
    
    // Verificar y registrar cada event listener
    if (this.elementos.buscarLista) {
      this.elementos.buscarLista.addEventListener('click', () => {
        console.log('🔍 Búsqueda con Lista Simple');
        this.buscarConEstructura('lista');
      });
      console.log('✅ Event listener registrado: buscarLista');
    }
    
    if (this.elementos.buscarHash) {
      this.elementos.buscarHash.addEventListener('click', () => {
        console.log('🔍 Búsqueda con Tabla Hash');
        this.buscarConEstructura('hash');
      });
      console.log('✅ Event listener registrado: buscarHash');
    }
    
    if (this.elementos.buscarArbol) {
      this.elementos.buscarArbol.addEventListener('click', () => {
        console.log('🔍 Búsqueda con Árbol Binario');
        this.buscarConEstructura('arbol');
      });
      console.log('✅ Event listener registrado: buscarArbol');
    }
    
    if (this.elementos.buscarGrafo) {
      this.elementos.buscarGrafo.addEventListener('click', () => {
        console.log('🔍 Búsqueda con Grafo');
        this.buscarConEstructura('grafo');
      });
      console.log('✅ Event listener registrado: buscarGrafo');
    }
    
    if (this.elementos.limpiarFiltros) {
      this.elementos.limpiarFiltros.addEventListener('click', () => {
        console.log('🧹 Limpiando filtros');
        this.limpiarFiltros();
      });
      console.log('✅ Event listener registrado: limpiarFiltros');
    }
    
    if (this.elementos.generarDatos) {
      this.elementos.generarDatos.addEventListener('click', () => {
        console.log('🎲 Generando datos de prueba');
        this.generarDatosPrueba();
      });
      console.log('✅ Event listener registrado: generarDatos');
    } else {
      console.error('❌ No se pudo registrar event listener para generarDatos');
    }
    
    if (this.elementos.limpiarDatos) {
      this.elementos.limpiarDatos.addEventListener('click', () => {
        console.log('🗑️ Limpiando datos');
        this.limpiarDatos();
      });
      console.log('✅ Event listener registrado: limpiarDatos');
    }
    
    if (this.elementos.agregarProducto) {
      this.elementos.agregarProducto.addEventListener('click', () => {
        console.log('➕ Mostrando modal agregar producto');
        this.mostrarModalAgregar();
      });
      console.log('✅ Event listener registrado: agregarProducto');
    } else {
      console.error('❌ No se pudo registrar event listener para agregarProducto');
    }
    
    if (this.elementos.cancelarModal) {
      this.elementos.cancelarModal.addEventListener('click', () => {
        console.log('❌ Cancelando modal');
        this.ocultarModal();
      });
      console.log('✅ Event listener registrado: cancelarModal');
    }
    
    if (this.elementos.cargarProductosBtn) {
      this.elementos.cargarProductosBtn.addEventListener('click', () => {
        console.log('🔄 Recargando productos');
        this.cargarProductos();
      });
      console.log('✅ Event listener registrado: cargarProductosBtn');
    }
    
    if (this.elementos.formProducto) {
      this.elementos.formProducto.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('💾 Guardando producto');
        this.guardarProducto();
      });
      console.log('✅ Event listener registrado: formProducto');
    }
  }
  
  async cargarProductos() {
    try {
      console.log('📥 Cargando productos...');
      this.mostrarCargando();
      
      const response = await fetch('/api/productos');
      console.log('📡 Respuesta de API productos:', response.status);
      
      if (!response.ok) {
        throw new Error(`Error al cargar productos: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 Productos cargados:', data.length);
      this.productos = data;
      
      // Cargar productos en las estructuras de datos
      this.cargarEstructurasDatos();
      
      // Actualizar UI
      this.actualizarContadorProductos();
      this.renderizarProductos(this.productos);
      
      this.ocultarCargando();
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      this.mostrarNotificacion('Error al cargar productos', 'error');
      this.ocultarCargando();
      this.mostrarNoResultados();
    }
  }
  
  cargarEstructurasDatos() {
    console.log('🏗️ Cargando estructuras de datos...');
    
    // Limpiar estructuras
    this.listaSimple.limpiar();
    this.tablaHash.limpiar();
    this.arbolBinario.limpiar();
    this.grafo.limpiar();
    
    // Cargar productos en cada estructura
    this.productos.forEach(producto => {
      this.listaSimple.agregar(producto);
      this.tablaHash.agregar(producto);
      this.arbolBinario.agregar(producto);
      this.grafo.agregar(producto);
    });
    
    console.log(`✅ Estructuras cargadas con ${this.productos.length} productos`);
  }
  
  obtenerFiltros() {
    const filtros = {
      nombre: this.elementos.buscarNombre?.value?.trim() || '',
      categoria: this.elementos.filtroCategoria?.value || '',
      marca: this.elementos.filtroMarca?.value || '',
      precioMin: this.elementos.precioMin?.value ? parseFloat(this.elementos.precioMin.value) : undefined,
      precioMax: this.elementos.precioMax?.value ? parseFloat(this.elementos.precioMax.value) : undefined
    };
    
    console.log('🔍 Filtros obtenidos:', filtros);
    return filtros;
  }
  
  buscarConEstructura(tipo) {
    console.log(`🔍 Buscando con estructura: ${tipo}`);
    const filtros = this.obtenerFiltros();
    let resultado;
    
    switch (tipo) {
      case 'lista':
        resultado = this.listaSimple.buscarConFiltros(filtros);
        break;
      case 'hash':
        resultado = this.tablaHash.buscarConFiltros(filtros);
        break;
      case 'arbol':
        resultado = this.arbolBinario.buscarConFiltros(filtros);
        break;
      case 'grafo':
        resultado = this.grafo.buscarConFiltros(filtros);
        break;
      default:
        resultado = { resultados: [], tiempoEjecucion: 0 };
    }
    
    console.log(`📊 Resultados ${tipo}:`, resultado.resultados.length, 'productos en', resultado.tiempoEjecucion.toFixed(3), 'ms');
    this.mostrarResultadosBusqueda(resultado.resultados, tipo, resultado.tiempoEjecucion);
  }
  
  mostrarResultadosBusqueda(resultados, tipo, tiempo) {
    // Mostrar resultados
    this.renderizarProductos(resultados);
    
    // Mostrar tiempo de ejecución
    this.mostrarTiempoEjecucion(tipo, tiempo, resultados.length);
  }
  
  mostrarTiempoEjecucion(tipo, tiempo, cantidad) {
    if (!this.elementos.tiemposEjecucion || !this.elementos.benchmarkResultados) {
      console.error('❌ Elementos de benchmark no encontrados');
      return;
    }
    
    const tipoTexto = {
      'lista': 'Lista Simple',
      'hash': 'Tabla Hash',
      'arbol': 'Árbol Binario',
      'grafo': 'Grafo'
    };
    
    const nuevoResultado = document.createElement('div');
    nuevoResultado.innerHTML = `
      <span class="font-medium">${tipoTexto[tipo]}:</span> 
      <span class="text-blue-600">${tiempo.toFixed(3)} ms</span> 
      <span class="text-gray-500">(${cantidad} resultados)</span>
    `;
    
    this.elementos.tiemposEjecucion.innerHTML = '';
    this.elementos.tiemposEjecucion.appendChild(nuevoResultado);
    this.elementos.benchmarkResultados.classList.remove('hidden');
  }
  
  limpiarFiltros() {
    console.log('🧹 Limpiando filtros...');
    
    if (this.elementos.buscarNombre) this.elementos.buscarNombre.value = '';
    if (this.elementos.filtroCategoria) this.elementos.filtroCategoria.value = '';
    if (this.elementos.filtroMarca) this.elementos.filtroMarca.value = '';
    if (this.elementos.precioMin) this.elementos.precioMin.value = '';
    if (this.elementos.precioMax) this.elementos.precioMax.value = '';
    
    this.renderizarProductos(this.productos);
    if (this.elementos.benchmarkResultados) {
      this.elementos.benchmarkResultados.classList.add('hidden');
    }
  }
  
  async generarDatosPrueba() {
    try {
      console.log('🎲 Iniciando generación de datos de prueba...');
      this.mostrarCargando();
      
      // Verificar si la ruta existe
      console.log('📡 Haciendo petición a /api/datos-prueba');
      
      const response = await fetch('/api/datos-prueba', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cantidad: 500 })
      });
      
      console.log('📡 Respuesta de datos-prueba:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Error al generar datos: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Datos generados:', data);
      this.mostrarNotificacion(`${data.message}`, 'success');
      
      // Recargar productos
      await this.cargarProductos();
    } catch (error) {
      console.error('❌ Error al generar datos:', error);
      this.mostrarNotificacion(`Error al generar datos de prueba: ${error.message}`, 'error');
      this.ocultarCargando();
    }
  }
  
  async limpiarDatos() {
    try {
      console.log('🗑️ Iniciando limpieza de datos...');
      this.mostrarCargando();
      
      const response = await fetch('/api/datos-prueba', {
        method: 'DELETE'
      });
      
      console.log('📡 Respuesta de limpiar datos:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Error al limpiar datos: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Datos limpiados:', data);
      this.mostrarNotificacion(`${data.message}`, 'success');
      
      // Recargar productos
      await this.cargarProductos();
    } catch (error) {
      console.error('❌ Error al limpiar datos:', error);
      this.mostrarNotificacion(`Error al limpiar datos: ${error.message}`, 'error');
      this.ocultarCargando();
    }
  }
  
  mostrarModalAgregar() {
    console.log('➕ Mostrando modal agregar...');
    
    if (!this.elementos.modalProducto) {
      console.error('❌ Modal no encontrado');
      return;
    }
    
    this.modoEdicion = false;
    this.productoSeleccionado = null;
    
    if (this.elementos.modalTitulo) {
      this.elementos.modalTitulo.textContent = 'Agregar Producto';
    }
    
    if (this.elementos.formProducto) {
      this.elementos.formProducto.reset();
    }
    
    const productoActivo = document.getElementById('productoActivo');
    if (productoActivo) {
      productoActivo.checked = true;
    }
    
    this.mostrarModal();
  }
  
  mostrarModal() {
    console.log('📱 Mostrando modal...');
    if (this.elementos.modalProducto) {
      this.elementos.modalProducto.classList.remove('hidden');
      console.log('✅ Modal mostrado');
    } else {
      console.error('❌ No se pudo mostrar el modal');
    }
  }
  
  ocultarModal() {
    console.log('❌ Ocultando modal...');
    if (this.elementos.modalProducto) {
      this.elementos.modalProducto.classList.add('hidden');
      console.log('✅ Modal ocultado');
    }
  }
  
  async guardarProducto() {
    try {
      console.log('💾 Guardando producto...');
      
      const producto = {
        nombre: document.getElementById('productoNombre')?.value || '',
        descripcion: document.getElementById('productoDescripcion')?.value || '',
        precio: parseFloat(document.getElementById('productoPrecio')?.value || '0'),
        categoria: document.getElementById('productoCategoria')?.value || '',
        stock_minimo: document.getElementById('productoStockMinimo')?.value ? 
          parseInt(document.getElementById('productoStockMinimo').value) : undefined,
        imagen_url: document.getElementById('productoImagenUrl')?.value || '',
        activo: document.getElementById('productoActivo')?.checked !== false
      };
      
      console.log('📝 Datos del producto:', producto);
      
      let response;
      
      if (this.modoEdicion) {
        // Actualizar producto
        response = await fetch('/api/productos', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.productoSeleccionado.id,
            ...producto
          })
        });
      } else {
        // Crear producto
        response = await fetch('/api/productos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(producto)
        });
      }
      
      console.log('📡 Respuesta guardar producto:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Producto guardado:', data);
      
      this.mostrarNotificacion(
        this.modoEdicion ? 'Producto actualizado correctamente' : 'Producto creado correctamente', 
        'success'
      );
      
      this.ocultarModal();
      await this.cargarProductos();
    } catch (error) {
      console.error('❌ Error al guardar producto:', error);
      this.mostrarNotificacion(`Error: ${error.message}`, 'error');
    }
  }
  
  // Resto de métodos simplificados...
  renderizarProductos(productos) {
    if (!productos || productos.length === 0) {
      this.mostrarNoResultados();
      return;
    }
    
    if (!this.elementos.listaProductos) {
      console.error('❌ Elemento listaProductos no encontrado');
      return;
    }
    
    this.elementos.listaProductos.innerHTML = '';
    
    // Crear una lista simple para debug
    const lista = document.createElement('div');
    lista.className = 'space-y-4';
    
    productos.forEach(producto => {
      const item = document.createElement('div');
      item.className = 'bg-white p-4 rounded-lg shadow border';
      item.innerHTML = `
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-lg">${producto.nombre}</h3>
            <p class="text-gray-600">${producto.descripcion || 'Sin descripción'}</p>
            <p class="text-sm text-gray-500">Categoría: ${producto.categoria}</p>
            <p class="text-lg font-bold text-green-600">$${producto.precio.toFixed(2)}</p>
          </div>
          <div class="flex space-x-2">
            <button class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 editar-producto" data-id="${producto.id}">
              Editar
            </button>
            <button class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 eliminar-producto" data-id="${producto.id}">
              Eliminar
            </button>
          </div>
        </div>
      `;
      lista.appendChild(item);
    });
    
    this.elementos.listaProductos.appendChild(lista);
    this.elementos.listaProductos.classList.remove('hidden');
    
    if (this.elementos.noResultados) {
      this.elementos.noResultados.classList.add('hidden');
    }
    
    // Agregar event listeners a los botones
    document.querySelectorAll('.editar-producto').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const producto = productos.find(p => p.id === id);
        if (producto) {
          this.mostrarModalEditar(producto);
        }
      });
    });
    
    document.querySelectorAll('.eliminar-producto').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        this.eliminarProducto(id);
      });
    });
  }
  
  mostrarModalEditar(producto) {
    console.log('✏️ Mostrando modal editar:', producto);
    
    this.modoEdicion = true;
    this.productoSeleccionado = producto;
    
    if (this.elementos.modalTitulo) {
      this.elementos.modalTitulo.textContent = 'Editar Producto';
    }
    
    // Llenar formulario
    const campos = {
      'productoNombre': producto.nombre || '',
      'productoDescripcion': producto.descripcion || '',
      'productoPrecio': producto.precio || '',
      'productoCategoria': producto.categoria || '',
      'productoStockMinimo': producto.stock_minimo || '',
      'productoImagenUrl': producto.imagen_url || ''
    };
    
    Object.entries(campos).forEach(([id, valor]) => {
      const elemento = document.getElementById(id);
      if (elemento) {
        elemento.value = valor;
      }
    });
    
    const productoActivo = document.getElementById('productoActivo');
    if (productoActivo) {
      productoActivo.checked = producto.activo !== false;
    }
    
    this.mostrarModal();
  }
  
  async eliminarProducto(id) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }
    
    try {
      console.log('🗑️ Eliminando producto:', id);
      
      const response = await fetch('/api/productos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }
      
      this.mostrarNotificacion('Producto eliminado correctamente', 'success');
      await this.cargarProductos();
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error);
      this.mostrarNotificacion(`Error: ${error.message}`, 'error');
    }
  }
  
  mostrarNoResultados() {
    if (this.elementos.listaProductos) {
      this.elementos.listaProductos.classList.add('hidden');
    }
    if (this.elementos.noResultados) {
      this.elementos.noResultados.classList.remove('hidden');
    }
  }
  
  mostrarCargando() {
    if (this.elementos.loading) {
      this.elementos.loading.classList.remove('hidden');
    }
    if (this.elementos.listaProductos) {
      this.elementos.listaProductos.classList.add('hidden');
    }
    if (this.elementos.noResultados) {
      this.elementos.noResultados.classList.add('hidden');
    }
  }
  
  ocultarCargando() {
    if (this.elementos.loading) {
      this.elementos.loading.classList.add('hidden');
    }
  }
  
  actualizarContadorProductos() {
    if (this.elementos.contadorProductos) {
      this.elementos.contadorProductos.textContent = `${this.productos.length} productos encontrados`;
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

// Inicializar una sola vez
function inicializarApp() {
  if (!window.productosManager) {
    console.log('🌟 Inicializando ProductosManager...');
    window.productosManager = new ProductosManager();
  } else {
    console.log('⚠️ ProductosManager ya está inicializado');
  }
}

// Verificar si el DOM está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarApp);
} else {
  inicializarApp();
}