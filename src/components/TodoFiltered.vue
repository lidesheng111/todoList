<template>
    <div class="button-container">
        <button :class="{ active: filter == 'all' }" @click="onChangeFilter('all') ">All</button>
        <button :class="{ active: filter == 'active' }" @click="onChangeFilter('active')">Active</button>
        <button :class="{ active: filter == 'completed' }" @click="onChangeFilter('completed')">Completed</button>
        <transition name="fade">
            <button class="clear-btn" v-if="showButton_" @click="onClearCompleted">Clear Completed</button>
        </transition> 
    </div>   
</template>

<script>
export default {
    name: "todo-filtered",

    props: {
        showButton_: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            filter: 'all',
        }
    },

    methods: {
        onClearCompleted() {
            eventBus.$emit('onClearCompleted_');
        },
        onChangeFilter(value) {
            this.filter = value;
            eventBus.$emit('onFilter_', value);
        }
    }
}
</script>

