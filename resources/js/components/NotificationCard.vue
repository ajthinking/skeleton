<template>
    <div :class="style()">
        {{ message }}
    </div>
</template>

<script>
export default {
    props: ['type', 'message'],
    
    methods: {
        styles() {
            return {
                warning: "bg-yellow-dark text-white",
                info: "bg-blue-light text-white",
                success: "bg-green-light text-white",
            }
        },

        style() {
            let defaultStyle = "info"
            let commonStyle = "flex p-2 justify-center items-center text-center rounded text-sm font-semibold"
            return [
                commonStyle,
                this.styles()[this.type ? this.type : defaultStyle]
            ].join(" ")
        }
    }
}
</script>