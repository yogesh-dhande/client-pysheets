<template>
    <multi-choice
            :id="model.id"
            :label="model.label"
            v-model="model.value"
            :options="model.options"
    ></multi-choice>
</template>

<script>
    import {bokehModelViewMixin} from "../mixins/bokehModelViewMixin";
    import MultiChoice from "../inputs/MultiChoice";

    export default {
        name: "MultiChoiceView",
        mixins: [bokehModelViewMixin],
        components: {
            "multi-choice": MultiChoice
        }
    }
</script>

<style scoped>

</style>