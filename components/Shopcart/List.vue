<template>
  <section :class="$style.shopcart">
    <ShopcartItem v-for="product in products" :key="product.variant || product.id" :productId="product.productId" :qty="product.qty" :variantId="product.variantId" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
  name: 'ShopcartList',
  computed: {
    products() {
      return this.$store.state.cart.products
    }
  }
})
</script>

<style lang="css" module>
  .shopcart {
    width: 100%;
    margin-bottom: 2em;
  }
</style>