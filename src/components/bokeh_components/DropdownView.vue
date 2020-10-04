<template>
    <b-dropdown type="submit"
                :id="model.id"
                :text="model.label"
                :variant="model.button_type"
                block
    >
        <b-dropdown-item-button
                v-for="(item, i) in model.menu"
                @click="view._item_click(i)"
                :key="item">
            {{item}}
        </b-dropdown-item-button>
    </b-dropdown>
</template>

<script>
    import {bokehModelViewMixin} from "../mixins/bokehModelViewMixin";

    export default {
        name: "DropdownView",
        mixins: [bokehModelViewMixin]
    }
</script>

<style scoped>

</style>