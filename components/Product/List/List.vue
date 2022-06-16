<template src="./list.html"></template>
<style lang="css" src="./list.css" module></style>
<script lang="ts">
import Vue from 'vue'
import type { Brand } from "~/components/Brand"
import type { Product } from "~/components/Product"

export default Vue.extend({
  name: 'ProductList',
  computed: {
    products() {
      const active: Brand | undefined = this.$store.state.showcase.brands.find(({active}: Brand) => active)
      const products: Product[] = this.$store.state.showcase.products
      return active ? products.filter(({brand}) => brand === active.id) : products
    }
  }
})
</script>
