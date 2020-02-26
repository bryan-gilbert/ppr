import Vue from 'vue'
import VueCompositionApi, { ref } from '@vue/composition-api'
import { mount, Wrapper } from '@vue/test-utils'
import Vuetify from 'vuetify'

import FinancingStatment from '@/financing-statement/FinancingStatement.vue'
import FinancingStatementModel from '@/financing-statement/financing-statement-model'
import { FinancingStatementTypes } from '@/financing-statement/financing-statement-types'

Vue.use(Vuetify)
Vue.use(VueCompositionApi)

const vuetify = new Vuetify()

describe('FinancingStatmentContainer.vue', (): void => {

  describe(':props', (): void => {
    it(':editing - false contains no inputs', (): void => {
      const properties = ref({ editing: false, value: new FinancingStatementModel() })
      const wrapper: Wrapper<Vue> = mount(FinancingStatment, { propsData: properties.value, vuetify })

      expect(wrapper.findAll('input').exists()).toBeFalsy()
    })

    it(':editing - true contains inputs', (): void => {
      const properties = ref({ editing: true, value: new FinancingStatementModel() })
      const wrapper: Wrapper<Vue> = mount(FinancingStatment, { propsData: properties.value, vuetify })

      expect(wrapper.findAll('input').exists()).toBeTruthy()
    })

    it(':editing - false contains default type', (): void => {
      const properties = ref({ editing: false, value: new FinancingStatementModel() })
      const wrapper: Wrapper<Vue> = mount(FinancingStatment, { propsData: properties.value, vuetify })

      expect(wrapper.text()).toContain(FinancingStatementTypes.SECURITY_AGREEMENT)
    })

    // Skip until can figure out how to inject value into a vuetify select
    it.skip('@input - type change should be emitted', async (): Promise<void> => {
      const properties = ref({ editing: true, value: new FinancingStatementModel() })
      const wrapper: Wrapper<Vue> = mount(FinancingStatment, { propsData: properties.value, vuetify })

      wrapper.get('input[name="typeInput"]').setValue('REPAIRERS_LIEN')
      await Vue.nextTick()

      expect(wrapper.text()).toContain(FinancingStatementTypes.REPAIRERS_LIEN)
      // const emitted = wrapper.emitted('input').slice(-1)[0][0]
      // expect(emitted.type).toBe(FinancingStatementTypes.REPAIRERS_LIEN)
    })


    it('@input - term change should be emitted', async (): Promise<void> => {
      const properties = ref({ editing: true, value: new FinancingStatementModel() })
      const wrapper: Wrapper<Vue> = mount(FinancingStatment, { propsData: properties.value, vuetify })

      wrapper.get('input[name="termInput"]').setValue('22')
      await Vue.nextTick()

      const emitted = wrapper.emitted('input').slice(-1)[0][0]
      expect(emitted.term).toBe('22')
    })


    it('@valid - invalid term should be false', async (): Promise<void> => {
      const properties = ref({ editing: true, value: new FinancingStatementModel() })
      const wrapper: Wrapper<Vue> = mount(FinancingStatment, { propsData: properties.value, vuetify })

      wrapper.get('input[name="termInput"]').setValue('26')
      await Vue.nextTick()

      expect(wrapper.emitted('valid').slice(-1)[0][0]).toBeFalsy()
    })
  })

})
