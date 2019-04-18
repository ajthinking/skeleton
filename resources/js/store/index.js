import Vue from 'vue'
import Vuex from 'vuex'
import Parser from '../ObjectModelNotesParser'
import ObjectModelCollection from '../ObjectModelCollection'
import Templates from '../Templates'
import LaravelFileFactory from '../LaravelFileFactory'
import UserPipe from '../UserPipe'

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
    state: {
        // Keep track of active tabs in each section
        navigation: {
            workspace: "Design",
            design: "Object model",
            review: "app/User.php",
        },
        availablePipes: LaravelFileFactory.pipes(),

        objectModelNotes: "",

        reviewFiles: []
    },
    mutations: {
        navigate(state, {namespace, tab}) {
            state.navigation[namespace] = tab
        },

        setObjectModelNotes(state, content) {
            state.objectModelNotes = content
        },

        setReviewFiles(state, files) {
            state.reviewFiles = files
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
            let files = LaravelFileFactory.from(
                ObjectModelCollection.fromSegments(
                    Parser.parse(objectModelNotes).segment()
                )                   
            ).withPipes(
                context.state.availablePipes
            ).calculateFiles()

            context.commit('setReviewFiles', files)
        
        } 
    }
})

// tinkering ...
/*

data.ENV_FILE_FACTORY ? data.ENV_FILE_FACTORY : LaravelFileFactory

*/