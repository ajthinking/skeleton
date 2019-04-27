<script>
export default {
    props: {
        minHeight: {
            type: Number,
            default: 400
        }
    },

    methods: {
        resizeTextarea (event) {
            event.target.style.height = 'auto'
            event.target.style.height = this.acceptScrollHeight(event.target.scrollHeight) + 'px'
        },

        forceRerender() {
            this.$nextTick(() => {
                this.$el.style.height = 'auto'
                this.$el.style.height = (this.height()) + 'px'
            })
        },

        height() {
            return Math.max(this.$el.style.height, this.minHeight)
        },

        acceptScrollHeight(candidateHeight) {
            return Math.max(candidateHeight, this.minHeight)
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.$el.setAttribute('style', 'height:' + (this.height()) + 'px;overflow-y:hidden;')
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