import EtButton from './EtButton.vue'
import {UI_SIZING, UI_TYPES} from "../../enums";
import { mount } from 'cypress/vue'

describe(`<EtButton />`, () => {
  it('renders', () => {

    mount(EtButton, {
      props: {
        type: UI_TYPES.PRIMARY,
        size: UI_SIZING.M,
      },
      slots: {
        default: 'Click Me!'
      }
    });


  })
})