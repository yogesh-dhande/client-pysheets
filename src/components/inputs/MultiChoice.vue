<template>
    <div>
        <div :id="id" class="multiselect">
            <label for="id">{{label}}</label>
            <div id="id" class="selected-hold" :class="{ focus: hasFocus }"
                 @click.self="$refs.search.focus()"
                 @keydown.left="traverseSelected('left')"
                 @keydown.right="traverseSelected('right')"
                 @keyup.delete="traverseSelectedDelete">
                <div class="selected-item"
                     :class="{ active: activeHorizontal === index }"
                     v-for="(itm, index) in selectedList"
                     :key="index">
                    <span class="item-label">{{ itm }}</span>
                    <button type="button" class="close" @click="removeSelected(index)" tabindex="-1">
                        <span>&times;</span>
                    </button>
                </div>
                <input type="text" class="item-search" ref="search"
                       :style="{ width: searchTermWidth }"
                       v-model.trim="searchTerm"
                       @keydown.down="traverseList('next')"
                       @keydown.up="traverseList('prev')"
                       @keydown.delete="backspaceDelete"
                       @keyup.enter="addActive"
                       @keyup="lastTerm = searchTerm"
                       @focus="showSuggestPanel = true; hasFocus = true; activeHorizontal = -1"
                       @blur="showSuggestPanel = false; hasFocus = false">
                <div ref="tester" class="text-tester">{{ searchTerm }}</div>
                <div class="suggest-panel" v-show="showSuggestPanel" ref="panel">
                    <div class="suggest-item"
                         :class="{ active: activeVertical === index, disabled: selectedList.includes(row.value || row) }"
                         v-for="(row, index) in filteredSuggest"
                         :key="index"
                         @mousedown.prevent="addSelected(row.value || row)"
                         @mouseover="activeVertical = index" v-html="hightlightWord(row)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "multi-choice",
        props: {
            id: {
                type: String
            },
            label: {
                type: String
            },
            value: {
                type: Array
            },
            options: {
                type: Array
            },
        },
        data() {
            return {
                selectedList: this.value,
                searchTerm: '',
                searchTermWidth: '',
                lastTerm: '',
                activeVertical: 0,
                activeHorizontal: -1,
                showSuggestPanel: false,
                hasFocus: false
            }
        },
        computed: {
            sanitizedTerm() {
                return this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            },
            filteredSuggest() {
                if (!this.searchTerm) return this.suggestedList

                const ex = RegExp(this.sanitizedTerm, 'i')
                const filtered = this.suggestedList.filter(ele => ex.test(ele))
                const label = `<strong><sup>+</sup> ${this.searchTerm}</strong>`
                return filtered.length ? filtered : [{label, value: this.searchTerm}]
            },
            suggestedList() {
                return this.options
            }
        },
        watch: {
            filteredSuggest(newList) {
                console.log(newList)
                this.activeVertical = 0
            },
            searchTerm(newTerm) {
                console.log(newTerm)
                this.$nextTick().then(() => this.calcTextWidth())
            },
            selectedList(newList) {
                this.value = newList
                this.$emit('input', newList)
                this.updateValue(this.$props)
            }
        },
        methods: {
            ...mapActions(["updateValue"]),
            addSelected(val) {
                if (this.selectedList.includes(val)) return

                this.selectedList.push(val)
                this.searchTerm = ''
                this.activeHorizontal = -1
            },
            addActive() {
                const value = this.filteredSuggest[this.activeVertical]
                if (value && this.showSuggestPanel) this.addSelected(value || value)
            },
            removeSelected(index) {
                this.selectedList.splice(index, 1)
            },
            traverseList(direction) {
                if (direction === 'next' && !this.showSuggestPanel) {
                    this.activeVertical = -1
                }

                const lastIndex = this.filteredSuggest.length - 1
                let newIndex = direction === 'next' ?
                    this.activeVertical + 1 :
                    this.activeVertical - 1

                if (newIndex <= lastIndex && newIndex >= 0) {
                    this.activeVertical = newIndex
                }

                this.scrollToView()
            },
            traverseSelected(direction) {
                const lastIndex = this.selectedList.length - 1

                if (this.activeHorizontal === -1) {
                    this.activeHorizontal = lastIndex + 1
                }

                let newIndex = direction === 'left' ?
                    this.activeHorizontal - 1 :
                    this.activeHorizontal + 1

                if (newIndex === this.selectedList.length) {
                    this.activeHorizontal = -1
                    return
                }

                if (newIndex <= lastIndex && newIndex >= 0) {
                    this.activeHorizontal = newIndex
                }
            },
            traverseSelectedDelete() {
                if (this.activeHorizontal === -1) return
                this.removeSelected(this.activeHorizontal)
            },
            backspaceDelete() {
                if (this.activeHorizontal !== -1) return
                if (!this.selectedList.length) return
                if (this.lastTerm) return

                const lastIndex = this.selectedList.length - 1
                if (lastIndex !== -1) this.removeSelected(lastIndex)
            },
            scrollToView() {
                if (!this.showSuggestPanel) return

                this.$nextTick().then(() => {
                    const container = this.$refs.panel
                    const item = this.$el.querySelector('.suggest-item.active')

                    const sy1 = container.scrollTop
                    const sy2 = container.offsetHeight + sy1

                    const ty1 = item.offsetTop
                    const th = item.offsetHeight
                    const ty2 = th + ty1

                    if (ty1 <= sy2 && sy2 < ty2) {
                        this.$refs.panel.scrollTop = (sy1 + (ty1 - sy2)) + th
                    } else if (ty1 < sy1 && sy1 <= ty2) {
                        this.$refs.panel.scrollTop = (sy1 + (ty2 - sy1)) - th
                    }
                })
            },
            calcTextWidth() {
                const textWidth = this.$refs.tester.clientWidth
                const finalWidth = textWidth ? textWidth + 10 : 50
                this.searchTermWidth = `${finalWidth}px`
            },
            hightlightWord(val) {
                if (val.label) return val.label
                if (!this.searchTerm) return val

                const termRegex = RegExp(`(${this.sanitizedTerm})`, 'i')
                return val.replace(termRegex, (m, t) => `<span class="highlight">${t}</span>`)
            }
        }
    }
