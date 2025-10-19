<script>
  import { createEventDispatcher } from "svelte";
  import { formatDate, handleKeyPress } from "../utils/todoUtils.js";

  // Props
  export let todo;

  // Event dispatcher
  const dispatch = createEventDispatcher();

  // Local state
  let isEditing = false;
  let editText = "";
  let editInput;

  // Edit modunu başlat
  function startEdit() {
    isEditing = true;
    editText = todo.text;
    // DOM güncellendiğinde input'a focus yap
    setTimeout(() => {
      if (editInput) {
        editInput.focus();
        editInput.select();
      }
    }, 0);
  }

  // Edit modunu iptal et
  function cancelEdit() {
    isEditing = false;
    editText = "";
  }

  // Düzenlemeyi kaydet
  function saveEdit() {
    if (editText.trim()) {
      dispatch("update", { id: todo.id, text: editText.trim() });
    }
    isEditing = false;
  }

  // Enter/Escape key handling
  function handleEditKeyPress(event) {
    if (event.key === "Enter") {
      saveEdit();
    } else if (event.key === "Escape") {
      cancelEdit();
    }
  }

  // Toggle completion
  function toggleComplete() {
    dispatch("toggle", todo.id);
  }

  // Delete todo
  function deleteTodo() {
    dispatch("delete", todo.id);
  }
</script>

<li class="todo-item" class:completed={todo.completed}>
  <div class="todo-content">
    <!-- Completion checkbox -->
    <button
      class="checkbox"
      class:checked={todo.completed}
      on:click={toggleComplete}
      on:keypress={(e) => handleKeyPress(e, toggleComplete)}
      aria-label={todo.completed
        ? "Tamamlandı işaretini kaldır"
        : "Tamamlandı olarak işaretle"}
      type="button"
    >
      {#if todo.completed}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      {/if}
    </button>

    <!-- Todo text -->
    <div class="todo-text-container">
      {#if isEditing}
        <input
          bind:this={editInput}
          bind:value={editText}
          on:keydown={handleEditKeyPress}
          on:blur={saveEdit}
          class="edit-input"
          maxlength="500"
          aria-label="Todo düzenle"
        />
      {:else}
        <span
          class="todo-text"
          on:dblclick={startEdit}
          on:keypress={(e) => handleKeyPress(e, startEdit)}
          tabindex="0"
          role="button"
          aria-label="Düzenlemek için çift tıklayın"
        >
          {todo.text}
        </span>
      {/if}

      <!-- Metadata -->
      <div class="todo-meta">
        <span class="todo-date" title="Oluşturulma tarihi">
          {formatDate(todo.createdAt)}
        </span>
        {#if todo.updatedAt && todo.updatedAt > todo.createdAt}
          <span class="todo-updated" title="Son güncelleme">
            • düzenlendi
          </span>
        {/if}
      </div>
    </div>
  </div>

  <!-- Action buttons -->
  <div class="todo-actions">
    {#if !isEditing}
      <button
        class="action-btn edit-btn"
        on:click={startEdit}
        aria-label="Todo düzenle"
        type="button"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="m18 2 4 4-14 14H4v-4L18 2z"></path>
        </svg>
      </button>
    {/if}

    <button
      class="action-btn delete-btn"
      on:click={deleteTodo}
      aria-label="Todo sil"
      type="button"
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
    </button>
  </div>
</li>

<style>
  .todo-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    background: white;
    transition: all 0.2s ease;
    margin-bottom: 8px;
  }

  .todo-item:hover {
    border-color: #c3c8cf;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .todo-item.completed {
    opacity: 0.7;
    background: #f8f9fa;
  }

  .todo-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }

  .checkbox {
    width: 24px;
    height: 24px;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .checkbox:hover {
    border-color: #667eea;
  }

  .checkbox.checked {
    background: #667eea;
    border-color: #667eea;
    color: white;
  }

  .checkbox svg {
    width: 14px;
    height: 14px;
  }

  .todo-text-container {
    flex: 1;
    min-width: 0;
  }

  .todo-text {
    display: block;
    word-wrap: break-word;
    line-height: 1.5;
    cursor: pointer;
    padding: 2px 0;
    border-radius: 4px;
  }

  .todo-text:hover {
    background: #f3f4f6;
  }

  .todo-text:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  .completed .todo-text {
    text-decoration: line-through;
    color: #6b7280;
  }

  .edit-input {
    width: 100%;
    padding: 8px 12px;
    border: 2px solid #667eea;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.5;
    outline: none;
  }

  .todo-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
    font-size: 12px;
    color: #6b7280;
  }

  .todo-updated {
    font-style: italic;
  }

  .todo-actions {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
  }

  .action-btn {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    background: #f3f4f6;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .action-btn:hover {
    background: #e5e7eb;
  }

  .action-btn:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  .action-btn svg {
    width: 16px;
    height: 16px;
    color: #6b7280;
  }

  .edit-btn:hover svg {
    color: #667eea;
  }

  .delete-btn:hover {
    background: #fee2e2;
  }

  .delete-btn:hover svg {
    color: #dc2626;
  }

  @media (max-width: 480px) {
    .todo-item {
      padding: 12px;
      gap: 8px;
    }

    .todo-content {
      gap: 8px;
    }

    .action-btn {
      width: 28px;
      height: 28px;
    }

    .action-btn svg {
      width: 14px;
      height: 14px;
    }
  }
</style>
