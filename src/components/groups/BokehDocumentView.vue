<template>
    <b-container>
        <b-row>
            <b-col cols="4">
                <component
                        class="bk-root"
                        :is="side.default_view.name"
                        :model="side"
                        :key="side.id"
                ></component>
            </b-col>
            <b-col>
                <component
                        class="bk-root"
                        :is="main.default_view.name"
                        :model="main"
                        :key="main.id"
                ></component>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import components from "../bokeh_components"
    import UIColumnView from "./UIColumnView";
    import UIRowView from "./UIRowView";
    import CustomToolbarView from "./CustomToolbarView";
    import {mapState} from "vuex";

    export default {
        name: "BokehDocumentView",
        components: {
            ...components,
            'UIColumnView': UIColumnView,
            'UIRowView': UIRowView,
            'CustomToolbarView': CustomToolbarView
        },
        computed: {
            ...mapState(['session']),
            side() {
                return this.session.document.get_model_by_name("side")
            },
            main() {
                return this.session.document.get_model_by_name("main")
            }
        },
    }
</script>

<style scoped>

</style>