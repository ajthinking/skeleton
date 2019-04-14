<template>
    <div class="flex h-12 mx-auto border">
        <div v-for="tab in availableTabs" :key="tab"
            :class="style(tab)"
            @click="activeTab = tab; $store.dispatch('navigateWorkspace', tab)"
        >
            {{ tab }}
        </div>     
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                availableTabs: ["Design", "Review", "Build"],
                activeTab: "Design",
            }
        },

        methods: {
            style(tab) {
                let class_ = "flex items-center justify-center flex-1 cursor-pointer border text-sm " +
                (this.activeTab == tab ? "bg-grey-light" : "bg-grey-lighter hover:bg-white")
                return class_
            },
        }
    }
</script>
