const storage = {
  orders: "sweetcrust-orders",
  enquiries: "sweetcrust-enquiries",
  settings: "sweetcrust-settings",
};

const seedOrders = [
  { id: "SC-1048", customer: "Ananya Rao", items: "German Chocolate Cake", slot: "Apr 25, 2026, 5-7 PM", amount: 600, status: "Preparing" },
  { id: "SC-1047", customer: "Rahul Mehta", items: "Cartoon Photo Cake", slot: "Apr 25, 2026, 8-10 PM", amount: 1100, status: "Confirmed" },
  { id: "SC-1046", customer: "Priya Nair", items: "Party In A Box", slot: "Apr 26, 2026, 10 AM", amount: 1299, status: "Out for delivery" },
  { id: "SC-1045", customer: "Arjun S", items: "Wedding Engagement Cake", slot: "Apr 27, 2026, 4 PM", amount: 2200, status: "Scheduled" },
];

const seedEnquiries = [
  { id: "EN-501", type: "Custom Cake", name: "Sneha", contact: "sneha@example.com", message: "Need a 3D car cake for 30 people.", status: "Open" },
  { id: "EN-502", type: "Corporate", name: "Nexora HR", contact: "hr@example.com", message: "120 dessert boxes for employee event.", status: "Open" },
  { id: "EN-503", type: "Franchise", name: "Kiran", contact: "+91 90000 12345", message: "Interested in a live kitchen franchise.", status: "Contacted" },
];

const defaultSettings = {
  storeName: "SweetCrust Bakery",
  phone: "+91 89700 10111",
  email: "support@sweetcrust.example",
  deliveryMessage: "Same-day and fixed-time delivery available in selected cities.",
  offer: "Fresh cakes, photo cakes and desserts delivered today.",
};

function readJson(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return saved || fallback;
  } catch (error) {
    localStorage.removeItem(key);
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  setSaveState("Saved locally");
  syncWithServer();
}

function setSaveState(message) {
  const saveState = document.querySelector("[data-save-state]");
  if (saveState) saveState.textContent = message;
}

function makeId(name) {
  const slug = String(name || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `${slug}-${Date.now()}`;
}

function productList() {
  return window.SweetCrustData.getProducts().map((product, index) => ({
    id: product.id || makeId(`${product.name}-${index}`),
    stock: product.stock ?? 25,
    status: product.status || "active",
    ...product,
  }));
}

function saveProductList(products) {
  window.SweetCrustData.saveProducts(products);
  setSaveState("Product catalogue saved");
  syncWithServer();
}

function money(value) {
  return `Rs ${Number(value).toLocaleString("en-IN")}`;
}

let catalog = productList();
let orders = readJson(storage.orders, seedOrders);
let enquiries = readJson(storage.enquiries, seedEnquiries);
let settings = readJson(storage.settings, defaultSettings);

function renderMetrics() {
  const revenue = orders.reduce((sum, order) => sum + Number(order.total || order.amount || 0), 0);
  const pending = enquiries.filter((enquiry) => enquiry.status !== "Closed").length;
  document.querySelector('[data-metric="revenue"]').textContent = money(revenue);
  document.querySelector('[data-metric="orders"]').textContent = String(orders.length);
  document.querySelector('[data-metric="products"]').textContent = String(catalog.length);
  document.querySelector('[data-metric="pending"]').textContent = String(pending);
}

function renderRecentOrders() {
  const rows = orders.slice(0, 4).map((order) => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer.name || order.customer}</td>
      <td>${money(order.total || order.amount)}</td>
      <td><span class="status-pill">${order.status}</span></td>
    </tr>
  `).join("");
  document.querySelector("[data-recent-orders]").innerHTML = rows;
}

function renderLowStock() {
  const rows = catalog
    .filter((product) => Number(product.stock) <= 10)
    .slice(0, 6)
    .map((product) => `
      <tr>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.stock}</td>
      </tr>
    `).join("");
  document.querySelector("[data-low-stock]").innerHTML = rows || '<tr><td colspan="3">All products are stocked.</td></tr>';
}

function renderProducts() {
  const query = document.querySelector("[data-product-search]").value.toLowerCase();
  const category = document.querySelector("[data-category-filter]").value;
  const filteredProducts = catalog.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const haystack = `${product.name} ${product.category} ${product.tags.join(" ")}`.toLowerCase();
    return matchesCategory && haystack.includes(query);
  });

  document.querySelector("[data-product-table]").innerHTML = filteredProducts.map((product) => `
    <tr>
      <td>
        <div class="admin-product-cell">
          <img src="${product.image}" alt="">
          <span>${product.name}</span>
        </div>
      </td>
      <td>${product.category}</td>
      <td>${money(product.price)}</td>
      <td>${product.stock}</td>
      <td><span class="status-pill">${product.status}</span></td>
      <td class="table-actions">
        <button class="text-button" data-edit-product="${product.id}">Edit</button>
        <button class="text-button danger-text" data-delete-product="${product.id}">Delete</button>
      </td>
    </tr>
  `).join("");
}

function renderOrders() {
  document.querySelector("[data-order-table]").innerHTML = orders.map((order) => {
    const customerName = order.customer.name || order.customer;
    const itemsList = Array.isArray(order.items) ? order.items.map(i => i.name).join(', ') : order.items;
    const orderTotal = order.total || order.amount;
    const orderSlot = order.date || order.slot;

    return `
      <tr>
        <td>${order.id}</td>
        <td>${customerName}</td>
        <td>${itemsList}</td>
        <td>${orderSlot}</td>
        <td>${money(orderTotal)}</td>
        <td>
          <select data-order-status="${order.id}">
            ${["Confirmed", "Preparing", "Out for delivery", "Delivered", "Scheduled", "Pending"].map((status) => `<option value="${status}" ${status === order.status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </td>
      </tr>
    `;
  }).join("");
}

