import { Store } from "vuex/types"
export const actions = {
  async nuxtServerInit ({ dispatch  }: Store<any>) {
    await dispatch("showcase/load")
  }
}
