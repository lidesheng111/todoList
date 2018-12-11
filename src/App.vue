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
