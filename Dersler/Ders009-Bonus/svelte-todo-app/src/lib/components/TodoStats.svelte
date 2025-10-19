<script>
  import { todoStats } from "../stores/todoStore.js";
  import { fade } from "svelte/transition";

  // Reactive subscriptions - her store'u ayrı subscribe et
  $: total = $todoStats.total;
  $: completed = $todoStats.completed;  
  $: remaining = $todoStats.remaining;

  // Calculate completion percentage
  $: completionPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  // Progress bar animation
  $: progressWidth = `${completionPercentage}%`;

  // Get motivational message based on progress
  $: motivationalMessage = (() => {
    if (total === 0) return "İlk todo'nizi ekleyerek başlayın! 🚀";
    if (completionPercentage === 100)
      return "Tebrikler! Tüm işlerinizi tamamladınız! 🎉";
    if (completionPercentage >= 75) return "Harika gidiyorsunuz! Az kaldı! 💪";
    if (completionPercentage >= 50)
      return "Yolun yarısındasınız! Devam edin! 📈";
    if (completionPercentage >= 25) return "İyi bir başlangıç! Devam! ⭐";
    return "Yeni başlangıçlar! İlerlemeye devam! 🌱";
  })();

  // Get progress color theme
  $: progressColor = (() => {
    if (completionPercentage === 100) return "#10b981"; // green
    if (completionPercentage >= 75) return "#3b82f6"; // blue
    if (completionPercentage >= 50) return "#8b5cf6"; // purple
    if (completionPercentage >= 25) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  })();
</script>

{#if total > 0}
  <div class="stats-container" transition:fade={{ duration: 300 }}>
    <!-- Progress section -->
    <div class="progress-section">
      <div class="progress-header">
        <h3 class="progress-title">İlerleme Durumu</h3>
        <span class="progress-percentage" style="color: {progressColor}">
          {completionPercentage}%
        </span>
      </div>

      <!-- Progress bar -->
      <div class="progress-bar-container">
        <div class="progress-bar">
          <div
            class="progress-fill"
            style="width: {progressWidth}; background-color: {progressColor}"
          ></div>
        </div>
        <div class="progress-labels">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      <!-- Motivational message -->
      <div class="motivational-message" style="color: {progressColor}">
        {motivationalMessage}
      </div>
    </div>

    <!-- Stats grid -->
    <div class="stats-grid">
      <div class="stat-card total">
        <div class="stat-icon">📝</div>
        <div class="stat-content">
          <div class="stat-number">{total}</div>
          <div class="stat-label">Toplam</div>
        </div>
      </div>

      <div class="stat-card remaining">
        <div class="stat-icon">⏳</div>
        <div class="stat-content">
          <div class="stat-number">{remaining}</div>
          <div class="stat-label">Kalan</div>
        </div>
      </div>

      <div class="stat-card completed">
        <div class="stat-icon">✅</div>
        <div class="stat-content">
          <div class="stat-number">{completed}</div>
          <div class="stat-label">Tamamlandı</div>
        </div>
      </div>
    </div>

    <!-- Quick insights -->
    {#if total >= 5}
      <div class="insights-section">
        <h4 class="insights-title">📊 Hızlı İstatistikler</h4>
        <div class="insights-grid">
          <div class="insight-item">
            <span class="insight-label">Tamamlanma Oranı:</span>
            <span class="insight-value">{completionPercentage}%</span>
          </div>
          {#if remaining > 0}
            <div class="insight-item">
              <span class="insight-label">Kalan İş:</span>
              <span class="insight-value">{remaining} todo</span>
            </div>
          {/if}
          {#if completed > 0}
            <div class="insight-item">
              <span class="insight-label">Tamamlanan:</span>
              <span class="insight-value">{completed} todo</span>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .stats-container {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .progress-section {
    margin-bottom: 1.5rem;
  }

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .progress-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
  }

  .progress-percentage {
    font-size: 1.5rem;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .progress-bar-container {
    margin-bottom: 1rem;
  }

  .progress-bar {
    width: 100%;
    height: 12px;
    background: #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    height: 100%;
    border-radius: 6px;
    transition:
      width 0.8s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .progress-fill::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .progress-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
    font-size: 12px;
    color: #6b7280;
  }

  .motivational-message {
    text-align: center;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    transition: color 0.3s ease;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .stat-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 1rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .stat-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .stat-content {
    min-width: 0;
    flex: 1;
  }

  .stat-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #374151;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 2px;
  }

  .stat-card.total {
    border-left: 4px solid #667eea;
  }

  .stat-card.remaining {
    border-left: 4px solid #f59e0b;
  }

  .stat-card.completed {
    border-left: 4px solid #10b981;
  }

  .insights-section {
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }

  .insights-title {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
  }

  .insights-grid {
    display: grid;
    gap: 0.75rem;
  }

  .insight-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background: white;
    border-radius: 8px;
    font-size: 0.875rem;
  }

  .insight-label {
    color: #6b7280;
  }

  .insight-value {
    font-weight: 600;
    color: #374151;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .stats-container {
      padding: 1rem;
    }

    .progress-title {
      font-size: 1rem;
    }

    .progress-percentage {
      font-size: 1.25rem;
    }

    .motivational-message {
      font-size: 0.875rem;
    }
  }

  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .stat-card {
      padding: 0.75rem;
    }

    .stat-number {
      font-size: 1.25rem;
    }

    .insights-grid {
      gap: 0.5rem;
    }

    .insight-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
  }

  /* Accessibility improvements */
  @media (prefers-reduced-motion: reduce) {
    .progress-fill,
    .stat-card {
      transition: none;
    }

    .progress-fill::after {
      animation: none;
    }

    .stat-card:hover {
      transform: none;
    }
  }
</style>
