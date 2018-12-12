<template>
    <div>
        <label for="checkAll">Check All</label>
        <!-- anyRemaining取决于remaining是否等于0，将anyRemaining赋值给checked，以控制checkbox; 同时通过toogle方法，用checked值 和 forEach，控制(取消)全选 和 remaining -->
        <input type="checkbox" id="checkAll" v-bind:checked="noRemaining" @change="toggleCheckAll_()">
    </div>
</template>

<script>
export default {
    name: 'todo-check-all',

    computed: {
        noRemaining() {
            return this.$store.getters.noRemaining;
        }
    },

    methods: {
        toggleCheckAll_() {
            this.$store.dispatch('toggleCheckAll', event.target.checked)
        }
    }
}
</script>

