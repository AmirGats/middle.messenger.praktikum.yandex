type Listener<T extends any[] = any[]> = (...args: T) => void;


// Класс Event-Bus для работы с блоком 
class EventBus {
  private listeners: Record<string, Listener[]> = {};

// подписка
  on<T extends any[]>(event: string, callback: Listener<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

// отписка
  off<T extends any[]>(event: string, callback: Listener<T>): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
  }
  
// вызов триггера событий
  emit<T extends any[]>(event: string, ...args: T): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach(listener => listener(...args));
  }
}

export default EventBus;
