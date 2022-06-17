<template>
  <div :class="$style.options">
    <ProductCardOptionValue 
      v-for="value in option.values"
      :key="value.value_index"
      :value="value"
      :attribute_code="option.attribute_code"
      :disabledValues="disabledValues"
      :active="active_index === value.value_index"
      @click="clickOption(value.value_index)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { ConfigurableOption, VariantAttribute, ConfigurableOptionValue } from ".."
export default Vue.extend({
  name: "ProductCardOption",
  data(): { active_index?: number } {
    return {
      active_index: undefined
    }
  },
  props: {
    disabledAttributes: { type: Array as PropType<ConfigurableOption[]>, required: true },
    option: {type: Object as PropType<ConfigurableOption> , required: true}
  },
  methods: {
    clickOption(value_index: number) {
      const attr: VariantAttribute = {
        code: this.option.attribute_code,
        value_index
      }
      this.active_index = value_index
      this.$emit("click", attr)
    }
  },
  computed: {
    disabledValues: function(): ConfigurableOptionValue[] {
      const option = this.disabledAttributes.find(({attribute_code}) => attribute_code === this.option.attribute_code)
      return option ? option.values : []
    }
  }
})
</script>

<style lang="css" module>
.options {
  display: flex;
  gap: 3px;
  flex-direction: row;
  margin-bottom: 3px;
}
</style>