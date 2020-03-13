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
      <v-container
        align-center
        text-xs-center
        grid-list-xl
      >
        <v-layout
          justify-center
          align-center
          row
          wrap
        >
          <v-flex md4>
            <v-card
              flat
              class="list-card"
            >
              <v-card-text>Business name goes here.</v-card-text>
            </v-card>
          </v-flex>
          <v-flex md4>
            <v-card
              flat
              class="list-card"
            >
              <v-card-text>
                <div class="address-block">
                  <div class="address-block__info">
                    <div>streetAddress </div>
                    <div>streetAddressAdditional</div>
                    <div>Victoria </div>
                    <div> Canada</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex md2>
            <v-card
              flat
              class="list-card"
            >
              <v-card-text>
                <v-layout
                  column
                  fill-height
                >
                  <v-btn value="edit">
                    Edit
                  </v-btn>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  setup() {
    return {}
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
