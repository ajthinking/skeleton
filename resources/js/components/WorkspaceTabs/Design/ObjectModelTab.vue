<template>
    <div>
        <resizable-textarea class="mt-4" ref="resizableTextarea">
            <textarea placeholder="Enter your object model here..." v-model="objectModelNotes" class="w-full bg-grey-lighter rounded p-2 text-sm"></textarea>
        </resizable-textarea>
        <div class="mt-1">
            <button @click="addUserSystem()" :class="buttonStyle">+ user system</button>
            <button :class="buttonStyle">+ sample app</button>
            <button :class="buttonStyle">+ random app</button>
            <button :class="buttonStyle">syntax</button>
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
            }            
        },

        methods: {
            addUserSystem() {
                this.objectModelNotes += "User\nname\nemail\npassword\nrememberToken\n\npassword_resets\nemail\ntoken\n"

                // resizable textarea does not register the changes since it uses the 'input' event
                // resort to forceUpdate
                this.$refs.resizableTextarea.forceRerender()
            }
        }
    }
</script>