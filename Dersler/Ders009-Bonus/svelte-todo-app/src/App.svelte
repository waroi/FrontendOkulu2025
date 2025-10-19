<script>
  import TodoForm from "./lib/components/TodoForm.svelte";
  import TodoList from "./lib/components/TodoList.svelte";
  import { todoActions, todos } from "./lib/stores/todoStore.js";

  // Handle todo add from form
  function handleAddTodo(event) {
    todoActions.add(event.detail);
  }
  
  // Debug için todo'ları console'a yazdır
  $: console.log('Current todos:', $todos);
</script>

<main class="app">
  <header class="header">
    <h1>📝 Todo App</h1>
    <p>Svelte ile geliştirilmiş modern todo uygulaması</p>
  </header>

  <div class="container">
    <TodoForm on:add={handleAddTodo} />
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="color: black;">Debug: {$todos.length} todo var</p>
      {#each $todos as todo}
        <p style="color: black;">- {todo.text}</p>
      {/each}
    </div>
    
    <TodoList />
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    padding: 20px;
  }

  .header {
    text-align: center;
    color: white;
    margin-bottom: 2rem;
  }

  .header h1 {
    font-size: 2.5rem;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .header p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0.5rem 0 0 0;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    .app {
      padding: 10px;
    }

    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }
  }
</style>
