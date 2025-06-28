// src/types/index.ts
export interface PreOrderItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  releaseDate: string
  sizes: string[]
  colors?: string[]
  sku?: string
  availableFrom?: Date
  isLimitedEdition?: boolean
}