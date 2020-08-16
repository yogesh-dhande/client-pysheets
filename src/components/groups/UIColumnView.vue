<template>
    <div>
        <component v-for="child in model.children"
                   :is="child.default_view.name"
                   :model="child"
                   :key="child.id"
        ></component>
    </div>
</template>

<script>
    import components from "../bokeh"
    import UIRowView from "./UIRowView";
    import CustomToolbarView from "./CustomToolbarView";

    export default {
        name: "UIColumnView",
        components: {
            ...components,
            'UIRowView': UIRowView,
            'CustomToolbarView': CustomToolbarView
        },
        props: ["model"]
    }
</script>

<style scoped>

</style>