<template>
    <ul class="list-reset flex justify-around border-b">
        <li :class="styleButtonContainer(tab)" v-for="tab in availableTabs" :key="tab">
            <div 
                :class="styleButton(tab)"
                @click="activeTab = tab; $store.dispatch('navigate', {namespace: 'workspace', tab})"
            >{{ tab }}</div>
        </li>
    </ul>
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
            styleButtonContainer(tab) {
                let activeStyle = "flex-1 -mb-px mr-1"
                let passiveStyle = "flex-1 mr-1"
                return this.activeTab == tab ? activeStyle : passiveStyle
            },

            styleButton(tab) {
                let common = "w-full text-center flex-1 bg-white inline-block font-semibold "
                let activeStyle = "border-l border-t border-r rounded-t py-2 px-4 text-blue-dark"
                let passiveStyle = "py-2 px-4 text-blue hover:text-blue-darker"                
            
                return this.activeTab == tab ? common + activeStyle : common + passiveStyle
            },
        }
    }
</script>
