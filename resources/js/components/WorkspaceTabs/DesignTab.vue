<template>
    <div class="h-full mt-8 mx-8 border shadow-lg p-8 mb-32 max-w-xl mx-auto">
        <design-navigation></design-navigation>
        <div :is="activeTabComponent"></div>
    </div>
</template>

<script>
    export default {
        computed: {
            activeTab() {
                return this.$store.state.navigation.design
            },

            activeTabComponent() {
                return this.activeTab.toLowerCase().replace(/\s/g,"-") + "-tab"
            },
        }            
    }
</script>