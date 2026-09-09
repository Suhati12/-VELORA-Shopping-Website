/* ==========================================================================
   VELORA LUXURY E-COMMERCE CORE APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // State Persistence
  let cart = JSON.parse(localStorage.getItem('velora_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('velora_wishlist')) || [];
  let orders = JSON.parse(localStorage.getItem('velora_orders')) || [];

  let currentView = 'home';
  let activeCategory = 'All';
  let activePrice = 2000;
  let activeSize = 'All';
  let activeColor = 'All';
  let activeSearchQuery = '';
  let activeSort = 'newest';
  let currentShopLayout = 'grid';
  let appliedDiscountRate = 0; // percentage e.g. 0.10 for 10%
  let activeDetailProduct = PRODUCTS[0];
  let checkoutStep = 1;

  // Global Element References
  const views = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const cartBadge = document.getElementById('cart-badge-count');
  const wishlistBadge = document.getElementById('wishlist-badge-count');
  const navbar = document.querySelector('.navbar');

  /* ==========================================================================
     1. INITIALIZATION & ROUTING
     ========================================================================== */
  function init() {
    updateBadges();
    renderHomeComponents();
    renderShopView();
    setupEventListeners();
    handleHashNavigation();
  }

  function handleHashNavigation() {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('product-')) {
      const pId = hash.replace('product-', '');
      navigateToProductDetails(pId);
    } else if (['home', 'shop', 'cart', 'checkout', 'wishlist'].includes(hash)) {
      navigateTo(hash);
    } else {
      navigateTo('home');
    }
  }

  function navigateTo(viewId) {
    currentView = viewId;
    window.location.hash = viewId;

    views.forEach(v => {
      v.classList.remove('active-view');
    });

    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav links
    navLinks.forEach(link => {
      if (link.getAttribute('data-view') === viewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile drawer if open
    closeMobileDrawer();

    // Contextual renders
    if (viewId === 'cart') renderCartView();
    if (viewId === 'wishlist') renderWishlistView();
    if (viewId === 'shop') renderShopView();
  }

  function navigateToProductDetails(productId) {
    const found = PRODUCTS.find(p => p.id === productId);
    if (found) {
      activeDetailProduct = found;
      window.location.hash = `product-${productId}`;
      renderProductDetailsView(found);
      views.forEach(v => v.classList.remove('active-view'));
      document.getElementById('view-product-details').classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     2. HOME PAGE RENDERERS
     ========================================================================== */
  function renderHomeComponents() {
    // New Arrivals (8 Items)
    const newArrivalsGrid = document.getElementById('home-new-arrivals-grid');
    if (newArrivalsGrid) {
      const newProducts = PRODUCTS.slice(0, 8);
      newArrivalsGrid.innerHTML = newProducts.map(product => createProductCardHTML(product)).join('');
    }

    // Trending Now Horizontal Carousel
    const trendingWrapper = document.getElementById('trending-scroll-container');
    if (trendingWrapper) {
      const trendingProducts = PRODUCTS.filter(p => p.isTrending);
      trendingWrapper.innerHTML = trendingProducts.map(product => `
        <div class="trending-card-item">
          ${createProductCardHTML(product)}
        </div>
      `).join('');
    }
  }

  function createProductCardHTML(product) {
    const isSaved = wishlist.includes(product.id);
    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-wrapper" onclick="VeloraApp.navigateToProductDetails('${product.id}')">
          ${product.isNew ? '<span class="product-badge">New Arrival</span>' : ''}
          <img src="${product.images[0]}" alt="${product.name}" class="product-img-main" loading="lazy" />
          <img src="${product.images[1] || product.images[0]}" alt="${product.name}" class="product-img-hover" loading="lazy" />
          <button class="wishlist-btn ${isSaved ? 'active' : ''}" onclick="event.stopPropagation(); VeloraApp.toggleWishlist('${product.id}')" title="Save to Wishlist">
            <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <button class="quick-add-btn" onclick="event.stopPropagation(); VeloraApp.openQuickView('${product.id}')">
            <i class="fa-solid fa-eye"></i> Quick View
          </button>
        </div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-name" onclick="VeloraApp.navigateToProductDetails('${product.id}')" style="cursor:pointer">${product.name}</h3>
          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <span>${product.rating} (${product.reviewsCount})</span>
          </div>
          <div class="product-price-box">
            <span class="product-price">$${product.price}</span>
            ${product.originalPrice > product.price ? `<span class="product-original-price">$${product.originalPrice}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     3. SHOP PAGE & FILTERING LOGIC
     ========================================================================== */
  function renderShopView() {
    const shopGrid = document.getElementById('shop-products-grid');
    if (!shopGrid) return;

    let filtered = PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesPrice = p.price <= activePrice;
      const matchesSize = activeSize === 'All' || (p.sizes && p.sizes.includes(activeSize));
      const matchesColor = activeColor === 'All' || (p.colors && p.colors.some(c => c.name.toLowerCase().includes(activeColor.toLowerCase())));
      const matchesSearch = activeSearchQuery === '' || 
        p.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(activeSearchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesSize && matchesColor && matchesSearch;
    });

    // Sorting
    if (activeSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'popularity') {
      filtered.sort((a, b) => b.rating - a.rating);
    } // default 'newest' maintains array order

    const resultsCount = document.getElementById('shop-results-count');
    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} products`;
    }

    if (filtered.length === 0) {
      shopGrid.innerHTML = `
        <div class="empty-state full-width">
          <i class="fa-solid fa-sliders"></i>
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem">No Products Found</h3>
          <p>Try clearing your active filters or adjusting your price slider.</p>
          <button class="btn-outline" style="margin-top: 1.5rem" onclick="VeloraApp.resetShopFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    shopGrid.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
  }

  function resetShopFilters() {
    activeCategory = 'All';
    activePrice = 2000;
    activeSize = 'All';
    activeColor = 'All';
    activeSearchQuery = '';
    activeSort = 'newest';

    const priceSlider = document.getElementById('price-range-slider');
    if (priceSlider) priceSlider.value = 2000;
    const priceDisplay = document.getElementById('price-range-val');
    if (priceDisplay) priceDisplay.textContent = '$2000';

    document.querySelectorAll('.filter-cat-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.color-swatch').forEach(btn => btn.classList.remove('active'));

    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) searchInput.value = '';

    renderShopView();
  }

  /* ==========================================================================
     4. PRODUCT DETAILS VIEW RENDERER
     ========================================================================== */
  function renderProductDetailsView(product) {
    const detailContainer = document.getElementById('view-product-details');
    if (!detailContainer) return;

    detailContainer.querySelector('.product-meta-name').textContent = product.name;
    detailContainer.querySelector('.product-meta-category').textContent = product.category;
    detailContainer.querySelector('.details-price').textContent = `$${product.price}`;
    
    const origPriceElem = detailContainer.querySelector('.details-original-price');
    if (origPriceElem) {
      origPriceElem.textContent = product.originalPrice > product.price ? `$${product.originalPrice}` : '';
    }

    detailContainer.querySelector('.product-meta-rating').innerHTML = `
      <i class="fa-solid fa-star gold-text"></i> ${product.rating} <span style="color:var(--text-muted)">(${product.reviewsCount} customer reviews)</span>
    `;

    detailContainer.querySelector('.product-meta-description').textContent = product.description;

    // Main Image & Thumbnails
    const mainImg = detailContainer.querySelector('#detail-main-img');
    mainImg.src = product.images[0];

    const thumbsBox = detailContainer.querySelector('#detail-thumbnails');
    thumbsBox.innerHTML = product.images.map((img, idx) => `
      <img src="${img}" class="thumb-img ${idx === 0 ? 'active' : ''}" onclick="VeloraApp.switchDetailMainImage('${img}', this)" alt="Thumbnail" />
    `).join('');

    // Color swatches
    const colorSwatchesBox = detailContainer.querySelector('#detail-color-swatches');
    if (colorSwatchesBox) {
      colorSwatchesBox.innerHTML = product.colors.map((c, i) => `
        <div class="color-swatch ${i === 0 ? 'active' : ''}" style="background-color: ${c.hex}" title="${c.name}" data-color="${c.name}" onclick="VeloraApp.selectDetailColor(this)"></div>
      `).join('');
    }

    // Size selector
    const sizeBox = detailContainer.querySelector('#detail-size-selector');
    if (sizeBox) {
      sizeBox.innerHTML = product.sizes.map((s, i) => `
        <button class="size-btn ${i === 0 ? 'active' : ''}" data-size="${s}" onclick="VeloraApp.selectDetailSize(this)">${s}</button>
      `).join('');
    }

    // Tab contents
    detailContainer.querySelector('#tab-details-content').innerHTML = `
      <ul style="list-style: inside square; line-height: 1.8">
        ${product.details.map(d => `<li>${d}</li>`).join('')}
      </ul>
    `;
    detailContainer.querySelector('#tab-materials-content').textContent = product.materials;
    detailContainer.querySelector('#tab-shipping-content').textContent = product.shipping;

    // Related Products
    const relatedGrid = detailContainer.querySelector('#related-products-grid');
    if (relatedGrid) {
      const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
      relatedGrid.innerHTML = related.map(p => createProductCardHTML(p)).join('');
    }
  }

  /* ==========================================================================
     5. CART STATE & VIEW MANAGEMENT
     ========================================================================== */
  function addToCart(productId, size = null, color = null, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const chosenSize = size || product.sizes[0];
    const chosenColor = color || (product.colors[0] ? product.colors[0].name : 'Standard');

    const existingIndex = cart.findIndex(item => item.id === productId && item.size === chosenSize && item.color === chosenColor);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: productId,
        size: chosenSize,
        color: chosenColor,
        quantity: qty
      });
    }

    saveCart();
    updateBadges();
    showToast(`Added ${product.name} to Cart`, 'fa-bag-shopping');

    if (currentView === 'cart') renderCartView();
  }

  function updateCartQuantity(index, newQty) {
    if (newQty <= 0) {
      removeFromCart(index);
    } else {
      cart[index].quantity = newQty;
      saveCart();
      renderCartView();
      updateBadges();
    }
  }

  function removeFromCart(index) {
    const item = cart[index];
    const product = PRODUCTS.find(p => p.id === item.id);
    cart.splice(index, 1);
    saveCart();
    renderCartView();
    updateBadges();
    showToast(`Removed ${product ? product.name : 'Item'} from Cart`, 'fa-trash');
  }

  function saveCart() {
    localStorage.setItem('velora_cart', JSON.stringify(cart));
  }

  function renderCartView() {
    const cartContainer = document.getElementById('view-cart');
    if (!cartContainer) return;

    const tbody = cartContainer.querySelector('#cart-table-body');
    const emptyState = cartContainer.querySelector('#cart-empty-state');
    const cartContent = cartContainer.querySelector('#cart-content-wrapper');

    if (cart.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (cartContent) cartContent.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (cartContent) cartContent.style.display = 'grid';

    let subtotal = 0;

    tbody.innerHTML = cart.map((item, idx) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return '';
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      return `
        <tr>
          <td>
            <div class="cart-item-flex">
              <img src="${product.images[0]}" alt="${product.name}" class="cart-item-img" />
              <div>
                <h4 style="font-size: 1rem; margin-bottom: 0.3rem">${product.name}</h4>
                <p style="font-size: 0.8rem">Size: ${item.size} | Color: ${item.color}</p>
              </div>
            </div>
          </td>
          <td>$${product.price}</td>
          <td>
            <div class="quantity-picker">
              <button class="qty-btn" onclick="VeloraApp.updateCartQuantity(${idx}, ${item.quantity - 1})">-</button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly />
              <button class="qty-btn" onclick="VeloraApp.updateCartQuantity(${idx}, ${item.quantity + 1})">+</button>
            </div>
          </td>
          <td style="color:var(--accent-gold); font-weight:600">$${itemTotal}</td>
          <td style="text-align: right">
            <button class="icon-btn" onclick="VeloraApp.removeFromCart(${idx})" title="Remove">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Summary calculations
    const discountAmount = subtotal * appliedDiscountRate;
    const shipping = subtotal > 300 || subtotal === 0 ? 0 : 35;
    const grandTotal = subtotal - discountAmount + shipping;

    cartContainer.querySelector('#cart-subtotal-val').textContent = `$${subtotal.toFixed(2)}`;
    cartContainer.querySelector('#cart-discount-val').textContent = `-$${discountAmount.toFixed(2)}`;
    cartContainer.querySelector('#cart-shipping-val').textContent = shipping === 0 ? 'FREE' : `$${shipping}`;
    cartContainer.querySelector('#cart-total-val').textContent = `$${grandTotal.toFixed(2)}`;
  }

  function applyPromoCode() {
    const promoInput = document.getElementById('promo-code-input');
    if (!promoInput) return;
    const code = promoInput.value.trim().toUpperCase();

    if (code === 'VELORA10') {
      appliedDiscountRate = 0.10;
      showToast('Promo Code VELORA10 applied (10% OFF)', 'fa-tag');
    } else if (code === 'LUXE20') {
      appliedDiscountRate = 0.20;
      showToast('VIP Promo Code LUXE20 applied (20% OFF)', 'fa-crown');
    } else {
      showToast('Invalid Promo Code. Try VELORA10', 'fa-circle-exclamation');
      appliedDiscountRate = 0;
    }
    renderCartView();
  }

  /* ==========================================================================
     6. WISHLIST MANAGEMENT
     ========================================================================== */
  function toggleWishlist(productId) {
    const idx = wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);

    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast(`Removed ${product ? product.name : 'Item'} from Wishlist`, 'fa-heart-crack');
    } else {
      wishlist.push(productId);
      showToast(`Saved ${product ? product.name : 'Item'} to Wishlist`, 'fa-heart');
    }

    localStorage.setItem('velora_wishlist', JSON.stringify(wishlist));
    updateBadges();

    // Refresh active views if wishlist updated
    if (currentView === 'wishlist') renderWishlistView();
    if (currentView === 'home') renderHomeComponents();
    if (currentView === 'shop') renderShopView();
  }

  function renderWishlistView() {
    const container = document.getElementById('view-wishlist');
    if (!container) return;

    const grid = container.querySelector('#wishlist-products-grid');
    const emptyState = container.querySelector('#wishlist-empty-state');

    if (wishlist.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (grid) grid.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (grid) grid.style.display = 'grid';

    const savedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));
    grid.innerHTML = savedProducts.map(p => `
      <div class="product-card">
        <div class="product-img-wrapper">
          <img src="${p.images[0]}" alt="${p.name}" class="product-img-main" />
          <button class="wishlist-btn active" onclick="VeloraApp.toggleWishlist('${p.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        <div class="product-info">
          <div class="product-category">${p.category}</div>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-price-box" style="margin-bottom: 1rem">
            <span class="product-price">$${p.price}</span>
          </div>
          <button class="btn-primary" style="width:100%; padding:0.7rem; font-size:0.75rem" onclick="VeloraApp.addToCart('${p.id}')">
            <i class="fa-solid fa-bag-shopping"></i> Move to Cart
          </button>
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     7. MULTI-STEP CHECKOUT & ORDER CONFIRMATION
     ========================================================================== */
  function setCheckoutStep(step) {
    checkoutStep = step;
    document.querySelectorAll('.checkout-step-item').forEach((item, idx) => {
      if (idx + 1 === step) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    document.querySelectorAll('.checkout-panel-step').forEach((panel, idx) => {
      if (idx + 1 === step) {
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
    });

    if (step === 3) renderOrderReviewStep();
  }

  function renderOrderReviewStep() {
    const reviewBox = document.getElementById('checkout-review-summary');
    if (!reviewBox) return;

    let subtotal = 0;
    cart.forEach(item => {
      const p = PRODUCTS.find(x => x.id === item.id);
      if (p) subtotal += p.price * item.quantity;
    });

    const discount = subtotal * appliedDiscountRate;
    const shipping = subtotal > 300 ? 0 : 35;
    const grandTotal = subtotal - discount + shipping;

    reviewBox.innerHTML = `
      <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1rem">
        <h4 style="color:var(--accent-gold); margin-bottom: 0.5rem">Order Items (${cart.length})</h4>
        ${cart.map(item => {
          const p = PRODUCTS.find(x => x.id === item.id);
          return `<div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.3rem">
            <span>${p.name} x ${item.quantity} (${item.size})</span>
            <span>$${p.price * item.quantity}</span>
          </div>`;
        }).join('')}
      </div>
      <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="summary-row"><span>Discount</span><span>-$${discount.toFixed(2)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : `$${shipping}`}</span></div>
      <div class="summary-row total-row"><span>Total</span><span>$${grandTotal.toFixed(2)}</span></div>
    `;
  }

  function placeOrder(e) {
    if (e) e.preventDefault();

    if (cart.length === 0) {
      showToast('Your cart is empty', 'fa-triangle-exclamation');
      return;
    }

    const orderNum = 'VEL-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId: orderNum,
      items: [...cart],
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    orders.push(newOrder);
    localStorage.setItem('velora_orders', JSON.stringify(orders));

    // Clear Cart
    cart = [];
    saveCart();
    updateBadges();

    // Show Confirmation Modal
    const modal = document.getElementById('order-confirmation-modal');
    if (modal) {
      modal.querySelector('#confirmed-order-number').textContent = orderNum;
      modal.classList.add('active');
    }
  }

  /* ==========================================================================
     8. QUICK VIEW MODAL
     ========================================================================== */
  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    modal.querySelector('#qv-img').src = product.images[0];
    modal.querySelector('#qv-title').textContent = product.name;
    modal.querySelector('#qv-category').textContent = product.category;
    modal.querySelector('#qv-price').textContent = `$${product.price}`;
    modal.querySelector('#qv-desc').textContent = product.description;

    const addBtn = modal.querySelector('#qv-add-btn');
    addBtn.onclick = () => {
      addToCart(product.id);
      closeModal('quick-view-modal');
    };

    modal.classList.add('active');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  /* ==========================================================================
     9. TOAST NOTIFICATIONS & BADGES
     ========================================================================== */
  function showToast(message, iconClass = 'fa-check') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid ${iconClass} gold-text"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function updateBadges() {
    const totalCartItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    if (cartBadge) cartBadge.textContent = totalCartItems;
    if (wishlistBadge) wishlistBadge.textContent = wishlist.length;
  }

  function closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }

  /* ==========================================================================
     10. EVENT LISTENERS
     ========================================================================== */
  function setupEventListeners() {
    // Navigation Clicks
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const v = link.getAttribute('data-view');
        navigateTo(v);
      });
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const v = link.getAttribute('data-view');
        navigateTo(v);
      });
    });

    // Mobile Hamburger Toggle
    const hamburger = document.getElementById('hamburger-btn');
    const drawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose = document.getElementById('drawer-close-btn');

    if (hamburger && drawer && drawerOverlay) {
      hamburger.addEventListener('click', () => {
        drawer.classList.add('active');
        drawerOverlay.classList.add('active');
      });
      drawerOverlay.addEventListener('click', closeMobileDrawer);
      if (drawerClose) drawerClose.addEventListener('click', closeMobileDrawer);
    }

    // Scroll Navbar Effect & Back to Top
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      if (backToTop) {
        if (window.scrollY > 400) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Shop Filters
    const categoryBtns = document.querySelectorAll('.filter-cat-btn');
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-cat');
        renderShopView();
      });
    });

    const priceSlider = document.getElementById('price-range-slider');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        activePrice = parseFloat(e.target.value);
        document.getElementById('price-range-val').textContent = `$${activePrice}`;
        renderShopView();
      });
    }

    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        activeSort = e.target.value;
        renderShopView();
      });
    }

    const shopSearchInput = document.getElementById('shop-search-input');
    if (shopSearchInput) {
      shopSearchInput.addEventListener('input', (e) => {
        activeSearchQuery = e.target.value.trim();
        renderShopView();
      });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input && input.value) {
          showToast('Thank you for subscribing to Velora.', 'fa-paper-plane');
          input.value = '';
        }
      });
    }
  }

  // Expose methods globally for inline onclick handlers
  window.VeloraApp = {
    navigateTo,
    navigateToProductDetails,
    toggleWishlist,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    openQuickView,
    closeModal,
    applyPromoCode,
    setCheckoutStep,
    placeOrder,
    resetShopFilters,
    switchDetailMainImage: (imgUrl, elem) => {
      document.getElementById('detail-main-img').src = imgUrl;
      document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
      elem.classList.add('active');
    },
    selectDetailColor: (elem) => {
      document.querySelectorAll('#detail-color-swatches .color-swatch').forEach(c => c.classList.remove('active'));
      elem.classList.add('active');
    },
    selectDetailSize: (elem) => {
      document.querySelectorAll('#detail-size-selector .size-btn').forEach(s => s.classList.remove('active'));
      elem.classList.add('active');
    },
    addToCartFromDetail: () => {
      const sizeElem = document.querySelector('#detail-size-selector .size-btn.active');
      const colorElem = document.querySelector('#detail-color-swatches .color-swatch.active');
      const qtyElem = document.querySelector('#detail-qty-input');

      const size = sizeElem ? sizeElem.getAttribute('data-size') : null;
      const color = colorElem ? colorElem.getAttribute('data-color') : null;
      const qty = qtyElem ? parseInt(qtyElem.value) || 1 : 1;

      addToCart(activeDetailProduct.id, size, color, qty);
    },
    buyNowFromDetail: () => {
      VeloraApp.addToCartFromDetail();
      navigateTo('cart');
    }
  };

  // Launch App
  init();
});
