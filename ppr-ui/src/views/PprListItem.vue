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
                v-if="listLength >= 2"
                icon
                color="red"
                @click="remove(index)"
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
import { createComponent } from '@vue/composition-api'


export default createComponent({
  props: {
    editing: {
      default: false,
      required: false,
      type: Boolean
    },
    listLength: {
      required: true,
      type: Number
    },
    index: {
      required: true,
      type: Number
    }
  },

  setup(_, { emit }) {

    function remove(index: number): void {
      console.log('btn click')
      emit('remove', index)
    }

    return {
      remove
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
