import type { NotificationType } from "../types/inventario"

export function mostrarNotificacion(mensaje: string, tipo: NotificationType = "info"): void {
  const contenedor = document.getElementById("notificaciones")
  if (!contenedor) return

  const notificacion = document.createElement("div")
  const colores = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }

  notificacion.className = `${colores[tipo]} text-white px-4 py-2 rounded shadow-lg transform transition-all duration-300`
  notificacion.textContent = mensaje

  contenedor.appendChild(notificacion)

  // Animación de entrada
  setTimeout(() => {
    notificacion.classList.add("translate-x-0")
  }, 100)

  // Remover después de 3 segundos
  setTimeout(() => {
    notificacion.classList.add("opacity-0", "translate-x-full")
    setTimeout(() => {
      if (notificacion.parentNode) {
        notificacion.parentNode.removeChild(notificacion)
      }
    }, 300)
  }, 3000)
}
