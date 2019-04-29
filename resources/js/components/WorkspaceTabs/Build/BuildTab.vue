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
                availableTabs: ['finish']
            }
        },

        computed: {
            activeTab() {
                return this.$store.state.navigation.build
            },

            activeTabComponent() {
                return this.activeTab.toLowerCase().replace(/\s/g,"-") + "-tab"
            },
        }            
    }
</script>