<template>
  <div :class="$style.option" :data-disabled="disabled" :data-active="active" @click="clickOption">
    <div v-if="attribute_code === 'color'" :style="{background: value.value}" :class="$style.color" />
    <div v-if="attribute_code === 'size'"  :class="$style.size" @click="clickOption(value.value_index)">
      {{value.label}}
    </div>
  </div>    
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { ConfigurableOptionValue, VariantAttribute } from ".."

export default Vue.extend({
  name: "ProductCardOptionValue",
  props: {
    active: Boolean,
    disabledValues: { type: Array as PropType<ConfigurableOptionValue[]>, required: true },
    value: {required: true, type: Object as PropType<ConfigurableOptionValue>},
    attribute_code: {required: true, type: String},
  },
  methods: {
    clickOption() {
      if (this.disabled) return;
      const attr: VariantAttribute = {
        code: this.attribute_code,
        value_index: this.value.value_index
      }
      this.$emit("click", attr)
    }
  },
  computed: {
    disabled: function(): boolean {
      const { value_index } = this.value
      return !!this.disabledValues.find(value => value.value_index === value_index)
    }
  }
})
</script>

<style lang="css" module>
.option {
  --product-card-optionvalue-border-color: var(--bs-black);
  width: 40px;
  height: 20px;
  text-align: center;
  position: relative;
  border: 3px solid rgb(var(--product-card-optionvalue-border-color));
  border-radius: var(--bs-border-radius-1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
[data-disabled].option {
  cursor: default;
}
[data-disabled].option::before, [data-disabled].option::after {
  content: "";
  position: absolute;
  top: 0;
  width: 38px;
  height: 0;
  border: 2px solid rgb(var(--bs-danger));
  background-color: transparent;
  z-index: 1;
}
[data-disabled].option::before {
  left: 0;
  transform: rotate(24deg) translate(-1px, 6px);
}
[data-disabled].option::after {
  right: 0;
  transform: rotate(-24deg) translate(1px, 6px);
}
[data-active].option:not([data-disabled]) {
  --product-card-optionvalue-border-color: var(--bs-primary)
}
.option .color {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: 0;
  border-radius: .3em;
}
.option .size {
  line-height: 1;
  font-size: 10px;
  width: 100%;
  text-align: center;
}
</style>