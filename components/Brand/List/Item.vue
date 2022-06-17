<template>
  <div :class="$style.menuItemBrand" :data-active="brand.active" @click="selectItem">{{brand.title}}</div>
</template>
<style lang="css" src="./style.css" module></style>
<script lang="ts">
import type { PropType } from 'vue'
import type { Brand } from ".."
import Vue from 'vue'

export default Vue.extend({
  name: 'BrandListItem',
  props: {
    brand: {type: Object as PropType<Brand>, required: true}
  },
  methods: {
    selectItem() {
      this.$store.commit("showcase/setActiveBrand", this.brand.id)
      this.$emit('click');
    }
  }
})
</script>
