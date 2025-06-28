// src/data/preorders.ts
export interface PreOrderItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  releaseDate: string;
  sizes: string[]; // Nombre consistente para todas las tallas
  colors?: string[]; // Opcional
}

export const getUpcomingCollections = async () => {
  const upcomingItems: PreOrderItem[] = [
    {
      id: "pre-001",
      name: "Chaqueta Bomber Limited Edition",
      description: "Edición limitada con bordados exclusivos",
      price: 119.99,
      originalPrice: 149.99,
      image: "/images/preorders/bomber.jpg",
      releaseDate: "2023-12-15",
      sizes: ["S", "M", "L", "XL"], // Usando 'sizes' en lugar de 'availableSizes'
      colors: ["Negro", "Verde militar"]
    },
    {
      id: "pre-002",
      name: "Sneakers Urban Pro",
      description: "Zapatillas con tecnología de amortiguación avanzada y suela antideslizante",
      price: 89.99,
      originalPrice: 112.99,
      image: "/images/preorders/sneakers.jpg",
      releaseDate: "2024-01-10",
      sizes: ["38", "39", "40", "41", "42", "43"], // Cambiado a 'sizes'
      colors: ["Blanco", "Negro", "Gris"]
    },
    {
      id: "pre-003",
      name: "Colección Minimalist Watch",
      description: "Reloj de acero inoxidable con movimiento automático y resistencia al agua",
      price: 159.99,
      originalPrice: 199.99,
      image: "/images/preorders/watch.jpg",
      releaseDate: "2023-11-30",
      sizes: ["Ajustable"], // Cambiado a 'sizes'
      colors: ["Plateado", "Oro rosa", "Negro"]
    },
    {
      id: "pre-004",
      name: "Hoodie Signature Edition",
      description: "Sudadera premium con capucha y bolsillo canguro, algodón orgánico",
      price: 64.99,
      originalPrice: 81.99,
      image: "/images/preorders/hoodie.jpg",
      releaseDate: "2023-12-05",
      sizes: ["XS", "S", "M", "L", "XL"], // Cambiado a 'sizes'
      colors: ["Gris claro", "Beige", "Negro"]
    },
    {
      id: "pre-005",
      name: "Mochila Traveler X",
      description: "Mochila resistente con compartimento para laptop y sistema anti-robo",
      price: 79.99,
      originalPrice: 99.99,
      image: "/images/preorders/backpack.jpg",
      releaseDate: "2024-01-20",
      sizes: ["Única"], // Cambiado a 'sizes'
      colors: ["Negro", "Azul marino", "Verde olivo"]
    },
    {
      id: "pre-006",
      name: "Anillo Titanium Series",
      description: "Anillo de titanio puro con acabado satinado y diseño unisex",
      price: 49.99,
      originalPrice: 62.99,
      image: "/images/preorders/ring.jpg",
      releaseDate: "2023-12-22",
      sizes: ["6", "7", "8", "9", "10"], // Cambiado a 'sizes'
      colors: ["Titanio natural", "Titanio negro"]
    }
  ];

  return {
    upcomingItems,
    meta: {
      count: upcomingItems.length,
      discountPercentage: 20,
      nextRelease: upcomingItems.reduce((prev, current) => 
        new Date(prev.releaseDate) < new Date(current.releaseDate) ? prev : current
      )
    }
  };
};