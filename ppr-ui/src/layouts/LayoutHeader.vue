
<template>
  <sbc-header
    redirect-on-login-success="encoded"
    redirect-on-logout="encode"
  />
</template>

<script lang="ts">
import { createComponent, inject } from '@vue/composition-api'
import SbcHeader from 'sbc-common-components/src/components/SbcHeader.vue'

export default createComponent({
  components: {
    SbcHeader
  },
  setup() {
    const oUrl = inject('originUrl') as string
    const encoded = encodeURIComponent(oUrl)
    console.debug('Send this encoded url to the common headers', encoded)
    return {
      encoded
    }
  }
})

</script>
