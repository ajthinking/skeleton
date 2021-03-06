import Vue from 'vue'
import Vuex from 'vuex'
import Parser from '../objectModel/ObjectModelNotesParser'
import ObjectModelCollection from '../objectModel/ObjectModelCollection'
import ObjectModelEntityFactory from '../objectModel/ObjectModelEntityFactory'
import Config from '../Config'
import Preference from '../utilities/Preference'
const mergeJSON = require('deepmerge')

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
    state: {
        // Keep track of active tabs in each section
        navigation: {
            workspace: "Design",
            design: "Object model",
            template: "",
            review: "",
        },

        availablePipes: Config.FileFactory.pipes(),

        objectModelNotes: "",

        reviewFiles: [],

        templates: {},

        schema: [],

        preferences: Config.FileFactory.defaultSchema()
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

        setReviewFile(state, file) {
            state.reviewFiles = state.reviewFiles.map(original => {
                return original.path == file.path ? file : original
            })
        },
        
        setTemplates(state, templates) {
            state.templates = templates
        },

        setTemplate(state, file) {
            state.templates[file.name] = file.content
        },        

        setPreferences(state, preferences) {
            state.preferences = preferences
        }
    },
    actions: {
        navigate(context, payload) {
            context.commit('navigate', payload)
        },

        setObjectModelNotes(context, objectModelNotes) {
            context.commit('setObjectModelNotes', objectModelNotes)
            context.dispatch('compileSchema', objectModelNotes)
        },

        setSchema(context, schema) {
            context.commit('setSchema', schema)
            context.dispatch('compileFiles', schema)
            context.dispatch('setPreferences', schema)
        },  
        
        setPreferences(context, schema) {
            context.commit('setPreferences',
                mergeJSON(
                    context.state.preferences,
                    schema
                )
            )            
        },          
        
        compileFiles(context, schema) {
            // Make deep copy of schema to detach any previous bindings
            schema = JSON.parse(JSON.stringify(schema))

            let files = Config.FileFactory.from(
                ObjectModelCollection.fromSchema(schema)                   
            ).withPipes(
                     context.state.availablePipes
            ).calculateFiles()

            context.commit('setReviewFiles', files)
        },
        
        compileSchema(context, objectModelNotes) {
            let schema = ObjectModelCollection.fromEntities(
                ObjectModelEntityFactory.fromSegments(
                    Parser.parse(objectModelNotes).segment()
                )
            ).serializeSchema()

            context.dispatch('setSchema', schema)
        },

        setTemplates(context) {
            fetch('/skeleton/api/templates').then(result => result.json()).then(templates => 
                context.commit('setTemplates', templates)
            )            
        },

        setTemplate(context, file) {
            context.commit('setTemplate', file)
            context.dispatch('compileFiles', context.state.schema)
        },

        setReviewFile(context, file) {
            context.commit('setReviewFile', file)
            // set flag for modification
        }        
    },
    getters: {
        templates: state => state.templates,
        preferences: state => state.preferences,
    },    
})