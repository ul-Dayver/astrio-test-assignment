export const state = () => ({
  products: [],
  counter: 0
})

export const mutations = {
  add(state, productId) {
    const index = state.products.findIndex(({id}) => id === productId)
    const product = {id: productId, qty: 1}
    if (index >= 0) {
      product.qty += state.products[index].qty
      state.products.splice(index, 1, product)
    } else {
      state.products.push(product)
    }
    state.counter = state.products.reduce((acc, product) => acc + product.qty, 0)
  },
  remove(state, productId) {
    const index = state.products.findIndex(({id}) => id === productId)
    if (index >= 0) {
      const product = {...state.products[index]}
      if (--product.qty) {
        state.products.splice(index, 1, {...product})
      } else {
        state.products.splice(index, 1)
      }
      state.counter = state.products.reduce((acc, product) => acc + product.qty, 0)
    }
  }
}
