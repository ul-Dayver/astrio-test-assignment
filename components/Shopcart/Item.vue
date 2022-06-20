<style module src="./item.css"></style>
<template>
  <article v-if="product" :class="$style.item">
    <div :class="$style.image">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div :class="$style.details">
      <div :class="$style.title">{{product.title}}</div>
      <span>{{product.brand.title}}</span>
      <div v-if="product.variant" :class="$style.variant">
        <div v-for="option in product.variant" :key="option.code">
          <b>{{option.label}}:</b>
          <span>{{option.value.label}}</span>
        </div>
      </div>
      <div :class="$style.price">{{product.price}}</div>
    </div>
    <div>
      <div style="text-align: right;">
        <button type="button" :class="$style.trashBttn" @click="clickTrash(id)" title="Remove goods">
          <img src="/images/trash.png">
        </button>
      </div>
      
      <ShopcartQty :product_id="productId" :variant_id="variantId"/>
      <div :class="$style.total"><small>total:</small> <b>{{product.total}}</b></div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import type { Product } from "~/components/Product"
import type { Brand } from "~/components/Brand"
import formatPrice from "~/utils/formatPrice"

export default Vue.extend({
  name: 'ShopcartItem',
  props: {
    productId: { type: Number, required: true },
    qty: { type: Number, required: true },
    variantId: { type:Number, required: false }
  },
  computed: {
    product() {
      const { products, brands } = this.$store.state.showcase
      const product: Product = products.find((product: Product) => product.id === this.productId)
      if (!product) return null
      const brand = brands.find((brand: Brand) => brand.id === product.id)
      if (!brand) return null

      const { value, currency } = product.regular_price
      const total = value * this.qty
      let variant = null
      let image = product.image
      if (this.variantId && product.variants && product.configurable_options) {
        const _variant = product.variants.find(variant => variant.product.id === this.variantId)
        if (_variant) {
          image = _variant.product.image
          variant = product.configurable_options.map(option => {
            const attr = _variant.attributes.find(({code}) => code === option.attribute_code)
            if (attr) {
              const value = option.values.find(val => val.value_index === attr.value_index)
              return {
                code: option.attribute_code,
                label: option.label,
                value
              }
            }
            return null
          })
        }
        
      }

      return {
        ...product,
        image,
        variant,
        price: formatPrice(product.regular_price),
        qty: this.qty,
        brand,
        total: formatPrice({currency, value: total})
      }
    }
  },
  methods: {
    clickTrash(productId: number) {
      this.$store.commit("cart/remove", {
        productId,
        variantId: this.variantId || null
      })
    }
  }
})
</script>

