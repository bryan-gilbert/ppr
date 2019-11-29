<template lang="pug">
  div
    v-container(class="view-container")
      article(id="dashboardArticle")
        header
          h1 PPR Sample Dashboard

        div(class="page-content")
          div(class="page-content__main")
            section
              header
                h2 Sample content

          aside(class="page-content__aside")
            section
              header
                h2 Sample Aside Section
    v-container
      v-btn(class="form-primary-btn", @click="logOut", color="primary") Let me out!
</template>

<script lang="ts">
  import {createComponent} from "@vue/composition-api";
  import AuthHelper from '@/utils/auth-helper'

  export default createComponent({
    setup(): object {
      function logOut(): void {
        AuthHelper.authClear()
      }

      return { logOut }
    }
  })
</script>

<style lang="scss" scoped>
</style>
