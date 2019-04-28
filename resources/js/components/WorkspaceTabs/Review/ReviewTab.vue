<template>
    <div class="h-full mt-8 mx-auto">
        <workspace-tab-navigation 
            :availableTabs="availableTabs"
            :namespace="'review'"
        ></workspace-tab-navigation>
        <div :is="activeTabComponent"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                availableTabs: ['files']
            }
        },

        computed: {
            activeTab() {
                return this.$store.state.navigation.review
            },

            activeTabComponent() {
                return this.activeTab.toLowerCase().replace(/\s/g,"-") + "-tab"
            },
        }            
    }
</script>





<!--
<template>
    <div class="flex mx-auto text-sm">
        <div class="flex flex-col bg-grey-lighter text-xs border">
            <div v-for="file in $store.state.reviewFiles"
                :key="file.path"
                :class="style(file) + 'flex'"
                @click="tab = file.path; $store.dispatch('navigate', {namespace: 'review', tab})"
            >
                {{ file.path }}
            </div>
        </div>
        <div class="flex flex-1 bg-grey-lighter p-2">
            <pre v-highlightjs="activeFileContent"><code class="php"></code></pre>
        </div>
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
            }
        },

        methods: {
            isActiveFile(file) {
                return file.path == this.$store.state.navigation.review
            },

            style(file) {
                let class_ = "px-2 py-2 " +
                (this.isActiveFile(file) ? "bg-grey-light bg-grey-darker" : "bg-grey-lighter hover:bg-white")
                return class_
            },
        },                          
    }
</script>

-->