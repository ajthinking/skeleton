<template>
    <div class="flex h-full mt-8 mx-8 border shadow-lg p-8 mb-32 max-w-xl mx-auto text-sm">
        <div class="flex flex-col bg-grey-light text-xs border">
            <div v-for="file in $store.state.review.files"
                :key="file.path"
                :class="style(file)"
                @click="tab = file.path; $store.dispatch('navigate', {namespace: 'review', tab})"
            >
                {{ file.path }}
            </div>
        </div>
        <div class="flex flex-1 bg-grey-lighter p-2">
            {{ activeFileContent }}
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
                return file.path == this.$store.state.review.activeTab
            },

            style(file) {
                let class_ = "px-2 py-1 " +
                (this.isActiveFile(file) ? "bg-grey-light" : "bg-grey-lighter hover:bg-white")
                return class_
            },
        }                    
    }
</script>