function renderEnquiries() {
  document.querySelector("[data-enquiry-table]").innerHTML = enquiries.map((enquiry) => `
    <tr>
      <td>${enquiry.type}</td>
      <td>${enquiry.name}</td>
      <td>${enquiry.contact}</td>
      <td>${enquiry.message}</td>
      <td><span class="status-pill">${enquiry.status}</span></td>
      <td><button class="text-button" data-close-enquiry="${enquiry.id}">${enquiry.status === "Closed" ? "Reopen" : "Close"}</button></td>
    </tr>
  `).join("");
}

function renderSettings() {
  const form = document.querySelector("[data-settings-form]");
  Object.entries(settings).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
}

async function fetchServerData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    if (data.orders) orders = data.orders;
    if (data.enquiries) enquiries = data.enquiries;
    if (data.settings) settings = data.settings;
    if (data.catalog && Array.isArray(data.catalog) && data.catalog.length > 0) {
      catalog = data.catalog;
    } else if (catalog.length > 0) {
      syncWithServer(); // Seed server with default products
    }
    renderAll();
  } catch (error) {
    console.error("Error fetching data from server:", error);
  }
}

async function syncWithServer() {
  try {
    await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orders, enquiries, settings, catalog }),
    });
    setSaveState("Synced with server");
  } catch (error) {
    console.error("Error syncing with server:", error);
    setSaveState("Sync failed");
  }
}

function renderAll() {
  renderMetrics();
  renderRecentOrders();
  renderLowStock();
  renderProducts();
  renderOrders();
  renderEnquiries();
  renderSettings();
}

fetchServerData();

function showPanel(name) {
  document.querySelectorAll("[data-tab]").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === name));
  document.querySelectorAll("[data-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === name));
}

function fillProductForm(product) {
  const form = document.querySelector("[data-product-form]");
  form.elements.id.value = product?.id || "";
  form.elements.name.value = product?.name || "";
  form.elements.category.value = product?.category || "birthday";
  form.elements.price.value = product?.price || "";
  form.elements.stock.value = product?.stock ?? 25;
  form.elements.rating.value = product?.rating || 4.8;
  form.elements.status.value = product?.status || "active";
  form.elements.image.value = product?.image || "";
  form.elements.tags.value = product?.tags?.join(", ") || "";
  form.elements.featured.checked = Boolean(product?.tags?.includes("featured"));
  form.elements.name.focus();
}

