<template>
  <div :class="$style.qty">
    <button type="button" :class="$style.bttn" :disabled="qty <= 0" @click="clickMinus(qty)">
      <span>&ndash;</span>
    </button>
    <div :class="$style.field">{{qty}}</div>
    <button type="button" :class="$style.bttn" @click="clickPlus">
      <span>+</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { TCartProduct } from "~/store/cart"

export default Vue.extend({
  name: "ShopcartQty",
  props: {
    product_id: { type: Number, required: true },
    variant_id: { type: Number, required: false }
  },
  computed: {
    qty(): number {
      
      const product = this.$store.state.cart.products.find(
        ({productId, variantId}: TCartProduct) => productId === this.product_id && (variantId === this.variant_id)
      )
      return product ? product.qty : 0
    }
  },
  methods: {
    clickPlus() {
      this.$store.commit("cart/add", {
        productId: this.product_id,
        variantId: this.variant_id
      })
    },
    clickMinus(qty: number) {
      this.$store.commit("cart/set", {
        productId: this.product_id,
        variantId: this.variant_id,
        qty: qty-1
      })
    }
  }
})
</script>

<style lang="css" module>
  .qty {
    --qty-component-border: 1px solid rgb(var(--bs-gray));
    display: flex;
    flex-direction: row;
    width: 105px;
  }
  .bttn {
    --qty-bttn-bg: var(--bs-gray-light);
    border: var(--qty-component-border);
    border-radius: 50%;
    background: rgb(var(--qty-bttn-bg));
    color: rgb(var(--bs-gray-dark));
    cursor: pointer;
    font-size: 22px;
    display: flex;    
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
  }
  .bttn:hover {
    --qty-bttn-bg: var(--bs-gray);
  }

  .field {
    border: none;
    width: 44px;
    font-size: 16px;
    line-height: 1;
    padding: 5px;
    text-align: center;
    cursor: default;
  }
</style>