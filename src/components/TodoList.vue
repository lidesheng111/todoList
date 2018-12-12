<template>
<div>
    <input type="text" class="todo-input" placeholder="what needs to de done" v-model="newTodo" v-on:keyup.enter="onAdd">
    
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item v-for="(todo, index) in todosFiltered"  v-bind:key="todo.id" :todo_="todo" :index_="index" :checkAll_="noRemaining"></todo-item>
    </transition-group>

    <div class="extra-container">
        <todo-check-all></todo-check-all>
        <todo-items-remaining></todo-items-remaining>
    </div>

    <todo-filtered></todo-filtered>
</div>
</template>

<script>
import TodoItem from './TodoItem';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoCheckAll from './TodoCheckAll';
import TodoFiltered from './TodoFiltered';

export default {
    name: "todo-list",

    components: {
        TodoItem,
        TodoItemsRemaining,
        TodoCheckAll,
        TodoFiltered
    },

    data() {
        return {
            newTodo: "",
            todoCount: 3,
            beforeEditingCache: "",
        };
    },

    computed: {
        remaining() {
            return this.$store.getters.remaining;
        },
        noRemaining() {
            return this.$store.getters.noRemaining;
        },
        todosFiltered() {
            return this.$store.getters.todosFiltered;
        },
        showClearCompletedButton() {
            return this.$store.getters.showClearCompletedButton;
        }
    },  

    methods: {
        onAdd() {
            this.todoCount++;
            if (this.newTodo.trim().length === 0) return;

            this.$store.dispatch('addTodo', {
                id: this.todoCount,
                title: this.newTodo
            })
            
            this.allCompleted = false;
            this.newTodo = "";
        },
    }
};
</script>


<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

@mixin button {
    button {
        font-size: 14px;
        background-color: white;
        appearance: none;
        &:hover {
            background: lightgreen;
        }
        &:focus {
            outline: none;
        }
    }
}

    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
        &:focus {
            outline: 0;
        }
    }

    .todo-item-container {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
        @include button;

        .todo-item-label {
            padding: 6px;
            display: inline-block;
        }

        .todo-item-edit {
            font-size: 16px;
            color: #2c3e50;
            padding: 5px;
            border: 1px solid #ccc;
            font-family: "Avenir", Helvetica, Arial, sans-serif;
            &:focus {
                outline: none;
            }
        }

        .remove-item {
            cursor: pointer;
            margin-left: 14px;
            &:hover {
                color: black;
            }
        }

        .completed {
            text-decoration: line-through;
            color: grey;
        }
    }

    .extra-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        border-top: 1px solid lightgreen;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    .button-container {
        display: block;
        @include button;

        .active {
            background: lightgreen;
        }

        .clear-btn {
            float: right;
        }   
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
