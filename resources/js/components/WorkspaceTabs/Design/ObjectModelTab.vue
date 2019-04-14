<template>
    <div>
        <textarea v-model="objectModel" class="w-full bg-grey-lighter rounded p-2 h-64">
        </textarea>
            <div class="mt-1">
                <button class="ml-2 text-xs border p-1 rounded shadow bg-white text-black px-2">+ user system</button>
                <button class="ml-2 text-xs border p-1 rounded shadow bg-white text-black px-2">- clear</button>
                <button class="ml-2 text-xs border p-1 rounded shadow bg-white text-black px-2">+ sample app</button>
                <button class="ml-2 text-xs border p-1 rounded shadow bg-white text-black px-2">syntax</button>
            </div>
    </div>
</template>

<script>
    export default {
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
        }
    }
</script>