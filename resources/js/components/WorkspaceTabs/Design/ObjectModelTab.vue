<template>
    <div>
        <resizable-textarea class="mt-4" ref="resizableTextarea">
            <textarea placeholder="Enter your object model here..." v-model="objectModel" class="w-full bg-grey-lighter rounded p-2"></textarea>
        </resizable-textarea>
        <div class="mt-1">
            <button @click="addUserSystem()" :class="buttonStyle">+ user system</button>
            <button :class="buttonStyle">- clear</button>
            <button :class="buttonStyle">+ sample app</button>
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
            objectModel: {
                get() {
                    return this.$store.state.design.objectModel            
                },

                set(value) {
                    this.$store.commit('setObjectModel', value)
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
                this.objectModel += "User\nemail\nname\npassword\n"

                // resizable textarea does not register the changes since it uses the 'input' event
                // resort to forceUpdate
                this.$refs.resizableTextarea.forceRerender()
            }
        }
    }
</script>