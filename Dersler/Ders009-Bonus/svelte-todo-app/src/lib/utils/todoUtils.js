/**
 * Benzersiz ID üretici
 * @returns {string} Benzersiz ID
 */
export function generateId() {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * LocalStorage'dan todoları yükle
 * @returns {Array} Todo dizisi
 */
export function loadFromStorage() {
  try {
    const stored = localStorage.getItem("svelte-todos");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Date objelerini restore et
      return parsed.map((todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
    }
  } catch (error) {
    console.warn("LocalStorage'dan todo verileri yüklenemedi:", error);
  }
  return [];
}

/**
 * Todoları LocalStorage'a kaydet
 * @param {Array} todos - Kaydedilecek todo dizisi
 */
export function saveToStorage(todos) {
  try {
    localStorage.setItem("svelte-todos", JSON.stringify(todos));
  } catch (error) {
    console.warn("Todo verileri LocalStorage'a kaydedilemedi:", error);
  }
}

/**
 * Metin validasyonu
 * @param {string} text - Validate edilecek metin
 * @returns {boolean} Geçerli mi?
 */
export function validateTodoText(text) {
  return text && text.trim().length > 0 && text.trim().length <= 500;
}

/**
 * Tarih formatlayıcı
 * @param {Date} date - Formatlanacak tarih
 * @returns {string} Formatlanmış tarih
 */
export function formatDate(date) {
  if (!date || !(date instanceof Date)) return "";

  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "şimdi";
  if (diffMinutes < 60) return `${diffMinutes} dakika önce`;
  if (diffHours < 24) return `${diffHours} saat önce`;
  if (diffDays < 7) return `${diffDays} gün önce`;

  return date.toLocaleDateString("tr-TR");
}

/**
 * Keyboard navigation helper
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Function} callback - Çalıştırılacak fonksiyon
 */
export function handleKeyPress(event, callback) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    callback();
  }
}
