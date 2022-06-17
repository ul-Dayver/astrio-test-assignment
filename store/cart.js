const LOCAL_STORAGE_KEY = "shopcart"
export const state = () => ({
  products: [],
  counter: 0
})

function done(state) {
  state.counter = state.products.reduce((acc, product) => acc + product.qty, 0)
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({...state}))
}

export const mutations = {
  add(state, {productId, variantId}) {
    const index = state.products.findIndex(({id, variant}) => id === productId && (variantId && variant === variantId || !variantId) )
    const product = {id: productId, qty: 1}
    if (variantId) product.variant = variantId
    if (index >= 0) {
      product.qty += state.products[index].qty
      state.products.splice(index, 1, product)
    } else {
      state.products.push(product)
    }
    done(state)
  },
  remove(state, {productId, variantId}) {
    const index = state.products.findIndex(({id, variant}) => id === productId && (variantId && variant === variantId || !variantId) )
    if (index >= 0) {
      state.products.splice(index, 1)
      done(state)
    }
  },
  init(state, { products, counter }) {
    state.products = products
    state.counter = counter
  },
  set(state, { productId, qty, variantId }){
    if (qty > 0) {
      const index = state.products.findIndex((product) => product.id === productId && (variantId && variantId === product.variant || !variantId) )
      if (index >= 0) {
        state.products.splice(index, 1, {id: productId, qty, variant: variantId})
        done(state)
      }
    }
  }
}

export const actions = {
  async load({ commit }) {
    commit("init", JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))
  }
}
