// src/data/products.js (o products.ts si usas TypeScript)
export const getProducts = async () => {
  return [
    {
      id: "prod-001",
      name: "Chaqueta de Cuero Sintético",
      price: 89.99,
      image: "/images/products/chaqueta.jpg",
      category: "Chaquetas",
      sizes: ["S", "M", "L", "XL"],
      stock: 15
    },
    {
      id: "prod-002",
      name: "Jeans Slim Fit",
      price: 59.99,
      image: "/images/products/jeans.jpg",
      category: "Jeans",
      sizes: ["XS", "S", "M", "L"],
      stock: 20
    },
    {
      id: "prod-003",
      name: "Camiseta Oversized",
      price: 29.99,
      image: "/images/products/camiseta.jpg",
      category: "Camisetas",
      sizes: ["S", "M", "L"],
      stock: 30
    },
    {
      id: "prod-004",
      name: "Zapatillas Urbanas",
      price: 79.99,
      image: "/images/products/zapatillas.jpg",
      category: "Calzado",
      sizes: ["38", "39", "40", "41", "42"],
      stock: 10
    },
    {
      id: "prod-005",
      name: "Gorra Ajustable",
      price: 24.99,
      image: "/images/products/gorra.jpg",
      category: "Accesorios",
      sizes: ["Única"],
      stock: 50
    },
    {
      id: "prod-006",
      name: "Sudadera con Capucha",
      price: 49.99,
      image: "/images/products/sudadera.jpg",
      category: "Sudaderas",
      sizes: ["S", "M", "L", "XL"],
      stock: 25
    },
    {
      id: "prod-007",
      name: "Reloj Deportivo",
      price: 99.99,
      image: "/images/products/reloj.jpg",
      category: "Accesorios",
      sizes: ["Ajustable"],
      stock: 12
    },
    {
      id: "prod-008",
      name: "Mochila Impermeable",
      price: 45.99,
      image: "/images/products/mochila.jpg",
      category: "Accesorios",
      sizes: ["Única"],
      stock: 18
    },
    {
      id: "prod-009",
      name: "Gafas de Sol",
      price: 34.99,
      image: "/images/products/gafas.jpg",
      category: "Accesorios",
      sizes: ["Única"],
      stock: 40
    },
    {
      id: "prod-010",
      name: "Cinturón de Piel",
      price: 19.99,
      image: "/images/products/cinturon.jpg",
      category: "Accesorios",
      sizes: ["S", "M", "L"],
      stock: 22
    }
  ];
};