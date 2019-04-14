<template>
    <div class="flex h-12 mx-auto border">
        <div v-for="tab in availableTabs" :key="tab"
            :class="style(tab)"
            @click="activeTab = tab; $store.dispatch('navigate', {namespace: 'design', tab})"
        >
            {{ tab }}
        </div>     
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                availableTabs: ["Object model", "templates", "settings"],
                activeTab: "Object model",
            }
        },

        methods: {
            style(tab) {
                let class_ = "flex items-center justify-center cursor-pointer border text-sm p-2 " +
                (this.activeTab == tab ? "bg-grey-light" : "bg-grey-lighter hover:bg-white")
                return class_
            },
        }
    }
</script>
