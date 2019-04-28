<template>
    <div class="flex max-w-2xl mx-auto px-8">
        <div class="flex-1 mr-2">           
            <textarea-autosize
                class="w-full bg-grey-lighter rounded p-2 text-sm"
                placeholder="Start typing here..."
                ref="someName"
                v-model="objectModelNotes"
                :min-height="400"
            ></textarea-autosize>
            <div class="mt-1">
                <button @click="addUserSystem()" :class="buttonStyle">+ user system</button>
                <button :class="buttonStyle">+ sample app</button>
                <button :class="buttonStyle">+ random app</button>
                <button :class="buttonStyle">syntax</button>
            </div>             

        </div>
        <div class="flex-1 ml-2">            
            <textarea-autosize
                class="w-full bg-grey-lighter rounded p-2 text-sm"
                placeholder="No data yet..."
                ref="someName"
                v-model="schema"
                :min-height="400"
            ></textarea-autosize>
            <div class="mt-1">
                <button :class="buttonStyle">+ some action</button>
            </div>                        
        </div>
    </div>  
</template>

<script>
    export default {
        data() {
            return {
                buttonStyle: "ml-2 text-xs border p-1 rounded shadow bg-white text-black px-2",
            }
        },

        computed: {
            objectModelNotes: {
                get() {
                    return this.$store.state.objectModelNotes            
                },

                set(value) {
                    this.$store.dispatch('setObjectModelNotes', value)
                }
            },

            message: {
                get () {
                    return this.$store.state.obj.message
                },
                set (value) {
                this.$store.commit('updateMessage', value)
                }
            },

            schema: {
                get() {
                    return JSON.stringify(this.$store.state.schema, null, 4)
                },

                set(value) {
                    if(JSON.parse(value)) {
                        this.$store.dispatch('setSchema', JSON.parse(value))
                    }
                }
            }
                                
        },

        methods: {
            addUserSystem() {
                this.objectModelNotes += "User\nname\nemail\nemail_verified_at\npassword\nremember_token\n\npassword_resets\nemail\ntoken\n\nCar\ncolor"

                // resizable textarea does not register the changes since it uses the 'input' event
                // resort to forceUpdate (BUGGED OUT ...)
                //this.$refs.resizableTextarea.forceRerender()
            }
        }
    }
</script>