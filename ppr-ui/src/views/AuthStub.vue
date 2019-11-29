<template lang="pug">
  div
    v-container
      article
        header
          h1 This is an authorization stub page
      div(class="intro") Try this button return do a fake login and go to dashboard.
      div
        v-btn(class="form-primary-btn", @click="letUserIn", color="primary") Let me in!
</template>

<script lang="ts">
  import {createComponent} from "@vue/composition-api";
  import {Data} from "@vue/composition-api/dist/ts-api/component";
  import AuthHelper from '@/utils/auth-helper'

  export default createComponent({
    setup(): Data {
      function letUserIn(): void {
        AuthHelper.authFake()
      }

      function logOut(): void {
        AuthHelper.authClear()
      }

      return { letUserIn, logOut}
    }
  })
</script>
