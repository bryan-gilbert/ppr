<template>
  <v-card outlined>
    <div>
      editing {{ editing }}
      <v-btn
        value="toggle"
        @click="editing = !editing"
      />
    </div>
    <v-form @input="validForm('header', $event)">
      <form-section-header label="Secured Parties" />
      <v-container>
        <v-list
          v-for="(securedParty, index) in value.securedParties"
          :key="index"
        >
          <ppr-list-item :editing="editing">
            <base-party
              :value="securedParty"
              :editing="editing"
              @input="updateSecuredParty($event, index)"
              @valid="validForm('securedParty', $event)"
            />
          </ppr-list-item>
        </v-list>
      </v-container>
      <form-section-header label="Type &amp; Duration" />
      <v-container>
        <div v-if="editing">
          <v-select
            :value="value.type"
            :items="fsTypes"
            label="Type"
            name="typeInput"
            @input="updateType"
          />
          <v-text-field
            :value="value.years"
            :rules="lifeRules"
            label="Life in Years"
            name="lifeInput"
            @input="updateLife"
          />
        </div>
        <div v-else>
          <div>
            Base Registration Number: {{ value.baseRegistrationNumber }}
          </div>
          <div>
            Expiry Date: {{ value.expiryDate }}
          </div>
          <div>
            Type: {{ value.type }}
          </div>
          <div>
            Life in Years: {{ value.years }}
          </div>
        </div>
      </v-container>
      <form-section-header label="Registering Party" />

      <v-container>
        <registering-party
          :value="value.registeringParty"
          :editing="editing"
          @input="updateRegisteringParty"
          @valid="validForm('registeringParty', $event)"
        />
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { FinancingStatementModel } from '@/financing-statement/financing-statement-model'
import { FinancingStatementType, FinancingStatementTypeCodeList } from '@/financing-statement/financing-statement-type'
import FormSectionHeader from '@/components/FormSectionHeader.vue'
import RegisteringParty from '@/components/RegisteringParty.vue'
import { PersonNameModel } from '@/components/person-name-model'
import PprListItem from '@/views/PprListItem.vue'
import BaseParty from '@/base-party/BaseParty.vue'
import { BasePartyModel } from '@/base-party/base-party-model'

export default createComponent({
  components: {
    BaseParty,
    FormSectionHeader,
    PprListItem,
    RegisteringParty
  },
  props: {
    editing: {
      default: false,
      required: false,
      type: Boolean
    },
    value: {
      required: true,
      type: FinancingStatementModel
    }
  },

  setup(props, { emit }) {
    const fsTypes = ref<string[]>(FinancingStatementTypeCodeList)
    const life = ref<number>(1)
    const lifeRules = [
      (value: string): (boolean | string) => {
        return !!value || 'Life is required'
      },
      (value: string): (boolean | string) => {
        return FinancingStatementModel.isValidYears(value) ? true : 'Life must be a number between 1 and 25'
      }
    ]

    /*  Create a structure to hold the validation state of the various sections of the form.
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

    function updateRegisteringParty(newPerson: PersonNameModel): void {
      emit('input', new FinancingStatementModel(
        props.value.type,
        props.value.years,
        newPerson // props.value.registeringParty
      ))
    }

    // Callback function for emitting model changes made to the FS life
    function updateLife(newLife: number): void {
      emit('input', new FinancingStatementModel(
        props.value.type,
        newLife, // props.value.life,
        props.value.registeringParty))
    }

    function updateSecuredParty(newSecuredParty: BasePartyModel, index: number): void {
      console.log('new sp', newSecuredParty.businessName, index)
      let sp = props.value.securedParties
      console.log('sp as found', sp)
      sp[index] = newSecuredParty
      emit('input', new FinancingStatementModel(
        props.value.type,
        props.value.years,
        props.value.registeringParty,
        sp
      ))
    }

    // Callback function for emitting model changes made to the FS type
    function updateType(newType: FinancingStatementType): void {
      emit('input', new FinancingStatementModel(
        newType, //props.value.type,
        props.value.years,
        props.value.registeringParty))
    }

    return {
      fsTypes,
      life,
      lifeRules,
      updateRegisteringParty,
      updateSecuredParty,
      updateLife,
      updateType,
      validForm,
    }
  }
})
</script>
