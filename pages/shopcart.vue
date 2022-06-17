<template>
  <main>
    <h1 :class="$style.title">Shopping Cart</h1>
    <div :class="$style.grid">
      <ShopcartList />
      <div :class="$style.amountConfirm">
        <div :class="$style.sticky">
          <h2>Amount</h2>
          <h3>{{total}}</h3>
          <button :class="$style.button">Checkout</button>
        </div>
      </div>
    </div>

  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import formatPrice from "~/utils/formatPrice"
import type { Product } from "~/components/Product"

export default Vue.extend({
  name: 'ShopcartPage',
  computed: {
    total(): string {
      const { products } = this.$store.state.showcase
      const { currency } = (products[0] as Product).regular_price
      const amount = this.$store.state.cart.products.reduce((acc: number, productCart: { id: number, qty: number }) => {
        const product = (products as Product[]).find(({id}) => productCart.id === id)
        if (!product) return acc
        return acc + product.regular_price.value * productCart.qty
      }, 0)
      
      return formatPrice({currency, value: amount})
    }
  },
  head () {
    return {
      title: "Shopping Cart"
    }
  },
})
</script>
<style lang="css" module>
.title {
  margin-bottom: 1em;
}
.grid {
  width: 100%;
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: center;
}
.amountConfirm {
  text-align: right;
  min-width: 23%;
  padding: .3em;
  line-height: 3;
}
@media (min-width: 640px) {
  .grid {
    flex-direction: row;
    align-items: stretch;
  }
  .sticky {
    position: sticky;
    top: 54px;
  }
}
.button {
  --order-confirm-bttn-bg: var(--bs-primary);
  width: 100%;
  margin-top: 2rem;
  font-size: 18px;
  line-height: 2;
  border: none;
  border-radius: var(--bs-border-radius-1);
  background-color: rgb(var(--order-confirm-bttn-bg));
  color: rgb(var(--bs-white));
}
.button:hover {
  --order-confirm-bttn-bg: var(--bs-primary-dark);
}
</style>
