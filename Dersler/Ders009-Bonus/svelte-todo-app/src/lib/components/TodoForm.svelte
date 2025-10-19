<script>
  import { createEventDispatcher } from "svelte";
  import { validateTodoText } from "../utils/todoUtils.js";

  // Event dispatcher
  const dispatch = createEventDispatcher();

  // Form state
  let inputText = "";
  let isSubmitting = false;
  let errorMessage = "";
  let inputRef;

  // Form validation
  function validateInput() {
    errorMessage = "";

    if (!inputText.trim()) {
      errorMessage = "Todo metni boş olamaz";
      return false;
    }

    if (!validateTodoText(inputText)) {
      errorMessage = "Todo metni 1-500 karakter arasında olmalıdır";
      return false;
    }

    return true;
  }

  // Form submit handler
  async function handleSubmit() {
    if (!validateInput() || isSubmitting) return;

    isSubmitting = true;

    try {
      // Todo ekleme eventi
      dispatch("add", inputText.trim());

      // Form'u temizle
      inputText = "";
      errorMessage = "";

      // Input'a odaklan
      if (inputRef) {
        inputRef.focus();
      }
    } catch (error) {
      errorMessage = "Todo eklenirken bir hata oluştu";
      console.error("Todo ekleme hatası:", error);
    } finally {
      isSubmitting = false;
    }
  }

  // Enter key handler
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  }

  // Input değişikliğinde hata mesajını temizle
  function handleInputChange() {
    if (errorMessage && inputText.trim()) {
      errorMessage = "";
    }
  }

  // Component mount olduğunda input'a odaklan
  import { onMount } from "svelte";

  onMount(() => {
    if (inputRef) {
      inputRef.focus();
    }
  });
</script>

<form class="todo-form" on:submit|preventDefault={handleSubmit}>
  <div class="form-group">
    <div class="input-container">
      <input
        bind:this={inputRef}
        bind:value={inputText}
        on:input={handleInputChange}
        on:keypress={handleKeyPress}
        class="todo-input"
        class:error={errorMessage}
        placeholder="Yeni todo ekle..."
        maxlength="500"
        disabled={isSubmitting}
        aria-label="Yeni todo"
        aria-describedby={errorMessage ? "error-message" : null}
      />

      <button
        type="submit"
        class="submit-btn"
        class:loading={isSubmitting}
        disabled={isSubmitting || !inputText.trim()}
        aria-label="Todo ekle"
      >
        {#if isSubmitting}
          <div class="spinner"></div>
        {:else}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        {/if}
      </button>
    </div>

    <!-- Error message -->
    {#if errorMessage}
      <div class="error-message" id="error-message" role="alert">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        {errorMessage}
      </div>
    {/if}
  </div>

  <!-- Character counter -->
  <div class="character-counter" class:warning={inputText.length > 400}>
    {inputText.length}/500
  </div>
</form>

<style>
  .todo-form {
    margin-bottom: 2rem;
  }

  .form-group {
    position: relative;
  }

  .input-container {
    display: flex;
    gap: 8px;
    align-items: stretch;
  }

  .todo-input {
    flex: 1;
    padding: 16px 20px;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    font-size: 16px;
    line-height: 1.5;
    transition: all 0.2s ease;
    background: white;
  }

  .todo-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .todo-input:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .todo-input.error {
    border-color: #dc2626;
  }

  .todo-input.error:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  .submit-btn {
    width: 56px;
    height: auto;
    min-height: 56px;
    border: 2px solid #667eea;
    border-radius: 12px;
    background: #667eea;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .submit-btn:hover:not(:disabled) {
    background: #5a67d8;
    border-color: #5a67d8;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .submit-btn:disabled {
    background: #9ca3af;
    border-color: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .submit-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }

  .submit-btn svg {
    width: 20px;
    height: 20px;
  }

  .submit-btn.loading svg {
    display: none;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding: 12px 16px;
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    color: #dc2626;
    font-size: 14px;
  }

  .error-message svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .character-counter {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
    font-size: 12px;
    color: #6b7280;
    transition: color 0.2s ease;
  }

  .character-counter.warning {
    color: #d97706;
    font-weight: 600;
  }

  /* Mobile responsive */
  @media (max-width: 480px) {
    .todo-input {
      padding: 14px 16px;
      font-size: 16px; /* iOS zoom engellemek için */
    }

    .submit-btn {
      width: 50px;
      min-height: 50px;
    }

    .submit-btn svg {
      width: 18px;
      height: 18px;
    }

    .spinner {
      width: 18px;
      height: 18px;
    }
  }

  /* Accessibility improvements */
  @media (prefers-reduced-motion: reduce) {
    .submit-btn,
    .todo-input,
    .character-counter {
      transition: none;
    }

    .submit-btn:hover:not(:disabled) {
      transform: none;
    }

    .spinner {
      animation: none;
    }
  }
</style>
