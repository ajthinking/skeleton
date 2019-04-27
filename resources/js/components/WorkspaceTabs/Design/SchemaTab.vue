<template>
    <div>
        <resizable-textarea class="mt-4" ref="resizableTextarea">
            <textarea placeholder="No data yet..." v-model="schema" class="w-full bg-grey-lighter rounded p-2 text-sm"></textarea>
        </resizable-textarea>
    </div>
</template>

<script>
    export default {
        computed: {
            schema: {
                get() {
                    return JSON.stringify(this.$store.state.schema, null, 4)
                },

                set(value) {
                    if(JSON.parse(value)) {
                        this.$store.dispatch('setSchema', value)
                    }
                }
            }
        }        
    }
</script>