document.querySelectorAll("[data-tab]").forEach((tab) => {
  tab.addEventListener("click", () => showPanel(tab.dataset.tab));
});

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.jump));
});

document.querySelector("[data-new-product]").addEventListener("click", () => fillProductForm());
document.querySelector("[data-clear-form]").addEventListener("click", () => fillProductForm());

document.querySelector("[data-product-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  let tags = form.elements.tags.value.split(",").map((tag) => tag.trim()).filter(Boolean);
  tags = form.elements.featured.checked ? Array.from(new Set([...tags, "featured"])) : tags.filter((tag) => tag !== "featured");

  const product = {
    id: form.elements.id.value || makeId(form.elements.name.value),
    name: form.elements.name.value.trim(),
    category: form.elements.category.value,
    price: Number(form.elements.price.value),
    stock: Number(form.elements.stock.value),
    rating: Number(form.elements.rating.value),
    status: form.elements.status.value,
    image: form.elements.image.value.trim(),
    tags,
  };

  const existingIndex = catalog.findIndex((item) => item.id === product.id);
  catalog = existingIndex >= 0
    ? catalog.map((item) => (item.id === product.id ? product : item))
    : [product, ...catalog];
  saveProductList(catalog);
  fillProductForm();
  renderAll();
});

document.querySelector("[data-product-table]").addEventListener("click", (event) => {
  const editId = event.target.dataset.editProduct;
  const deleteId = event.target.dataset.deleteProduct;
  if (editId) {
    const product = catalog.find((item) => item.id === editId);
    if (product) fillProductForm(product);
  }
  if (deleteId && confirm("Delete this product from the local catalogue?")) {
    catalog = catalog.filter((item) => item.id !== deleteId);
    saveProductList(catalog);
    renderAll();
  }
});

document.querySelector("[data-product-search]").addEventListener("input", renderProducts);
document.querySelector("[data-category-filter]").addEventListener("change", renderProducts);

document.querySelector("[data-reset-products]").addEventListener("click", () => {
  if (!confirm("Reset product catalogue to the original bakery data?")) return;
  catalog = window.SweetCrustData.resetProducts().map((product, index) => ({
    id: product.id || makeId(`${product.name}-${index}`),
    stock: product.stock ?? 25,
    status: product.status || "active",
    ...product,
  }));
  setSaveState("Catalogue reset");
  syncWithServer();
  renderAll();
});

document.querySelector("[data-order-table]").addEventListener("change", (event) => {
  const orderId = event.target.dataset.orderStatus;
  if (!orderId) return;
  orders = orders.map((order) => order.id === orderId ? { ...order, status: event.target.value } : order);
  writeJson(storage.orders, orders);
  renderAll();
});

document.querySelector("[data-seed-orders]").addEventListener("click", () => {
  orders = seedOrders;
  writeJson(storage.orders, orders);
  renderAll();
});

document.querySelector("[data-enquiry-table]").addEventListener("click", (event) => {
  const enquiryId = event.target.dataset.closeEnquiry;
  if (!enquiryId) return;
  enquiries = enquiries.map((enquiry) => enquiry.id === enquiryId
    ? { ...enquiry, status: enquiry.status === "Closed" ? "Open" : "Closed" }
    : enquiry);
  writeJson(storage.enquiries, enquiries);
  renderAll();
});

document.querySelector("[data-seed-enquiries]").addEventListener("click", () => {
  enquiries = seedEnquiries;
  writeJson(storage.enquiries, enquiries);
  renderAll();
});

document.querySelector("[data-settings-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  settings = {
    storeName: form.elements.storeName.value.trim(),
    phone: form.elements.phone.value.trim(),
    email: form.elements.email.value.trim(),
    deliveryMessage: form.elements.deliveryMessage.value.trim(),
    offer: form.elements.offer.value.trim(),
  };
  writeJson(storage.settings, settings);
});

renderAll();
