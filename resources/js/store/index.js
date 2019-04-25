import Vue from 'vue'
import Vuex from 'vuex'
import Parser from '../ObjectModelNotesParser'
import ObjectModelCollection from '../ObjectModelCollection'
import LaravelFileFactory from '../fileFactories/Laravel/FileFactory'

Vue.use(Vuex)
Vue.config.debug = true

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

        reviewFiles: [],

        templates: {},
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
        
        setTemplates(state, templates) {
            state.templates = templates
        }
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
        
        },
        
        setTemplates(context) {
            fetch('/skeleton/api/templates').then(result => result.json()).then(templates => 
                context.commit('setTemplates', templates)
            )            
        }
    },
    getters: {
        templates: state => state.templates
    },    
})