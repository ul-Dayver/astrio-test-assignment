export const state = () => ({
  products: [],
  brands: []
})
export const mutations = {
  update(state, payload) {
    state.products = payload.products
    state.brands = payload.brands.map(brand => ({...brand, active: false}))
  },
  setActiveBrand(state, brandId) {
    state.brands = state.brands.map((brand) => ({...brand, active: brand.id === brandId}))
  }
}
export const actions = {
  async load({ commit }) {
    const data = process.server ? getData() : await fetchData()
    commit("update", data)
  }
}

const fetchData = () => new Promise(function(resolve, reject) {
  Promise.all([fetch("~/brands.json"), fetch("/products.json")])
  .then(data => Promise.all(data.map(res => res.json())))
  .then(jsonData => {
    resolve({brands: jsonData[0], products: jsonData[1]})
  })
  .catch((err) => {
    reject(err)
  })
})

const getData = () => {
  const brands = require("~/static/brands.json")
  const products = require("~/static/products.json")
  return { products, brands }
}
