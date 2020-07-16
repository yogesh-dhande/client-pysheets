<template>
    <div :id="id">
    </div>
</template>

<script>
    import postscribe from 'postscribe'

    export default {
        name: 'bokeh',
        props: {
            id: {
                type: String
            },
            script: {
                type: String
            }
        },
        mounted() {
            console.log("mounted bokeh")
            postscribe('#' + this.id, this.script)
        }
    }
</script>

