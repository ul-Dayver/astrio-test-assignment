<template>
  <div :class="$style.container">
    <Header />
    <Nuxt />
  </div>
</template>
<style lang="css" module>
.container {
  margin: 0 auto;
  min-height: 75%;
}
@media (min-width: 1200px) {
  .container {
    max-width: 1180px;
    padding: 0px 10px;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    width: 972px;
    padding: 0px 10px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .container {
    min-width: 744px;
    width: calc(100% - 24px);
    padding: 0px 12px;
  }
}
@media (max-width: 767px) {
  .container {
    min-width: 312px;
    width: calc(100% - 8px);
    padding: 0px 4px;
  }
}
</style>
