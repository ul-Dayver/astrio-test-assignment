<template src="./card.html"></template>
<style lang="css" src="./card.css" module></style>
<script lang="ts">
import type { PropType } from 'vue'
import type { Product, Variant, VariantAttribute,ConfigurableOption } from ".."
import type { Brand } from "~/components/Brand"
import Vue from 'vue'
import formatPrice from "~/utils/formatPrice"

export default Vue.extend({
  name: 'ProductCard',
  props: {
    product: {type: Object as PropType<Product>, required: true},
  },
  data(): { variant?: Variant, attributes: VariantAttribute[], disabledAttributes: ConfigurableOption[]} {
    return {
      variant: undefined,
      attributes: [],
      disabledAttributes: []
    }
  },
  computed: {
    brandTitle: function(): string {
      const brand = this.$store.state.showcase.brands.find((brand: Brand) => brand.id === this.product.brand)
      return brand ? brand.title : ""
    },
    formatPrice: function() :string {
      return formatPrice(this.product.regular_price)
    },
    bttnBuyDisabled: function():boolean {
      return this.product.type === "configurable" && !this.variant
    }
  },
  methods: {
    clickBuy() {
      const variantId = this.variant ? this.variant.product.id : null
      this.$store.commit("cart/add", {
        productId: this.product.id,
        variantId
      })
    },
    clickAttribute(attr : VariantAttribute) {
      if (!this.product.variants || !this.product.configurable_options) return;

      const index = this.attributes.findIndex(({code}) => code === attr.code)
      if (index >= 0) {
        this.attributes[index] = attr
      } else {
        this.attributes.push(attr)
      }

      const variant = this.product.variants.find(variant => 
        variant.attributes.length === this.attributes.length &&
        variant.attributes.every(attr => 
          this.attributes.find(({code, value_index }) => 
            code === attr.code && value_index === attr.value_index)
        )
      )
      
      if (variant) {
        this.variant = variant
        this.disabledAttributes = this.disabledAttributes.map((option) => {
          const values = option.values.filter(value => {
            const attributes = this.attributes.map(({code, value_index}) => ({
              code, value_index: code === option.attribute_code ? value.value_index : value_index
            }))

            return !this.product.variants || !this.product.variants.find(variant => variant.attributes.every(attr => 
              attributes.find(({code, value_index }) => 
                code === attr.code && value_index === attr.value_index)
            ))
          })
          return {...option, values}  
        })
        return;
      } else {
        this.variant = undefined
      }

      let availableVariants = this.product.variants.filter(variant => 
        this.attributes.every(attr => 
          variant.attributes.find(({code, value_index }) => 
            code === attr.code && value_index === attr.value_index)
        )
      )

      this.attributes.forEach(({code, value_index}, index) => {
        if (code !== attr.code &&
            !availableVariants.find(variant => 
              variant.attributes.find(attr => 
                code === attr.code && value_index === attr.value_index))
        ) {
          this.attributes.splice(index, 1)
        }
      })

      availableVariants = this.product.variants.filter(variant => 
        this.attributes.every(attr => 
          variant.attributes.find(({code, value_index }) => 
            code === attr.code && value_index === attr.value_index)
        )
      )

      const missingOptions = this.product.configurable_options.filter((option) => !this.attributes.find(attr => attr.code === option.attribute_code))

      this.disabledAttributes = missingOptions.map(option => {
        const values = option.values.filter(({value_index}) => 
          !availableVariants.find(variant => variant.attributes.find(attr => attr.code === option.attribute_code && attr.value_index === value_index))
        )
        return {...option, values}
      })
    }
  }
})
</script>
