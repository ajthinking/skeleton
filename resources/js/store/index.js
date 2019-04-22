import Vue from 'vue'
import Vuex from 'vuex'
import Parser from '../ObjectModelNotesParser'
import ObjectModelCollection from '../ObjectModelCollection'
import Templates from '../Templates'
import LaravelFileFactory from '../LaravelFileFactory'
import ExpressFileFactory from '../ExpressFileFactory'
import UserPipe from '../pipes/UserPipe'

Vue.use(Vuex)
Vue.config.debug = true

fetch('/skeleton/api/templates').then(result => result.json()).then(data => {
    console.log(data)
})

// how set this via config?
let FileFactory = typeof ___ENV_FILE_FACTORY___ !== 'undefined' ? ___ENV_FILE_FACTORY___ : LaravelFileFactory

export default new Vuex.Store({
    state: {
        // Keep track of active tabs in each section
        navigation: {
            workspace: "Design",
            design: "Object model",
            review: "app/User.php",
        },
        availablePipes: FileFactory.pipes(),

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
            let files = FileFactory.from(
                ObjectModelCollection.fromEntities(
                    Parser.parse(objectModelNotes).segment()
                )                   
            ).withPipes(
                context.state.availablePipes
            ).calculateFiles()

            context.commit('setReviewFiles', files)
        
        } 
    }
})