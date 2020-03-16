<template>
  <v-form>
    <form-section-header label="Secured Parties" />
    <div> {{ value }} </div>
    <v-container>
      <v-list>
        <ppr-list-item
          v-for="(securedParty, index) in value"
          :key="index"
          :editing="editing"
          :index="index"
          :list-length="value.length"
          @remove="removeElement"
        >
          <template #header>
            Enter the contact information for this <strong>Secured Party</strong>
          </template>
          <base-party
            :value="securedParty"
            :editing="editing"
            prompt="How should we identify this Secured Party?"
            @input="updateSecuredParty($event, index)"
            @valid="emitValidity($event, index)"
          />
        </ppr-list-item>
      </v-list>
    </v-container>
    <v-container class="flex-center">
      <v-btn @click="addElement">
        <span>Add new secured party</span>
      </v-btn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { BasePartyModel } from '@/base-party/base-party-model'
import BaseParty from '@/base-party/BaseParty.vue'
import FormSectionHeader from '@/components/FormSectionHeader.vue'
import PprListItem from '@/components/PprListItem.vue'

export default createComponent({
  components: {
    BaseParty,
    FormSectionHeader,
    PprListItem
  },
  props: {
    editing: {
      default: false,
      required: false,
      type: Boolean
    },
    value: {
      required: true,
      type: Array // a list of parties
    }
  },

  setup(props, { emit }) {

    const formIsValid = ref<boolean>(false)

    // Create a structure to hold the validation state of the elements of the list
    const validationState: boolean[] = new Array(props.value.length).fill(false)

    // Callback function for emitting form validity on the header section back to the parent.
    function emitValidity(validElement: boolean, index: number) {
      // save the validity of the element
      validationState[index] = validElement
      // Search the array for any false values. NB find returns undefined all are true
      const notValid = validationState.includes(false)
      formIsValid.value = !notValid
      emit('valid', !notValid)
    }

    // when emitting the array of parties be sure to clone the array or else this component will
    // not see the change. The reactive system needs a new array and not just a change inside the array.

    function updateSecuredParty(newSecuredParty: BasePartyModel, index: number): void {
      let sp = [...props.value]
      sp[index] = newSecuredParty
      emit('input', sp)
    }

    function addElement() {
      let sp = [...props.value]
      sp.push(new BasePartyModel())
      emit('input', sp)
    }

    function removeElement(index: number) {
      let sp = [...props.value]
      sp.splice(index, 1)
      emit('input', sp)
    }

    return {
      addElement,
      emitValidity,
      formIsValid,
      removeElement,
      updateSecuredParty
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../assets/styles/theme.scss";

.flex-center {
  align-items: center;
}
</style>
