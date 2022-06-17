<template src="./card.html"></template>
<style lang="css" src="./card.css" module></style>
<script lang="ts">
import type { PropType } from 'vue'
import type { Product } from ".."
import type { Brand } from "~/components/Brand"
import Vue from 'vue'
import formatPrice from "~/utils/formatPrice"

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
      return formatPrice(this.product.regular_price)
    }
  },
  methods: {
    clickBuy() {
      this.$store.commit("cart/add", this.product.id)
    }
  }
})
</script>
