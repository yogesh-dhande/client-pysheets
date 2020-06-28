<template>
    <div>
        <b-dropdown
                :id="id"
                :text="label"
                block
                lazy
        >
            <b-dropdown-form @submit.stop.prevent>
                <ui-group :children="children"></ui-group>
            </b-dropdown-form>
        </b-dropdown>
    </div>
</template>

<script>
    import UIGroup from "../groups/UIGroup";

    export default {
        name: "ui-column-collapsible",
        components: {
            'ui-group': UIGroup
        },
        props: {
            id: {
                type: String
            },
            label: {
                type: String
            },
            children: {
                type: Array
            }
        },
    }
</script>

<style scoped>

</style>
