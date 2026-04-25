const products = [
  {
    name: "German Chocolate Cake",
    price: 600,
    rating: 4.8,
    category: "birthday",
    tags: ["birthday", "chocolate", "featured"],
    image: "https://images.unsplash.com/photo-1605807646983-377bc5a76493?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Mango Real Fruit Cake",
    price: 500,
    rating: 4.8,
    category: "birthday",
    tags: ["birthday", "fruit", "mango", "featured"],
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Premium Black Forest Cake",
    price: 500,
    rating: 4.8,
    category: "birthday",
    tags: ["birthday", "chocolate"],
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Premium Pineapple Cake",
    price: 450,
    rating: 4.8,
    category: "birthday",
    tags: ["birthday", "pineapple"],
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Alphanso Mango Cake",
    price: 425,
    rating: 4.8,
    category: "birthday",
    tags: ["birthday", "mango", "featured"],
    image: "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "White Forest Cake",
    price: 575,
    rating: 4.8,
    category: "birthday",
    tags: ["birthday"],
    image: "https://images.unsplash.com/photo-1616690710400-a16d146927c5?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Death By Chocolate Eggless Cake",
    price: 650,
    rating: 4.8,
    category: "express",
    tags: ["express", "eggless", "chocolate"],
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Caramel Fiesta Cake",
    price: 525,
    rating: 4.8,
    category: "express",
    tags: ["express", "caramel", "featured"],
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Red Velvet Cake",
    price: 700,
    rating: 4.8,
    category: "express",
    tags: ["express", "red velvet"],
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Vancho Vanilla Chocolate Cake",
    price: 600,
    rating: 4.8,
    category: "express",
    tags: ["express", "chocolate"],
    image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Mango Milk Cake",
    price: 150,
    rating: 4.8,
    category: "desserts",
    tags: ["desserts", "mango"],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Mango Bavarian Mousse",
    price: 125,
    rating: 4.8,
    category: "desserts",
    tags: ["desserts", "mango"],
    image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Nutella Cheese Cake",
    price: 150,
    rating: 4.8,
    category: "desserts",
    tags: ["desserts", "cheesecake", "chocolate"],
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Baked Blueberry Cheese Cake",
    price: 175,
    rating: 4.8,
    category: "desserts",
    tags: ["desserts", "blueberry"],
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Chocolate Photo Cake",
    price: 1000,
    rating: 4.8,
    category: "photo",
    tags: ["photo", "chocolate", "custom"],
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Anniversary Photo Cake",
    price: 1000,
    rating: 4.8,
    category: "photo",
    tags: ["photo", "occasion", "custom"],
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Blueberry Special Designer Cake",
    price: 1450,
    rating: 4.8,
    category: "designer",
    tags: ["designer", "blueberry", "custom"],
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Wedding Engagement Cake",
    price: 2200,
    rating: 4.8,
    category: "wedding",
    tags: ["wedding", "occasion", "featured"],
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Valentines Heart Shape Cake",
    price: 900,
    rating: 4.8,
    category: "occasion",
    tags: ["occasion", "valentines", "heart", "red velvet"],
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Diwali Celebration Cake",
    price: 850,
    rating: 4.8,
    category: "occasion",
    tags: ["occasion", "diwali", "festival", "premium"],
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Rakhi Chocolate Cake",
    price: 700,
    rating: 4.8,
    category: "occasion",
    tags: ["occasion", "rakhi", "chocolate"],
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "1st Birthday Rainbow Cake",
    price: 1450,
    rating: 4.8,
    category: "designer",
    tags: ["designer", "1st birthday", "birthday", "custom"],
    image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "3D Car Theme Cake",
    price: 1800,
    rating: 4.8,
    category: "designer",
    tags: ["designer", "3d", "car", "custom"],
    image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Cartoon Photo Cake",
    price: 1100,
    rating: 4.8,
    category: "photo",
    tags: ["photo", "cartoon", "kids", "custom"],
    image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Party In A Box",
    price: 1299,
    rating: 4.8,
    category: "snacks",
    tags: ["snacks", "party", "bulk", "corporate"],
    image: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Chocochip Cupcake",
    price: 35,
    rating: 4.8,
    category: "snacks",
    tags: ["snacks", "chocolate"],
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Coffee Bean Milk Chocolate",
    price: 175,
    rating: 4.8,
    category: "snacks",
    tags: ["snacks", "coffee", "chocolate"],
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=640&q=85",
  },
];

