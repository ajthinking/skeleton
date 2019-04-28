<template>
    <div class="flex mx-auto max-w-3xl px-8 bg-white pt-4">
        <div class="flex flex-1 mx-auto text-sm">
            <div class="flex flex-col bg-grey-lightest text-xs border">
                <div v-for="file in templates"
                    :key="file.name"
                    :class="listingStyleFor(file)"
                    @click="tab = file.name; $store.dispatch('navigate', {namespace: 'template', tab})"
                >
                    {{ file.name }}
                </div>
            </div>
            <div class="flex flex-1 bg-grey-lightest p-2">
                <!-- <pre v-highlightjs="activeFileContent"><code class="php"></code></pre> -->
                <textarea-autosize
                    class="w-full bg-grey-lightest rounded p-2 text-sm"
                    placeholder="No data yet..."
                    ref="someName"
                    v-model="activeFileContent"
                    :min-height="400"
                ></textarea-autosize>
            </div>
        </div>
    </div>  
</template>

<script>
    export default {
        computed: {
            templates() {
                return Object.keys(this.$store.state.templates).map(key => {
                    return {
                        name: key,
                        content: this.$store.state.templates[key]
                    }
                })
            },

            activeFileContent: {
                get() {
                    console.log(this.templates)
                    let activeFile = this.templates.find(
                        file => this.isActiveFile(file)
                    )

                    return activeFile ? activeFile.content : ""
                },

                set(content) {
                    if(!this.activeFile()) return;
                    this.$store.dispatch('setTemplate', {
                        name: this.activeFile().name,
                        content: content
                    })
                }
            }            
        },

        methods: {
            activeFile() {
                return this.templates.find(
                        file => this.isActiveFile(file)
                    )
            },

            isActiveFile(file) {
                return file.name == this.$store.state.navigation.template
            },

            listingStyleFor(file) {
                let common = 'px-2 py-2 flex hover:bg-white '
                let passive = 'bg-grey-lighter'
                let active = 'bg-grey-light'
                return this.isActiveFile(file) ? common + active : common + passive
            }
        }        

        
    }
</script>