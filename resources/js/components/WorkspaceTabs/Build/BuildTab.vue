<template>
    <div class="flex flex-col max-w-md mx-auto px-8 bg-white pt-4 mt-8 h-full">
        <div class="flex flex-col text-sm mb-4">
            <div><input type="checkbox" checked class="mr-2">Revert the latest build</div>
            <div><input type="checkbox" checked class="mr-2">Use Sandbox</div>
        </div>

        <button v-if="!isBuilding" @click="build()" class="bg-blue text-white border bg-white p-2 rounded">Build!</button>
        <div v-if="isBuilding">LOADING</div>
        
        <simple-code-editor
            lang="php"
            storeKey="finalSettings"
        ></simple-code-editor>
        
        <notification-card v-if="message"
            :type="'success'"
            :message="message"
        ></notification-card>       
    </div>  
</template>

<script>
    export default {
        data() {
            return {
                isBuilding: false,
                message: false,
                content: "yea",
                options: {
                    minLines: 5,
                    maxLines: 1000,
                }
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
                            isSandboxed: true,
                            reverseHistory: true
                        })
                    });
                    const content = await rawResponse.json();

                    this.message = content.message
                })();
            },

            editorInit() {
                require('brace/ext/language_tools') //language extension prerequsite...
                require('brace/mode/html')                
                require('brace/mode/javascript')    //language
                require('brace/mode/less')
                require('brace/theme/chrome')
                require('brace/snippets/javascript') //snippet
            }            
        }
    }
</script>