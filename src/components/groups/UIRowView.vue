<template>
    <div>
        <b-badge variant="light" v-for="child in model.children" :key="child.id">
            <component
                    :is="child.default_view.name"
                    :model="child"
            ></component>
        </b-badge>
    </div>
</template>

<script>
    import components from "../bokeh_components"
    import UIColumnView from "./UIColumnView";
    import CustomToolbarView from "./CustomToolbarView";

    export default {
        name: "UIRowView",
        components: {
            ...components,
            'UIColumnView': UIColumnView,
            'CustomToolbarView': CustomToolbarView
        },
        props: ["model"]
    }
</script>

<style scoped>
.badge {
    background: transparent;
}
</style>