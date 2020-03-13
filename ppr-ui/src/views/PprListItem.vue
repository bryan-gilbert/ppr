<template>
  <v-list-item
    three-line
    class="ppr-list-item"
  >
    <v-list-item-content>
      <v-list-item-title class="item-title">
        <v-btn
          icon
          color="red"
        >
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-list-item-title>
      <v-container>
        <base-party
          :value="securedParty"
          editing="true"
          @input="updateSecuredParty"
          @valid="validForm('securedParty', $event)"
        />
      </v-container>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { createComponent,ref } from '@vue/composition-api'
import BaseParty from '@/base-party/BaseParty.vue'
import { BasePartyModel } from '@/base-party/base-party-model'


export default createComponent({
  components: { BaseParty },
  setup() {

    const securedParty = ref(new BasePartyModel())

    function updateSecuredParty(newValue: BasePartyModel): void {
      console.log('bp', newValue)
    }
    return {
      securedParty,
      updateSecuredParty
    }
  }
})

</script>

<style lang="scss" scoped>
.v-list-item__content {
  padding-top: 0;
}
.container {
  padding-top: 0;
}
.ppr-list-item {
  border: 1px solid bisque;
}

.list-card {
  border: 1px solid bisque;
}

// Address Block Layout
.address-block {
  display: flex;
}

.address-block__info {
  flex: 1 1 auto;
}

.item-title {
  justify-content: flex-end;
  margin-left: auto;
  flex: 0 1 10%;
}

.push-right {
  margin-left: auto;
  align-self: flex-end;
}
</style>
