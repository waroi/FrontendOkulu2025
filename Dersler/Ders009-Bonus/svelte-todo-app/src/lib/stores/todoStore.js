import { writable } from "svelte/store";
import {
  generateId,
  loadFromStorage,
  saveToStorage,
} from "../utils/todoUtils.js";

// Todo item interface için tip tanımı
/**
 * @typedef {Object} Todo
 * @property {string} id - Benzersiz todo kimliği
 * @property {string} text - Todo metni
 * @property {boolean} completed - Tamamlanma durumu
 * @property {Date} createdAt - Oluşturulma tarihi
 * @property {Date} updatedAt - Güncellenme tarihi
 */

// Initial state - LocalStorage'dan yükle
const initialTodos = loadFromStorage();

// Writable store oluştur
export const todos = writable(initialTodos);

// Todo işlemleri için business logic
export const todoActions = {
  /**
   * Yeni todo ekle
   * @param {string} text - Todo metni
   */
  add: (text) => {
    if (!text.trim()) return;

    const newTodo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    todos.update((currentTodos) => {
      const updatedTodos = [...currentTodos, newTodo];
      saveToStorage(updatedTodos);
      return updatedTodos;
    });
  },

  /**
   * Todo sil
   * @param {string} id - Silinecek todo kimliği
   */
  remove: (id) => {
    todos.update((currentTodos) => {
      const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
      saveToStorage(updatedTodos);
      return updatedTodos;
    });
  },

  /**
   * Todo tamamlanma durumunu değiştir
   * @param {string} id - Todo kimliği
   */
  toggle: (id) => {
    todos.update((currentTodos) => {
      const updatedTodos = currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      );
      saveToStorage(updatedTodos);
      return updatedTodos;
    });
  },

  /**
   * Todo metnini güncelle
   * @param {string} id - Todo kimliği
   * @param {string} newText - Yeni metin
   */
  update: (id, newText) => {
    if (!newText.trim()) return;

    todos.update((currentTodos) => {
      const updatedTodos = currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText.trim(), updatedAt: new Date() }
          : todo
      );
      saveToStorage(updatedTodos);
      return updatedTodos;
    });
  },

  /**
   * Tüm tamamlanmış todoları temizle
   */
  clearCompleted: () => {
    todos.update((currentTodos) => {
      const updatedTodos = currentTodos.filter((todo) => !todo.completed);
      saveToStorage(updatedTodos);
      return updatedTodos;
    });
  },
};

// Derived stores - reactive computations
export const todoStats = {
  // Toplam todo sayısı
  total: writable(0),
  // Tamamlanmış todo sayısı
  completed: writable(0),
  // Tamamlanmamış todo sayısı
  remaining: writable(0),
};

// Stats'ları güncelle
todos.subscribe((currentTodos) => {
  const total = currentTodos.length;
  const completed = currentTodos.filter((todo) => todo.completed).length;
  const remaining = total - completed;

  todoStats.total.set(total);
  todoStats.completed.set(completed);
  todoStats.remaining.set(remaining);
});
