<template>
  <v-form @input="validForm($event)">
    <form-section-header label="Secured Parties" />
    <v-container>
      <p>value {{ value }} </p>
      <v-list
        v-for="(securedParty, index) in value"
        :key="index"
      >
        <ppr-list-item :editing="editing">
          <base-party
            :value="securedParty"
            :editing="editing"
            @input="updateSecuredParty($event, index)"
            @valid="validForm('securedParty', $event, index)"
          />
        </ppr-list-item>
      </v-list>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
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

    /*  Create a structure to hold the validation state of the elements of the list
    */
    const validationState = {
      header: false,
      registeringParty: false
    }

    // Callback function for emitting form validity on the header section back to the parent.
    function validForm(key: string, validElement: boolean) {
      validationState[key] = validElement
      const formValid = Object.values(validationState).reduce((accumulator, elementState) => {
        return accumulator && elementState
      }, true)
      emit('valid', formValid)
    }

    function updateSecuredParty(newSecuredParty: BasePartyModel, index: number): void {
      let sp = props.value
      console.log('sp as found', sp)
      sp[index] = newSecuredParty
      emit('input', sp)
    }

    return {
      updateSecuredParty,
      validForm,
    }
  }
})
</script>
