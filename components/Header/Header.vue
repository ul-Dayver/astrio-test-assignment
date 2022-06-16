<template>
  <header :class="$style.header">
    <NuxtLink to="/"><img src="/images/logo.png" alr="Astrio Logo" /></NuxtLink>
    <CartButton />
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
import CartButton from './CartButton.vue'

export default Vue.extend({
  components: { CartButton },
  name: "Header"
})
</script>
<style lang="css" module>
.header {
  height: calc(54px + 3rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 2rem;
}
</style>
