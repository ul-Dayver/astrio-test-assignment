<style module src="./item.css"></style>
<template>
  <article v-if="product" :class="$style.item">
    <div :class="$style.image">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div :class="$style.details">
      <div :class="$style.title">{{product.title}}</div>
      <span>{{product.brand.title}}</span>
      <div :class="$style.price">{{product.price}}</div>
    </div>
    <div>
      <div style="text-align: right;">
        <button type="button" :class="$style.trashBttn" @click="clickTrash(id)" title="Remove goods">
          <img src="/images/trash.png">
        </button>
      </div>
      
      <ShopcartQty :product_id="product.id" />
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
    id: { type: Number, required: true },
    qty: { type: Number, required: true }
  },
  computed: {
    product() {
      const { products, brands } = this.$store.state.showcase
      const product: Product = products.find((product: Product) => product.id === this.id)
      if (!product) return null
      const brand = brands.find((brand: Brand) => brand.id === product.id)
      if (!brand) return null

      const { value, currency } = product.regular_price
      const total = value * this.qty

      return {
        ...product,
        price: formatPrice(product.regular_price),
        qty: this.qty,
        brand,
        total: formatPrice({currency, value: total})
      }
    }
  },
  methods: {
    clickTrash(id: number) {
      this.$store.commit("cart/remove", id)
    }
  }
})
</script>

