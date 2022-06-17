<template>
  <section :class="$style.menuBrands">
    <div :class="$style.current" @click="toggleMenu" >{{current}}<div :class="$style.toggleIcon" :data-open="menuOpened"/></div>
    <div :class="$style.menu" :data-open="menuOpened">
      <div :class="$style.menuItemBrand" @click="selectItem" :data-active="active">All brands</div>
      <BrandListItem v-for="brand in brands" :key="brand.id" :brand="brand" @click="closeMenu" />
    </div>
  </section>
</template>

<style lang="css" src="./style.css" module></style>

<script lang="ts">
import Vue from 'vue'
import type { Brand } from ".."
export default Vue.extend({
  name: 'BrandList',
  data() {
    return {menuOpened: false}
  },
  computed: {
    current() {
      const brand: Brand | undefined = this.$store.state.showcase.brands.find(({active}:Brand) => active)
      return brand ? brand.title : "All brands"
    },
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
      this.menuOpened = false
    },
    toggleMenu() {
      this.menuOpened = !this.menuOpened
    },
    closeMenu() {
      this.menuOpened = false
    }
  }
})
</script>
