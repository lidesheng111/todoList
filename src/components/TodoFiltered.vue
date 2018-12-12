<template>
    <div class="button-container">
        <button :class="{ active: filter == 'all' }" @click="onChangeFilter('all') ">All</button>
        <button :class="{ active: filter == 'active' }" @click="onChangeFilter('active')">Active</button>
        <button :class="{ active: filter == 'completed' }" @click="onChangeFilter('completed')">Completed</button>
        <transition name="fade">
            <button class="clear-btn" v-if="showButton" @click="onClearCompleted">Clear Completed</button>
        </transition> 
    </div>   
</template>

<script>
export default {
    name: "todo-filtered",

    computed: {
        showButton() {
            return this.$store.getters.showClearCompletedButton;
        },
        filter() {
            return this.$store.state.filter;
        }
    },

    methods: {
        onClearCompleted() {
            this.$store.dispatch('clearCompleted');
        },
        onChangeFilter(value) {
            this.$store.dispatch('updateFilter', value);
        }
    }
}
</script>

