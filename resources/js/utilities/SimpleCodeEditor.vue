<template>
        <!--
            vue2-ace-editor (https://github.com/chairuosen/vue2-ace-editor)
            uses brace. There is a bug not allowing php highlighting.

            To temporary solve this (50+ issues and unanswered PR:s at brace...) two files are introduced:
            BraceWithBugFix.js (A copy of brace/index.js with this fix: https://github.com/thlorenz/brace/issues/55)
            VueAceEditor.js (Uses our BraceWithBugFix instead of normal brace)
        -->
        <vue-ace-editor 
            v-model="content"
            @init="editorInit"
            :lang="lang"
            theme="chrome"
            :options="options"
        ></vue-ace-editor>   
</template>

<script>
    export default {
        props: ['lang', 'storeKey'], 

        data() {
            return {
                options: {
                    minLines: 5,
                    maxLines: 1000,
                }
            }
        },

        methods: {
            editorInit() {
                require('brace/ext/language_tools') //language extension prerequsite...
                require('brace/mode/html')                
                require('brace/mode/json')    //language
                require('brace/mode/php')    //language
                require('brace/theme/chrome')
            }             
        },

        computed: {
            content: {
                set(value) {
                    this.$store.state[this.storeKey] = value
                },

                get() {
                    return this.$store.state[this.storeKey]
                }
            }
        }
    }

        // width="500"
        // height="400"

</script>

