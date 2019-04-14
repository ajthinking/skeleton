<template>
    <div>
        <workspace-navigation></workspace-navigation>
        <div :is="activeTabComponent"></div>
    </div>
</template>

<script>
    export default {
        computed: {
            activeTab() {
                return this.$store.state.workspace.activeTab
            },

            activeTabComponent() {
                return this.activeTab.toLowerCase() + "-tab"
            },
        },
    }
</script>