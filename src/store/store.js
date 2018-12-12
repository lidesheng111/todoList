import Vue from 'vue';
import Vuex from 'Vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, title: "Finish Vue Screencast", completed: false, editing: false },
            { id: 2, title: "Take over world", completed: false, editing: false },
            { id: 3, title: "Learn Vue", completed: false, editing: false }
        ],
        filter: 'all',
    },

    getters: {
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length
        },
        noRemaining(state, getters) {
            return getters.remaining == 0;
        },
        todosFiltered(state) {
            switch (state.filter) {
                case 'all': return state.todos;

                case 'active':
                    return state.todos.filter(todo => !todo.completed);

                case 'completed': return state.todos.filter(todo => todo.completed);

                default: return state.todos;
            }
        },
        showClearCompletedButton(state) {
            return state.todos.filter( todo => todo.completed).length > 0;
        }
    },

    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            })
        },
        clearCompleted(state) {
            state.todos = state.todos.filter( todo => !todo.completed);
        },
        updateFilter(state, value) {
            state.filter = value;
        },
        toggleCheckAll(state, checked) {
            state.todos.forEach( todo => { todo.completed = checked});
        },

        onRemove(state, index) {
            state.todos.splice(index, 1);
        },
        onFinishEdit(state, newTodo) {
            const index = state.todos.findIndex(item => item.id == newTodo.id);
            state.todos.splice(index, 1, newTodo);
        },
    },

    actions: {
        addTodo(context, todo) {
            context.commit('addTodo', todo);
        },
        clearCompleted(context) {
            context.commit('clearCompleted');
        },
        updateFilter(context, value) {
            context.commit('updateFilter', value);
        },
        toggleCheckAll(context, checked) {
            context.commit('toggleCheckAll', checked);
        },

        onRemove(context, index) {
            context.commit('onRemove', index);
        },
        onFinishEdit(context, newTodo) {
            context.commit('onFinishEdit', newTodo);
        },
    }
})
