<template>
    <b-container id="dashboard" style="padding: 4px; margin: 16px">
        <bokeh-document-view v-if="session"></bokeh-document-view>
    </b-container>
</template>

<script>
    import {mapState} from 'vuex'
    import BokehDocumentView from "./groups/BokehDocumentView";

    export default {
        components: {
            'bokeh-document-view': BokehDocumentView
        },
        computed: {
            ...mapState(['session']),
        },
    }
</script>
