export interface Mushroom {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export const PRICE_PER_LB = 15 /* TODO: Make configurable per product if needed */

export const MUSHROOMS: Mushroom[] = [
  { id: 'blue-oyster', name: 'Blue Oyster', description: 'Velvety caps with a mild, savory flavor. Excellent sautéed or in soups.', price: PRICE_PER_LB, image: '/images/mushrooms/product-blue-oyster.jpg' },
  { id: 'pearl-oyster', name: 'Pearl Oyster', description: 'Delicate and tender with a subtle anise note. A kitchen staple.', price: PRICE_PER_LB, image: '/images/mushrooms/product-pearl-oyster.jpg' },
  { id: 'king-oyster', name: 'King Oyster', description: 'Thick, meaty stems with a firm texture. Perfect for grilling and searing.', price: PRICE_PER_LB, image: '/images/mushrooms/product-king-oyster.jpg' },
  { id: 'pink-oyster', name: 'Pink Oyster', description: 'Vibrant coral color with a light, woodsy flavor. Stunning in any dish.', price: PRICE_PER_LB, image: '/images/mushrooms/product-pink-oyster.jpg' },
  { id: 'golden-oyster', name: 'Golden Oyster', description: 'Bright golden clusters with a nutty, aromatic taste. Beautiful and flavorful.', price: PRICE_PER_LB, image: '/images/mushrooms/product-golden-oyster.jpg' },
  { id: 'lions-mane', name: "Lion's Mane", description: 'Cascading white tendrils with a lobster-like sweetness. A true delicacy.', price: PRICE_PER_LB, image: '/images/mushrooms/product-lions-mane.jpg' },
  { id: 'shiitake', name: 'Shiitake', description: 'Rich umami depth with a satisfying chew. The cornerstone of Asian cuisine.', price: PRICE_PER_LB, image: '/images/mushrooms/product-shiitake.jpg' },
  { id: 'maitake', name: 'Maitake', description: 'Layered fronds with an earthy, peppery complexity. Also called Hen of the Woods.', price: PRICE_PER_LB, image: '/images/mushrooms/product-maitake.jpg' },
  { id: 'chestnut', name: 'Chestnut', description: 'Nutty and crunchy with a rich brown cap. Holds its shape beautifully when cooked.', price: PRICE_PER_LB, image: '/images/mushrooms/product-chestnut.jpg' },
  { id: 'pioppino', name: 'Pioppino', description: 'Crunchy stems and small caps with a mild, slightly sweet flavor. Great in stir-fries.', price: PRICE_PER_LB, image: '/images/mushrooms/product-pioppino.jpg' },
]
