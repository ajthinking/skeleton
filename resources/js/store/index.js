import Vue from 'vue'
import Vuex from 'vuex'
import Parser from '../objectModel/ObjectModelNotesParser'
import ObjectModelCollection from '../objectModel/ObjectModelCollection'
import Config from '../Config'
import Preference from '../utilities/Preference'


Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
    state: {
        // Keep track of active tabs in each section
        navigation: {
            workspace: "Design",
            design: "Object model",
            review: "",
        },
        availablePipes: Config.FileFactory.pipes(),

        objectModelNotes: "",

        reviewFiles: [],

        templates: {},

        schema: {},
    },
    mutations: {
        navigate(state, {namespace, tab}) {
            state.navigation[namespace] = tab
        },

        setObjectModelNotes(state, content) {
            state.objectModelNotes = content
        },

        setSchema(state, content) {
            state.schema = content
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
            //context.dispatch('compile', objectModelNotes)
            context.dispatch('compileSchema', objectModelNotes)
        },

        setSchema(context, schema) {
            context.commit('setSchema', schema)
            Preference.persist(schema)
        },        
        
        compile(context, objectModelNotes) {
            let files = Config.FileFactory.from(
                ObjectModelCollection.fromEntities(
                    Parser.parse(objectModelNotes).segment()
                )                   
            ).withPipes(
                context.state.availablePipes
            ).calculateFiles()

            context.commit('setReviewFiles', files)

            
            // Set the highlighted file in the review list
            // This part need to be refactored...
            if(context.state.navigation.review == "" && context.state.reviewFiles.length){
                context.commit('navigate', {
                    namespace: "review",
                    tab: context.state.reviewFiles[0].path
                })
            }

        
        },
        
        compileSchema(context, objectModelNotes) {
            let schema = ObjectModelCollection.fromEntities(
                Parser.parse(objectModelNotes).segment()
            ).serializeSchema()
            
            context.dispatch('setSchema', schema)
        },

        setTemplates(context) {
            fetch('/skeleton/api/templates').then(result => result.json()).then(templates => 
                context.commit('setTemplates', templates)
            )            
        }
    },
    getters: {
        templates: state => state.templates,
    },    
})