import { Store } from "vuex/types"
export type TCartProduct = {productId: number, qty: number, variantId?: number}

export interface ICart {
  products: TCartProduct[],
  counter: number
}

const LOCAL_STORAGE_KEY = "shopcart"
export const state = ():ICart => ({
  products: [],
  counter: 0
})

function done(state: ICart) {
  state.counter = state.products.reduce((acc, product) => acc + product.qty, 0)
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({...state}))
}

function findIndexProduct(state: ICart, {productId, variantId}: Omit<TCartProduct, "qty">) {
  return state.products.findIndex((product) => product.productId === productId && (variantId && product.variantId === variantId || !variantId) )
}

export const mutations = {
  add(state: ICart, {productId, variantId}: Omit<TCartProduct, "qty">) {
    const index = findIndexProduct(state, {productId, variantId})
    const product: TCartProduct = {productId, qty: 1}
    if (variantId) product.variantId = variantId
    if (index >= 0) {
      product.qty += state.products[index].qty
      state.products.splice(index, 1, product)
    } else {
      state.products.push(product)
    }
    done(state)
  },
  remove(state: ICart, {productId, variantId}: Omit<TCartProduct, "qty">) {
    const index = findIndexProduct(state, {productId, variantId})
    console.log(index)
    if (index >= 0) {
      state.products.splice(index, 1)
      done(state)
    }
  },
  init(state: ICart, { products, counter }: ICart) {
    state.products = products
    state.counter = counter
  },
  set(state: ICart, { productId, qty, variantId }: TCartProduct){
    if (qty > 0) {
      const index = findIndexProduct(state, {productId, variantId})
      if (index >= 0) {
        state.products.splice(index, 1, {productId, qty, variantId})
        done(state)
      }
    }
  }
}

export const actions = {
  async load({ commit }: Store<any>) {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    storage && commit("init", JSON.parse(storage))
  }
}