</script>

<style scoped>
    .multiselect {
        position: relative;
    }

    .multiselect .selected-hold {
        position: relative;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0.3em 0 0 0.3em;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #fff;
    }

    .multiselect .selected-hold.focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    }

    .multiselect .selected-item {
        margin: 0 0.3em 0.3em 0;
        padding: 0.1em 0.5em;
        border-radius: 4px;
        border: 1px solid #bfbfbf;
        background-color: #e6e6e6;
    }

    .multiselect .selected-item .item-label {
        margin-right: 0.5em;
    }

    .multiselect .selected-item .close {
        outline: none;
    }

    .multiselect .selected-item.active {
        border-color: #1d7ecc;
    }

    .multiselect .item-search {
        width: 50px;
        margin: 0 0.5em 0.5em 0;
        border: none;
        outline: none;
    }

    .multiselect .suggest-panel {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 10;
        width: 100%;
        max-height: 300px;
        overflow: auto;
        border: 1px solid #ccc;
        background-color: #fff;
    }

    .multiselect .suggest-panel .suggest-item {
        padding: 0.4em 0.8em;
    }

    .multiselect .suggest-panel .suggest-item.active {
        background-color: #e6e6e6;
    }

    .multiselect .suggest-panel .suggest-item.disabled {
        color: #999;
        text-decoration: line-through;
    }

    .multiselect .suggest-panel .suggest-item .highlight {
        background-color: #ff0;
    }

    .multiselect .text-tester {
        position: absolute;
        visibility: hidden;
        height: auto;
        width: auto;
        white-space: nowrap;
    }

</style>
