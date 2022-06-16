<template>
  <main :class="$style.grid">
    <BrandList />
    <ProductList />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>
<style lang="css" module>
.grid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
}
</style>
