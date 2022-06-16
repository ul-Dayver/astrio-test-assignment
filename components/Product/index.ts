interface RegularPrice {
  currency: string
  value: number
}
export interface Product {
  id: number,
  title: string,
  regular_price: RegularPrice,
  image: string,
  type: string,
  brand: number
}

export default {}
