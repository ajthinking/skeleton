<template>
    <div class="h-full mt-8 mx-auto">
        <design-navigation class="mb-4"></design-navigation>
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