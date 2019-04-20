<template>
    <div class="h-full mt-8 mx-8 border shadow-lg p-8 mb-32 max-w-xl mx-auto">
        <button @click="build()" class="border bg-white p-2 rounded">Build!</button>
    </div>
</template>

<script>
    export default {
        //

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
                            reviewFiles: this.$store.state.reviewFiles
                        })
                    });
                    const content = await rawResponse.json();

                    console.log(content);
                })();
            }
        }
    }
</script>