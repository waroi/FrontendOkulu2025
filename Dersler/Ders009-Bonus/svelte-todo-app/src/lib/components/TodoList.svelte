<script>
  import { todos, todoActions } from "../stores/todoStore.js";
  import TodoItem from "./TodoItem.svelte";
  
  // Reactive store subscription
  $: currentTodos = $todos;

  // Filter state
  let filter = "all"; // 'all', 'active', 'completed'

  // Filtered todos
  $: filteredTodos = (() => {
    switch (filter) {
      case "active":
        return currentTodos.filter((todo) => !todo.completed);
      case "completed":
        return currentTodos.filter((todo) => todo.completed);
      default:
        return currentTodos;
    }
  })();

  // Sort todos - completed items at bottom
  $: sortedTodos = [...filteredTodos].sort((a, b) => {
    // Completed items go to bottom
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;

    // Within same completion status, sort by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Event handlers
  function handleToggle(event) {
    todoActions.toggle(event.detail);
  }

  function handleUpdate(event) {
    const { id, text } = event.detail;
    todoActions.update(id, text);
  }

  function handleDelete(event) {
    todoActions.remove(event.detail);
  }

  // Filter change handler
  function setFilter(newFilter) {
    filter = newFilter;
  }

  // Clear completed todos
  function clearCompleted() {
    if (confirm("Tamamlanmış tüm todoları silmek istediğinize emin misiniz?")) {
      todoActions.clearCompleted();
    }
  }

  // Keyboard navigation for filters
  function handleFilterKeyPress(event, filterValue) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setFilter(filterValue);
    }
  }

  // Get filter counts
  $: filterCounts = {
    all: currentTodos.length,
    active: currentTodos.filter((todo) => !todo.completed).length,
    completed: currentTodos.filter((todo) => todo.completed).length,
  };
</script>

<div class="todo-list-container">
  <!-- Filter buttons -->
  {#if currentTodos.length > 0}
    <div class="filter-bar">
      <div class="filter-buttons">
        <button
          class="filter-btn"
          class:active={filter === "all"}
          on:click={() => setFilter("all")}
          on:keypress={(e) => handleFilterKeyPress(e, "all")}
          aria-label="Tüm todoları göster"
        >
          Tümü
          <span class="count">{filterCounts.all}</span>
        </button>

        <button
          class="filter-btn"
          class:active={filter === "active"}
          on:click={() => setFilter("active")}
          on:keypress={(e) => handleFilterKeyPress(e, "active")}
          aria-label="Aktif todoları göster"
        >
          Aktif
          <span class="count">{filterCounts.active}</span>
        </button>

        <button
          class="filter-btn"
          class:active={filter === "completed"}
          on:click={() => setFilter("completed")}
          on:keypress={(e) => handleFilterKeyPress(e, "completed")}
          aria-label="Tamamlanmış todoları göster"
        >
          Tamamlandı
          <span class="count">{filterCounts.completed}</span>
        </button>
      </div>

      <!-- Clear completed button -->
      {#if filterCounts.completed > 0}
        <button
          class="clear-completed-btn"
          on:click={clearCompleted}
          aria-label="Tamamlanmış todoları temizle"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="3,6 5,6 21,6"></polyline>
            <path
              d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"
            ></path>
          </svg>
          Tamamlanmışları Temizle
        </button>
      {/if}
    </div>
  {/if}

  <!-- Todo list -->
  <div class="todo-list" role="list" aria-label="Todo listesi">
    {#if sortedTodos.length === 0}
      <div class="empty-state">
        {#if currentTodos.length === 0}
          <div class="empty-icon">📝</div>
          <h3>Henüz todo yok</h3>
          <p>İlk todo'nizi ekleyerek başlayın!</p>
        {:else if filter === "active"}
          <div class="empty-icon">✅</div>
          <h3>Harika! Tüm işler tamamlandı</h3>
          <p>Aktif todo bulunmuyor.</p>
        {:else if filter === "completed"}
          <div class="empty-icon">⏳</div>
          <h3>Henüz tamamlanmış todo yok</h3>
          <p>İşlerinizi tamamlayarak burada görebilirsiniz.</p>
        {/if}
      </div>
    {:else}
      <ul class="todos" role="list">
        {#each sortedTodos as todo (todo.id)}
          <div role="listitem">
            <TodoItem
              {todo}
              on:toggle={handleToggle}
              on:update={handleUpdate}
              on:delete={handleDelete}
            />
          </div>
        {/each}
      </ul>
    {/if}
  </div>

  <!-- Results summary -->
  {#if sortedTodos.length > 0}
    <div class="results-summary" aria-live="polite">
      {#if filter === "all"}
        {currentTodos.length} todo gösteriliyor
      {:else if filter === "active"}
        {filterCounts.active} aktif todo gösteriliyor
      {:else}
        {filterCounts.completed} tamamlanmış todo gösteriliyor
      {/if}
    </div>
  {/if}
</div>

<style>
  .todo-list-container {
    width: 100%;
  }

  .filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .filter-buttons {
    display: flex;
    gap: 4px;
    background: #f3f4f6;
    padding: 4px;
    border-radius: 10px;
  }

  .filter-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
  }

  .filter-btn:hover {
    color: #374151;
    background: rgba(255, 255, 255, 0.5);
  }

  .filter-btn.active {
    background: white;
    color: #667eea;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .filter-btn:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  .count {
    background: #e5e7eb;
    color: #6b7280;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
  }

  .filter-btn.active .count {
    background: #667eea;
    color: white;
  }

  .clear-completed-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: white;
    color: #6b7280;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  .clear-completed-btn:hover {
    border-color: #dc2626;
    color: #dc2626;
    background: #fee2e2;
  }

  .clear-completed-btn:focus {
    outline: 2px solid #dc2626;
    outline-offset: 2px;
  }

  .clear-completed-btn svg {
    width: 16px;
    height: 16px;
  }

  .todo-list {
    min-height: 200px;
  }

  .todos {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    text-align: center;
    color: #6b7280;
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .empty-state h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
  }

  .empty-state p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
  }

  .results-summary {
    text-align: center;
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    color: #6b7280;
    font-size: 14px;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .filter-bar {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }

    .filter-buttons {
      justify-content: center;
    }

    .filter-btn {
      flex: 1;
      justify-content: center;
      min-width: 0;
    }

    .clear-completed-btn {
      align-self: center;
    }
  }

  @media (max-width: 480px) {
    .filter-btn {
      padding: 10px 12px;
      font-size: 13px;
    }

    .empty-state {
      padding: 2rem 1rem;
    }

    .empty-icon {
      font-size: 2.5rem;
    }

    .empty-state h3 {
      font-size: 1.1rem;
    }

    .empty-state p {
      font-size: 0.9rem;
    }
  }

  /* Accessibility improvements */
  @media (prefers-reduced-motion: reduce) {
    .filter-btn,
    .clear-completed-btn {
      transition: none;
    }
  }
</style>
