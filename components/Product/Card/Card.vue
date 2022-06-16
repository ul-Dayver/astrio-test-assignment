<template src="./card.html"></template>
<style lang="css" src="./card.css" module></style>
<script lang="ts">
import type { PropType } from 'vue'
import type { Product } from ".."
import type { Brand } from "~/components/Brand"
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductCard',
  props: {
    product: {type: Object as PropType<Product>, required: true},
  },
  computed: {
    brandTitle: function(): string {
      const brand = this.$store.state.showcase.brands.find((brand: Brand) => brand.id === this.product.brand)
      return brand ? brand.title : ""
    },
    formatPrice: function() :string {
      const { currency, value } = this.product.regular_price
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    }
  },
  methods: {
    clickBuy() {
      this.$store.commit("cart/add", this.product.id)
    }
  }
})
</script>
