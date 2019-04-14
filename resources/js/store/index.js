import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
    state: {
        workspace: {
            activeTab: "Design"
        },
        design: {
            activeTab: "Object model",
            objectModel: ""
        },
        review: {
            //
        },
        build: {
            //
        },

    },
    mutations: {
        navigate(state, {namespace, tab}) {
            state[namespace].activeTab = tab
        },

        setObjectModel(state, content) {
            state.design.objectModel = content
        },
    },
    actions: {
        navigate(context, payload) {
            context.commit('navigate', payload)
        }
    }
})