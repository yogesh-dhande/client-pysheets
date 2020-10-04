<template>
    <b-button type="submit"
              :id="model.id"
              :variant="model.variant"
              v-b-tooltip.hover :title="model.tooltip"
              @click="click"
    >
        <i :class="localIcon" aria-hidden="true"></i>
        {{model.label}}
    </b-button>
</template>

<script>

    import {bokehModelViewMixin} from "../mixins/bokehModelViewMixin";
    import {bokehButtonMixin} from "../mixins/bokehButtonMixin"

    export default {
        name: "ButtonView",
        mixins: [bokehModelViewMixin, bokehButtonMixin],
        computed: {
            localIcon () {
                return "fa fa-" + this.model.icon.icon_name
            }
        },
    }
</script>

<style scoped>

</style>