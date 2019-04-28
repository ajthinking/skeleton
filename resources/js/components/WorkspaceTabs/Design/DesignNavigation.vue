<template>
    <ul class="list-reset flex border-b mb-8 px-24">
        <li :class="styleButtonContainer(tab)" v-for="tab in availableTabs" :key="tab">
            <div 
                :class="styleButton(tab)"
                @click="activeTab = tab; $store.dispatch('navigate', {namespace: 'design', tab})"
            >{{ tab }}</div>
        </li>
    </ul>
</template>

<script>
    export default {
        data: function() {
            return {
                availableTabs: [
                    "Object model", 
                    "settings",
                    "templates"
                ],
                activeTab: "Object model",
            }
        },

        methods: {
            styleButtonContainer(tab) {
                let activeStyle = "-mb-px mr-1"
                let passiveStyle = "mr-1"
                return this.activeTab == tab ? activeStyle : passiveStyle
            },

            styleButton(tab) {
                let activeStyle = "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold"
                let passiveStyle = "bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold"                
            
                return this.activeTab == tab ? activeStyle : passiveStyle
            },
        }
    }
</script>
