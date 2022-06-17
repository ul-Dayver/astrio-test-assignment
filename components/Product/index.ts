interface RegularPrice {
  currency: string
  value: number
}

export type VariantAttribute = {
  code: string,
  value_index: number
}

type VariantProduct = {
  id: number,
  sku: string,
  image: string
}

export interface Variant {
  attributes: VariantAttribute[],
  product: VariantProduct
}

export type ConfigurableOptionValue = {
  label: string,
  value_index: number,
  value: string
}

export interface ConfigurableOption {
  attribute_id: number,
  attribute_code: string,
  label: string,
  values: ConfigurableOptionValue[]
}

type ProductType = "simple" | "configurable"

export interface Product {
  type: ProductType,
  id: number,
  title: string,
  regular_price: RegularPrice,
  image: string,
  brand: number,
  variants?: Variant[],
  configurable_options?: ConfigurableOption[]
}

export default {}
