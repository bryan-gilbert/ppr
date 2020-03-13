<template>
  <v-list-item
    three-line
    class="ppr-list-item"
  >
    <v-list-item-content>
      <v-list-item-title v-if="editing">
        <v-container>
          <v-row no-gutters>
            <v-col md10>
              Enter the contact information for the <strong>Secured Party</strong>
            </v-col>
            <v-col
              md2
              class="item-title"
            >
              <v-btn
                icon
                color="red"
              >
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item-title>
      <v-list-item-subtitle v-if="editing">
        How should we identify this <strong>Secured Party</strong>?
      </v-list-item-subtitle>
      <v-container>
        <slot />
      </v-container>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import BaseParty from '@/base-party/BaseParty.vue'
import { BasePartyModel } from '@/base-party/base-party-model'


export default createComponent({
  components: { BaseParty },
  props: {
    editing: {
      default: false,
      required: false,
      type: Boolean
    }
  },

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
