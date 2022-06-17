<template>
  <client-only>
    <NuxtLink to="/shopcart" :class="$style.button">
      <img src="/images/cart.png" />
      <span :class="$style.counter">{{productsQty}}</span>
    </NuxtLink>
  </client-only>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "CartButton",
  computed: {
    productsQty() {
      const qty = this.$store.state.cart.counter
      return qty > 99 ? "99+" : qty + ""
    }
  }
})
</script>
<style lang="css" module>
.button {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 28px;
  margin-right: .5em;
}
.button img {
  height: 100%;
}
.counter {
  position: absolute;
  top: 0;
  right: 0;
  margin: -.3em -.5em 0 0;
  background-color: rgb(var(--bs-danger));
  padding: 2px 5px;
  font-size: 12px;
  line-height: 1;
  color: rgb(var(--bs-white));
  border-radius: 8px;
}
</style>
