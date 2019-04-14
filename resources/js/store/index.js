import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
    state: {
        activeWorkspaceTab: "Design",
        design: {
            activeTab: "Object model",
            objectModel: "User"
        },
        review: {
            //
        },
        build: {
            //
        },                

      },
      mutations: {
        navigateWorkspace (state, tab) {
          state.activeWorkspaceTab = tab
        },

        navigateDesign (state, tab) {
            state.design.activeTab = tab
        },

        setObjectModel (state, content) {
            state.design.objectModel = content
        },        
      },
      actions: {
        navigateWorkspace (context, tab) {
          context.commit('navigateWorkspace', tab)
        },

        navigateDesign (context, tab) {
            context.commit('navigateDesign', tab)
        },
      }
})