import Vue from 'vue'
import Vuex from 'vuex'
import Parser from '../ObjectModelNotesParser'
import ObjectModelCollection from '../ObjectModelCollection'
import Templates from '../Templates'

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
        availablePipes: [
            "Models",
            "Users",
            "Controllers",
            "Migrations",
            "APIControllers",
        ],

        objectModelNotes: "",

        review: {
            files: [
                {
                    path: "app/User.php",
                    content: Templates.User
                },
                {
                    path: "app/Https/Controllers/UserController.php",
                    content: Templates.Controller
                }
            ]
        }
    },
    mutations: {
        navigate(state, {namespace, tab}) {
            state.navigation[namespace] = tab
        },

        setObjectModelNotes(state, content) {
            state.objectModelNotes = content
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