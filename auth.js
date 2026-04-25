const AUTH_STORAGE_KEY = "sweetcrust-user";

const Auth = {
  getUser() {
    try {
      return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
    } catch (e) {
      return null;
    }
  },

  login(email) {
    const user = { email, name: email.split('@')[0], id: `user-${Date.now()}` };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    this.notify();
    return user;
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.notify();
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  notify() {
    document.dispatchEvent(new CustomEvent("auth-updated", { detail: this.getUser() }));
  }
};

window.SweetCrustAuth = Auth;