const productStorageKey = "sweetcrust-products";

function loadProducts() {
  try {
    const savedProducts = JSON.parse(localStorage.getItem(productStorageKey));
    if (Array.isArray(savedProducts) && savedProducts.length) return savedProducts;
  } catch (error) {
    localStorage.removeItem(productStorageKey);
  }
  return products;
}

function saveProducts(nextProducts) {
  localStorage.setItem(productStorageKey, JSON.stringify(nextProducts));
}

function resetProducts() {
  localStorage.removeItem(productStorageKey);
  return products;
}

let activeProducts = loadProducts();

async function syncWithServer() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    if (data.catalog && Array.isArray(data.catalog) && data.catalog.length) {
      activeProducts = data.catalog;
      document.querySelectorAll("[data-products]").forEach((grid) => renderGrid(grid));
    }
    if (data.settings) {
      if (data.settings.storeName) {
        document.querySelectorAll(".brand span:first-child").forEach(el => el.textContent = data.settings.storeName.split(' ')[0]);
        document.querySelectorAll(".brand span:last-child").forEach(el => {
           if(el.parentElement.classList.contains('brand')) el.textContent = data.settings.storeName.split(' ').slice(1).join(' ');
        });
      }
      if (data.settings.offer) {
        document.querySelectorAll(".top-strip").forEach(el => el.textContent = data.settings.offer);
      }
    }
  } catch (error) {
    console.error("Error fetching data from server:", error);
  }
}

syncWithServer();

window.SweetCrustData = {
  productStorageKey,
  defaultProducts: products,
  getProducts: loadProducts,
  saveProducts,
  resetProducts,
};

const formatPrice = (price) => `Rs ${price.toLocaleString("en-IN")}`;

function productCard(product) {
  return `
    <a class="product-card" href="product-detail.html">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <span>Free Delivery</span>
      </div>
      <div>
        <small>${product.category.replace("-", " ")}</small>
        <h3>${product.name}</h3>
        <p><strong>${formatPrice(product.price)}</strong><span>${product.rating} star</span></p>
      </div>
    </a>
  `;
}

function matchesProduct(product, category, search) {
  const inCategory = category === "all" || product.category === category || product.tags.includes(category);
  const haystack = `${product.name} ${product.category} ${product.tags.join(" ")}`.toLowerCase();
  return inCategory && (!search || haystack.includes(search.toLowerCase()));
}

function renderGrid(grid, categoryOverride) {
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = categoryOverride || params.get("category") || grid.dataset.category || "all";
  const requestedSearch = params.get("search") || "";
  const onlyFeatured = grid.dataset.featured === "true";
  const limit = Number(grid.dataset.limit || activeProducts.length);
  const items = activeProducts
    .filter((product) => (onlyFeatured ? product.tags.includes("featured") : true))
    .filter((product) => matchesProduct(product, requestedCategory, requestedSearch))
    .slice(0, limit);

  grid.innerHTML = items.map(productCard).join("");

  const resultCount = document.querySelector("[data-result-count]");
  if (resultCount) {
    const label = requestedSearch ? `Results for "${requestedSearch}"` : `${items.length} fresh selections`;
    resultCount.textContent = label;
  }
}

document.querySelectorAll("[data-products]").forEach((grid) => renderGrid(grid));

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const grid = document.querySelector(".catalog[data-products]");
    if (grid) renderGrid(grid, button.dataset.filter);
  });
});

const params = new URLSearchParams(window.location.search);
const activeCategory = params.get("category");
if (activeCategory) {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === activeCategory);
  });
}

document.querySelectorAll(".search-box input").forEach((searchInput) => {
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchInput.value.trim()) {
      window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value.trim())}`;
    }
  });
});

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (button) button.textContent = "Message Sent";
  });
});
