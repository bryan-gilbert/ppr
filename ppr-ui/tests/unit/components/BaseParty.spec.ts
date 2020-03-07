import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCompositionApi, { ref } from '@vue/composition-api'
import { mount, Wrapper } from '@vue/test-utils'

import BaseParty from '@/base-party/BaseParty.vue'
import { BasePartyModel } from '@/base-party/base-party-model'
import { BusinessModel } from '@/components/business-model'
import { PersonNameModel } from '@/components/person-name-model'


Vue.use(Vuetify)
Vue.use(VueCompositionApi)

function makeModel(business?: BusinessModel, person?: PersonNameModel): BasePartyModel {
  return new BasePartyModel( business, person)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function makeProps(editing: boolean, model: BasePartyModel) {
  return ref({ editing: editing, value: model })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getEmitted(wrapper: Wrapper<Vue>, selector: string) {
  return wrapper.emitted(selector).slice(-1)[0][0]
}

describe('BaseParty.vue', (): void => {
  describe('@events', (): void => {
    it(':editing - false contains no inputs', (): void => {
      const properties = makeProps(false, makeModel())
      const wrapper: Wrapper<Vue> = mount(BaseParty, { propsData: properties.value })

      expect(wrapper.findAll('input').exists()).toBeFalsy()
    })
    it(':editing - true contains no inputs', (): void => {
      const properties = makeProps(true, makeModel())
      const wrapper: Wrapper<Vue> = mount(BaseParty, { propsData: properties.value })

      expect(wrapper.findAll('input').exists()).toBeTruthy()
    })

    it('@input - first name change should be emitted', async (): Promise<void> => {
      const person = new PersonNameModel('John')
      const properties = makeProps(true, makeModel(undefined, person))
      const wrapper: Wrapper<Vue> = mount(BaseParty, { propsData: properties.value })
      await Vue.nextTick()
      expect(wrapper.text()).toContain('John')
    })

    it('@input - first name change should be emitted', async (): Promise<void> => {
      const person = new PersonNameModel('Firstname')
      const properties = makeProps(true, makeModel(undefined, person))
      const wrapper: Wrapper<Vue> = mount(BaseParty, { propsData: properties.value })

      wrapper.get('input[data-test-id="PersonName.first"]').setValue('Newfirstname')
      await Vue.nextTick()

      const emitted = getEmitted(wrapper, 'input')
      expect(emitted.personName.first).toBe('Newfirstname')
    })


    it('@valid - no names should be false', async (): Promise<void> => {
      const properties = makeProps(true, makeModel())
      const wrapper: Wrapper<Vue> = mount(BaseParty, { propsData: properties.value })

      wrapper.get('input[data-test-id="PersonName.first"]').trigger('input')
      await Vue.nextTick()

      expect(wrapper.emitted('valid').slice(-1)[0][0]).toBeFalsy()
    })


  })
})
