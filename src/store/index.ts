import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { State } from './types';
import { generatedCalendar } from './generatedCalendar/index';

Vue.use(Vuex);

const store: StoreOptions<State> = {
  state: {
    // states for whole app (e.g. language)
  },
  modules: {
    generatedCalendar
  }
}

export default new Vuex.Store<State>(store);
