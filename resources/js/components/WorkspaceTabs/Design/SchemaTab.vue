<template>
    <div>
        <textarea-autosize
            class="w-full bg-grey-lighter rounded p-2 text-sm"
            placeholder="No data yet..."
            ref="someName"
            v-model="schema"
            :min-height="400"
            @blur.native="onBlurTextarea"
        ></textarea-autosize>        
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
                        this.$store.dispatch('setSchema', JSON.parse(value))
                    }
                }
            }
        }        
    }
</script>