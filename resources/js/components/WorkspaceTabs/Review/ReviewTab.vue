<template>
    <div class="flex max-w-2xl mx-auto px-8 bg-white pt-4 mt-8 h-full justify-center">
        <div class="flex flex-col bg-grey-lighter text-xs border" v-if="hasFiles">
            <div v-for="file in $store.state.reviewFiles" 
                :key="file.path"
                :class="style(file) + 'flex'"
                @click="tab = file.path; $store.dispatch('navigate', {namespace: 'reviewFile', tab})"
            >
                {{ file.path }}
            </div>
        </div>
        <div class="flex flex-1 bg-grey-lighter p-2" v-if="hasFiles">
            <pre v-highlightjs="activeFileContent"><code class="php"></code></pre>
        </div>
        <notification-card v-else
            :type="'warning'"
            :message="'No files to create yet! Go back to the design tab to fix that'"
        ></notification-card>        
    </div>  
</template>

<script>
    export default {
        computed: {
            activeFileContent() {
                let activeFile = this.$store.state.reviewFiles.find(
                    file => this.isActiveFile(file)
                )

                return activeFile ? activeFile.content : ""
            },

            hasFiles() {
                return this.$store.state.reviewFiles.length > 0
            }


        },

        methods: {
            isActiveFile(file) {
                return file.path == this.$store.state.navigation.reviewFile
            },

            style(file) {
                let class_ = "px-2 py-2 " +
                (this.isActiveFile(file) ? "bg-grey-light bg-grey-darker" : "bg-grey-lighter hover:bg-white")
                return class_
            },
        }, 
    }
</script>