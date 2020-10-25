<template>
    <b-container style="padding: 4px; margin: 16px">
        <b-row>
            <b-col cols="4">
                <component
                    class="bk-root"
                    :is="columnWidget.default_view.name"
                    :model="columnWidget"
                    :key="columnWidget.id"
                ></component>
            </b-col>
        </b-row>
    </b-container>
</template>


<script>
import * as bokeh from '@bokeh/bokehjs'
import components from './bokeh_components'
import UIRowView from './groups/UIRowView'
import UIColumnView from './groups/UIColumnView'
import CustomToolbarView from './groups/CustomToolbarView'

export default {
    name: 'test-components',
    components: {
        ...components,
        UIRowView: UIRowView,
        UIColumnView: UIColumnView,
        CustomToolbarView: CustomToolbarView,
    },
    data() {
        return {
            columnWidget: new bokeh.UIColumn({
                children: [
                    new bokeh.Widgets.TextInput({
                        title: 'test title',
                    }),
                    new bokeh.Widgets.Select({
                        options: ['Testing', 'Bokeh', 'Selector'],
                        title: 'selector',
                    }),
                    new bokeh.Widgets.MultiChoice({
                        options: ['Testing', 'Bokeh', 'Selector'],
                        title: 'multi-choice',
                    }),
                    new bokeh.Widgets.Button({
                        label: 'Home',
                        icon: new bokeh.Widgets.FontAwesomeIcon({
                            icon_name: 'home',
                        }),
                    }),
                    new bokeh.Widgets.Dropdown({
                        menu: ['Testing', 'Bokeh', 'Selector'],
                    }),
                    new bokeh.Widgets.Toggle({
                        label: 'Toggle',
                        active: false,
                    }),
                    new bokeh.Widgets.IconButton({
                        label: 'Home',
                        icon: new bokeh.Widgets.FontAwesomeIcon({
                            icon_name: 'home',
                        }),
                    }),
                    new bokeh.Widgets.ColorPicker({
                      title: 'color'
                    }),
                ],
            }),
        }
    },
}
</script>


<style scoped>
</style>