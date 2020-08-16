import {build_view} from "@bokeh/bokehjs/build/js/lib/core/build_views";

export const bokehModelViewMixin = {
    props: ['model'],
    data () {
        return {
            view: null
        }
    },
    mounted() {
        build_view(this.model).then(
            view => {
                this.view = view
            }
        )
    }
}