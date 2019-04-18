<template>
    <div class="flex mx-auto text-sm">
        <div class="flex flex-col bg-grey-lighter text-xs border">
            <div v-for="file in $store.state.review.files"
                :key="file.path"
                :class="style(file) + 'flex'"
                @click="tab = file.path; $store.dispatch('navigate', {namespace: 'review', tab})"
            >
                {{ file.path }}
            </div>
        </div>
        <div class="flex flex-1 bg-grey-lighter p-2">
            <!--<resizable-textarea class="mt-4" ref="resizableTextarea">
                <textarea class="flex flex-1">{{ activeFileContent }}</textarea>
            </resizable-textarea>
            -->
            <pre v-highlightjs="activeFileContent"><code class="php"></code></pre>
        </div>
    </div>
</template>

<script>

    export default {
        computed: {
            activeFileContent() {
                let activeFile = this.$store.state.review.files.find(
                    file => this.isActiveFile(file)
                )

                return activeFile ? activeFile.content : ""
            }
        },

        methods: {
            isActiveFile(file) {
                return file.path == this.$store.state.navigation.review
            },

            style(file) {
                let class_ = "px-2 py-2 " +
                (this.isActiveFile(file) ? "bg-grey-light" : "bg-grey-lighter hover:bg-white")
                return class_
            },
        },                          
    }
</script>