export const actions = {
  async nuxtServerInit ({ dispatch  }) {
    await dispatch("showcase/load")
  }
}
