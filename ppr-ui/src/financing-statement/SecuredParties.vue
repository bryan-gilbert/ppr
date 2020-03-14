<template>
  <v-form>
    <form-section-header label="Secured Parties" />
    <v-container>
      <p>value {{ value }} formIsValid {{ formIsValid }}</p>
      <v-list
        v-for="(securedParty, index) in value"
        :key="index"
      >
        <ppr-list-item :editing="editing">
          <base-party
            :value="securedParty"
            :editing="editing"
            @input="updateSecuredParty($event, index)"
            @valid="emitValidity($event, index)"
          />
        </ppr-list-item>
      </v-list>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import FormSectionHeader from '@/components/FormSectionHeader.vue'
import PprListItem from '@/views/PprListItem.vue'
import BaseParty from '@/base-party/BaseParty.vue'
import { BasePartyModel } from '@/base-party/base-party-model'

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

      // Search the array for any false values.
      // array find returns undefined if no element is false (e.g. all are true)
      const notValid = validationState.includes(false)
      console.log('validating secured parties ', validationState, notValid)
      formIsValid.value = !notValid
      emit('valid', !notValid)
    }

    function updateSecuredParty(newSecuredParty: BasePartyModel, index: number): void {
      let sp = props.value
      console.log('sp as found', sp)
      sp[index] = newSecuredParty
      emit('input', sp)
    }

    return {
      formIsValid,
      updateSecuredParty,
      emitValidity,
    }
  }
})
</script>
