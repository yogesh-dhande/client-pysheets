<template>
    <b-button type="submit"
              :id="model.id"
              :variant="model.variant"
              v-b-tooltip.hover :title="model.label"
              :block="model.block"
              @click="click"
    >
        <i :class="localIcon" aria-hidden="true"></i>
    </b-button>
</template>

<script>
    import {bokehModelViewMixin} from "../mixins/bokehModelViewMixin";
    import {bokehButtonMixin} from "../mixins/bokehButtonMixin"

    export default {
        name: "IconButtonView",
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