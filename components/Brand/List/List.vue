<template>
  <section :class="$style.menuBrands">
    <div :class="$style.sticky">
      <div :class="$style.menuItemBrand" @click="selectItem" :data-active="active">All brands</div>
      <BrandListItem v-for="brand in brands" :key="brand.id" :brand="brand" />
    </div>
  </section>
</template>

<style lang="css" src="./style.css" module></style>

<script lang="ts">
import Vue from 'vue'
import type { Brand } from ".."
export default Vue.extend({
  name: 'BrandList',
  computed: {
    active() {
      return !this.$store.state.showcase.brands.find(({active}:Brand) => active)
    },
    brands() {
      return this.$store.state.showcase.brands
    }
  },
  methods: {
    selectItem() {
      this.$store.commit("showcase/setActiveBrand", null)
    }
  }
})
</script>
