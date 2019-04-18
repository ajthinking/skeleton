<template>
    <div class="p-2 text-sm">
        <p class="mb-4">Select which files you want to generate</p>
        <div v-for="pipe in $store.state.availablePipes"
            :key="pipe.make().name()"
        >
            <input type="checkbox" name="vehicle1" value="Bike" checked> {{pipe.make().name()}}<br>
        </div>
    </div>
</template>

<script>
    export default {
        
    }

// <!--:class="style(file) + 'flex'"-->
// @click="$store.dispatch('navigate', {namespace: 'build', pipe})"
</script>

