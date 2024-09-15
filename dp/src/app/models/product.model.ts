export interface Product {
  id: number;
  name: string;
  category: string;
  size: string;
  brand: string;
  price: number;
  quantity: number;
  img: string;
  cart_quantity?: number;
}
