<template>
  <div id="app" class="container">
    <img class="logo" src="./assets/logo.png">
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList';

export default {
  name: 'App',
  components: {
    TodoList
  },
  data() {
    return {
      msg: [],
      fruits: [
        {id: 1, name: 'apple'},
        {id: 2, name: 'pear'},
        {id: 3, name: 'orange'}
      ],
      newItem: '',
      truthiness: false,
      style: 'style',
      noStyle: 'noStyle'
    }
  },
  methods: {
    onAdd: function(newItem) {
      if (newItem.length == 0) return;
      let name = newItem;
      let id = Number(this.fruits.length) + 1;
      this.fruits.push({id: id, name: name});
      this.newItem = '';
    },
    onDelete: function(id) {
      this.fruits.splice(id, 1)
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
