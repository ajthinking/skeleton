<script>
export default {
    methods: {
        resizeTextarea (event) {
            event.target.style.height = 'auto'
            event.target.style.height = (event.target.scrollHeight) + 'px'
        },

        forceRerender() {
            console.log(this.$el.scrollHeight)
            this.$nextTick(() => {
                this.$el.style.height = 'auto'
                this.$el.style.height = (this.$el.scrollHeight) + 'px'
            })
        },
    },
    mounted () {
        this.$nextTick(() => {
            this.$el.setAttribute('style', 'height:' + (this.$el.scrollHeight) + 'px;overflow-y:hidden;')
        })

        this.$el.addEventListener('input', this.resizeTextarea)
    },
    beforeDestroy () {
        this.$el.removeEventListener('input', this.resizeTextarea)
    },
    render () {
        return this.$slots.default[0]
    },
}
</script>