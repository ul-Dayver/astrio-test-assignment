import { Context } from "@nuxt/types"
export default function( ctx: Context ) {
  ctx.store.dispatch("cart/load");
}