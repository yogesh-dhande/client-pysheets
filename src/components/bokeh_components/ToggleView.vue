<template>
    <div>
        <b-form-checkbox switch
                         :id="model.id"
                         v-model="model.active"
                         size="lg"
        > {{model.label}}
        </b-form-checkbox>
    </div>
</template>

<script>
    export default {
        name: "ToggleView",
        props: ["model"],
        computed: {
            localIcon () {
                let modifier = this.model.icon? this.model.icon.icon_name: "refresh"
                console.log(modifier)
                return "fa fa-" + modifier
            }
        }
    }
</script>

<style scoped>

</style>