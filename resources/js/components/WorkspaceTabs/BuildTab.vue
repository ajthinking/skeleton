<template>
    <div class="h-full mt-8 mx-8 border shadow-lg p-8 mb-32 max-w-xl mx-auto">
        <button v-if="!isBuilding" @click="build()" class="border bg-white p-2 rounded">Build!</button>
        <div v-if="isBuilding">LOADING</div>
        <h3 v-if="message">{{message}}</h3>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isBuilding: false,
                message: false,
                nodes: [
                    {title: 'Item1', isLeaf: true},
                    {title: 'Item2', isLeaf: true, data: { visible: false }},
                    {title: 'Folder1'},
                    {
                    title: 'Folder2', isExpanded: true, children: [
                        {title: 'Item3', isLeaf: true},
                        {title: 'Item4', isLeaf: true}
                    ]
                    }
                ]
            }
        },

        methods: {
            build() {
                (async () => {
                    const rawResponse = await fetch('https://skeleton.test/skeleton/api/build', {
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            reviewFiles: this.$store.state.reviewFiles,
                            isSandboxed: true
                        })
                    });
                    const content = await rawResponse.json();

                    this.message = content.message
                })();
            }
        }
    }
</script>