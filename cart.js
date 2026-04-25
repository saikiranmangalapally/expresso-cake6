const CART_STORAGE_KEY = "Expresso Cake-cart";

const Cart = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  save(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    this.notify();
  },

  add(product, quantity = 1) {
    const cart = this.get();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    this.save(cart);
  },

  remove(productId) {
    const cart = this.get().filter(item => item.id !== productId);
    this.save(cart);
  },

  updateQuantity(productId, quantity) {
    const cart = this.get().map(item => {
      if (item.id === productId) item.quantity = Math.max(1, quantity);
      return item;
    });
    this.save(cart);
  },

  clear() {
    this.save([]);
  },

  getTotal() {
    return this.get().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getCount() {
    return this.get().reduce((sum, item) => sum + item.quantity, 0);
  },

  notify() {
    document.dispatchEvent(new CustomEvent("cart-updated", { detail: this.get() }));
  }
};

window.ExpressoCart = Cart;
