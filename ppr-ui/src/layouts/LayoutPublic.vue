<template lang="pug">
  div
    sbc-header(ref="sbcHeader", :brandLink="originUrl", :authURL="authApiUrl")

    div(class="app-body")
        main
            slot Main content for a component will appear here. The component is selected by the router

    sbc-footer

</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import SbcHeader from 'sbc-common-components/src/components/SbcHeader.vue'
  import SbcFooter from 'sbc-common-components/src/components/SbcFooter.vue'

  @Component({
    name: 'LayoutPublic',
    components: {
      SbcHeader,
      SbcFooter,
    },
    inject: ['authApiUrl', 'originUrl']
  })
  export default class LayoutPublic extends Vue {}
</script>
