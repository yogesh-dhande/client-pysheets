<template>
    <!--	v- if accommodates a bug on python side 		v-if="tableData.length"-->
    <div
            class="jexcel-table"
    >
        Hello from {{id}}
    </div>
</template>

<script>
    import jexcel from 'jexcel-pro'
    export default {
        name: "jexcel-sheet",
        props: {
            id: {
                type: String
            },
            value: {
                type: String
            },
        },
        data() {
            return {
                table: null,
            }
        },
        mounted: function () {
            console.log("Mounting Jexcel")
            console.log(this.tableData.length)
            let options = {
                data: this.tableData,
                columns: this.tableColumns,
                ...this.tableOptions,
            }
            this.table = jexcel(this.$el, options);
        },
        computed: {
            tableData() {
                return JSON.parse(this.value).data
            },
            tableColumns() {
                return JSON.parse(this.value).schema.fields
            },
            tableOptions() {
                return {
                    // minDimensions: [10,20],
                    search: true,
                    pagination: 5,
                    paginationOptions: [5, 10, 25, 100],
                    // lazyLoading: true,
                    tableOverflow: true,
                    // tabs: true,
                    // allowCreateTabs: true,
                    toolbar: true,
                    columnSorting: true,
                    filters: true,
                    // columnDrag: true,
                    license: '39130-64ebc-bd98e-26bc4',
                }
            },
        }
    }
</script>

<style scoped>
    :root {
        --jexcel_header_color: #fafafa;
        --jexcel_header_color_highlighted: #444;
        --jexcel_header_background: #313131;
        --jexcel_header_background_highlighted: #777;
        --jexcel_content_color: #eeeeee;
        --jexcel_content_color_highlighted: #333;
        --jexcel_content_background: #3e3e3e;
        --jexcel_content_background_highlighted: #333;
        --jexcel_menu_background: #7e7e7e;
        --jexcel_menu_background_highlighted: #ebebeb;
        --jexcel_menu_color: #ddd;
        --jexcel_menu_color_highlighted: #222;
        --jexcel_menu_box_shadow: unset;
        --jexcel_border_color: #5f5f5f;
        --jexcel_border_color_highlighted: #999;
        --active_color: #eee;
    }
</style>
