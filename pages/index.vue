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
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
@media (min-width: 667px) {
  .grid {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
