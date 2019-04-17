import Vue from 'vue'
import Vuex from 'vuex'
import Parser from '../ObjectModelNotesParser'
import ObjectModelCollection from '../ObjectModelCollection'

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
    state: {
        workspace: {
            activeTab: "Design"
        },
        design: {
            activeTab: "Object model",
            objectModelNotes: ""
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

        setObjectModelNotes(state, content) {
            state.design.objectModelNotes = content
        },
    },
    actions: {
        navigate(context, payload) {
            context.commit('navigate', payload)
        },

        setObjectModelNotes(context, objectModelNotes) {
            context.commit('setObjectModelNotes', objectModelNotes)
            context.dispatch('compile', objectModelNotes)
        },
        
        compile(context, objectModelNotes) {
            console.log(
                ObjectModelCollection.fromSegments(
                    Parser.parse(objectModelNotes).segment()
                )
            )
        } 
    }
})