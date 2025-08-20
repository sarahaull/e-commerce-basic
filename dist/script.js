// 🟨Menyimpan semua produk
let allProducts = [];

// 🟧Mengecek halaman  landing page home
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}
function isLandingPage() {
    return document.body.classList.contains('landing-page');
}
function isCartPage() {
    return document.body.classList.contains('cart-page');
}

// 🟦Mengambil produk dari API
async function fetchProducts() {
    try {
        // 🟦 W
        const response = await fetch('https://dummyjson.com/products?limit=0');
        const data = await response.json();
        
        // 🟨hasil dari data.products
        
        allProducts = data.products;
        
        // 🟧tampilkan ke HTML
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function formatPrice(price) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// 🟩 Tambah produk ke keranjang
function addToCart(product) {
    // 🟨 
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // 🟩 Constructor Function Produk + quantity
    cartItems.push({ ...product, quantity: 1 });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// 🟧Menampilkan produk
function displayProducts(products = []) {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;

    productsList.innerHTML = '';

    // 🟨 Loop setiap produk
    products.forEach(product => {
        // 🟧 Buat elemen kartu produk
        const card = document.createElement('div');
        card.className = 'product-card flex-shrink-0 w-72 bg-[#EEC3CC] rounded-2xl p-6 shadow-sm cursor-pointer';

        card.innerHTML = `
            <div class="flex flex-col items-center text-center relative">
                <div class="absolute -top-3 right-2 flex items-center space-x-1 bg-[#3f0000] px-2 py-1 rounded-lg shadow">
                    <span class="">⭐</span>
                    <span class="font-medium text-white text-sm">${product.rating}</span>
                </div>
                <div class="w-40 h-40 mb-4 overflow-hidden rounded-lg">
                    <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-full object-cover product-image">
                </div>
                <h3 class="font-semibold text-lg text-gray-800 mb-1">${product.title}</h3>
                <p class="text-gray-500 text-sm mb-3">${product.category}</p>
                <div class="flex items-center justify-between w-full">
                    <span class="font-bold text-lg text-gray-800">${formatPrice(product.price)}</span>
                    <button class="bg-[#E195AB] hover:bg-pink-600 text-white p-2 rounded-full transition-colors duration-200" title="Add to Cart">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0v-2m9 2v-2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // 🟧 Klik ke halaman detail
        const clickable = card.querySelectorAll('img.product-image, h3');
        clickable.forEach(el => {
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => {
                if (isLandingPage() && !isUserLoggedIn()) {
                    alert('⚠️Anda harus login terlebih dahulu.');
                    return;
                }

                // 🟩 
                localStorage.setItem('selectedProduct', JSON.stringify(product));
                window.location.href = 'produk.html';
            });
        });

        // 🟧 Klik tambah ke keranjang
        const addToCartBtn = card.querySelector('button');
        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (isLandingPage() && !isUserLoggedIn()) {
                alert('⚠️Login terlebih dahulu untuk menambahkan ke keranjang.');
            } else {
                addToCart(product);
                alert('✅Produk ditambahkan ke keranjang.');
            }
        });

        productsList.appendChild(card);
    });
}

// 🟧Scroll produk
function setupScrolling() {
    const container = document.getElementById('productsContainer');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (container && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            container.scrollBy({ left: -300, behavior: 'smooth' });
        });
        scrollRightBtn.addEventListener('click', () => {
            container.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
}

// 🟧 Menampilkan keranjang
function displayCartItems() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;

    // 🟨 
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-gray-500">Keranjang Anda kosong.</p>';
        return;
    }

    // 🟨 Loop cart
    cartItems.forEach(item => {
        // 🟧 
        const div = document.createElement('div');
        div.className = 'flex items-center gap-4 p-4 border-b';
        div.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" class="w-20 h-20 object-cover rounded">
            <div>
                <h3 class="font-semibold text-lg">${item.title}</h3>
                <p class="text-sm text-gray-600">${item.category}</p>
                <p class="font-bold">${formatPrice(item.price)}</p>
            </div>
        `;
        cartContainer.appendChild(div);
    });
}

// 🟧 Saat halaman dimuat search
document.addEventListener('DOMContentLoaded', () => {
    if (isCartPage()) {
        displayCartItems();
    } else {
        fetchProducts(); // 🟦
        setupScrolling();

        const searchInput = document.querySelector('input[placeholder="Search"]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const keyword = e.target.value.toLowerCase();

                // 🟨 filter
                const filteredProducts = allProducts.filter(p =>
                    p.title.toLowerCase().includes(keyword)
                );

                displayProducts(filteredProducts);
            });
        }
    }
});






// Saran Produk
// 🟧 Ambil elemen container dari HTML
const container = document.getElementById("product-container");

// 🟦 Ambil data produk dari API
fetch("https://dummyjson.com/products?limit=0")
  .then((res) => res.json()) // 🟦 Pubah response ke JSON
  .then((data) => {
    // 🟨 Filter dan ambil 28 produk dengan rating tinggi
    const highRated = data.products
      .filter((product) => product.rating >= 4.5)
      .slice(0, 28);

    // 🟨   Loop setiap produk yang lolos filter
    highRated.forEach((product) => {
      // Format harga
      const formattedPrice = product.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      // 🟧 Buat elemen kartu produk
      const card = document.createElement("div");
      card.className =
        "bg-[#e9b8c6] rounded-xl p-4 flex flex-col justify-between relative";

      // 🟧 Isi HTML dari kartu produk
      card.innerHTML = `
        <div class="relative mb-3 flex justify-center">
          <img src="${product.thumbnail}" alt="${product.title}"
            class="product-image w-28 h-28 object-cover rounded-lg cursor-pointer" />
          <div class="absolute -top-2 right-1 bg-[#3f0000] text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow">
            ⭐ <span>${product.rating}</span>
          </div>
        </div>
        <h2 class="text-sm font-semibold text-center text-white leading-tight mb-1">
          ${product.title}
        </h2>
        <p class="text-center text-white text-sm font-medium mb-8">
          ${formattedPrice}
        </p>
        <button class="cart-btn absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-pink-300 transition">
          🛒
        </button>
      `;

      // 🟧 Event klik gambar produk → simpan produk ke localStorage
      card.querySelector(".product-image").addEventListener("click", () => {
        // 🟩 Simpan data produk yang diklik
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "produk.html";
      });

      // 🟧 Event klik tombol keranjang
      card.querySelector(".cart-btn").addEventListener("click", () => {
        // 🟨 Ambil isi keranjang dari localStorage
        let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

        // 🟩 Cek apakah produk sudah ada di keranjang
        const existingIndex = cart.findIndex((item) => item.id === product.id);

        if (existingIndex !== -1) {
          cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
        } else {
          // 🟩 Tambah produk baru ke keranjang
          const productToAdd = { ...product, quantity: 1 };
          cart.push(productToAdd); // 🟨 ARRAY - Tambahkan object ke array
        }

        // 🟨  🟩 - Simpan array berisi object ke localStorage
        localStorage.setItem("cartItems", JSON.stringify(cart));

        // 🟧  Tampilkan alert dan pindah halaman
        alert(`Produk "${product.title}" berhasil dimasukkan ke keranjang!`);
        window.location.href = "ker.html";
      });

      // 🟧 Tambahkan kartu ke container
      container.appendChild(card);
    });
  })
  .catch((err) => {
    console.error("Gagal memuat produk:", err);
    // 🟧 Tampilkan pesan error ke pengguna
    container.innerHTML = `<p class="text-center text-red-500 col-span-full">Gagal memuat produk.</p>`;
  });







// ===== DETAIL PRODUK =====

// 🟩 Fungsi untuk generate bintang rating
function generateStars(rating) {
    const fullStars = Math.floor(rating); 
    const hasHalfStar = rating % 1 !== 0; 
    let starsHtml = ''; 

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<span class="text-yellow-400 text-xl">★</span>';
        } else if (i === fullStars && hasHalfStar) {
            starsHtml += '<span class="text-yellow-300 text-xl">☆</span>';
        } else {
            starsHtml += '<span class="text-gray-300 text-xl">★</span>';
        }
    }
    return starsHtml; 
}

// 🟩  Format harga ke Rupiah Indonesia
function formatPrice(price) {
    return `Rp ${(price * 15000).toLocaleString('id-ID')}`; 
}

function formatCartPrice(price, qty) {
    return `Rp ${((price * qty) * 15000).toLocaleString('id-ID')}`;
}

function showProductDetail() {
    // 🟩 
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    // 🟧 Manipulation
    const detailContainer = document.getElementById('productDetail');

    if (!selectedProduct) {
        detailContainer.innerHTML = '<p class="text-center text-gray-500 text-lg">Produk tidak ditemukan.</p>'; 
        return;
    }

    // 🟧 Manipulation - Tampilkan data produk ke HTML
    detailContainer.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6">
            <img src="${selectedProduct.thumbnail}" alt="${selectedProduct.title}" class="rounded-lg object-cover md:w-1/3 w-full max-h-96 bg-[#A35167]">
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-white mb-3">${selectedProduct.title}</h1>
                    <p class="text-gray-700 mb-3">${selectedProduct.description}</p>
                    <p class="text-sm text-gray-500 mb-1">
                        <strong>Kategori:</strong> 
                        <a href="blub.html?kategori=${encodeURIComponent(selectedProduct.category)}" class="text-pink-600 hover:underline">
                            ${selectedProduct.category}
                        </a>
                    </p>
                    <p class="text-sm text-gray-500 mb-1"><strong>Brand:</strong> ${selectedProduct.brand}</p>
                    <div class="flex items-center mb-4">${generateStars(selectedProduct.rating)}</div>
                    <p class="text-2xl font-extrabold text-pink-600">${formatPrice(selectedProduct.price)}</p>
                    <div class="flex items-center mt-4 gap-4">
                        <button id="decreaseQty" class="bg-[#D9D9D9] text-white hover:bg-gray-400 px-3 py-1 rounded">-</button>
                        <span id="qtyCount" class="text-lg text-white font-bold">1</span>
                        <button id="increaseQty" class="bg-[#D9D9D9] text-white hover:bg-gray-400 px-3 py-1 rounded">+</button>
                    </div>
                    <button id="addToCartBtn" class="mt-6 px-6 py-2 text-white rounded-lg hover:bg-pink-800 transition" style="background-color: #CC7C92;">
                        Add to Cart
                    </button>
                    <a href="#" id="buyNowBtn" class="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition" style="background-color: #B03052;">
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    `;

    // 🟩
    let quantity = 1;

    // 🟧 Manipulation
    const qtyDisplay = document.getElementById('qtyCount');
    const btnIncrease = document.getElementById('increaseQty');
    const btnDecrease = document.getElementById('decreaseQty');

    // 🟧 Manipulation - Event
    btnIncrease.addEventListener('click', () => {
        quantity++; 
        qtyDisplay.textContent = quantity; 
    });

    btnDecrease.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            qtyDisplay.textContent = quantity; 
        }
    });

    // 🟧 Manipulation - Tombol Add to Cart
    const btnAdd = document.getElementById('addToCartBtn');
    btnAdd.addEventListener('click', () => {
        // 🟨 Array dari localStorage
        let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

        // 🔍 Cari apakah produk sudah ada
        const existingIndex = cart.findIndex(p => p.id === selectedProduct.id);

        if (existingIndex >= 0) {
            cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity; // 🟩 Object update
        } else {
            cart.push({ ...selectedProduct, quantity }); 
        }

        localStorage.setItem('cartItems', JSON.stringify(cart)); 

        // 🟧 Alert (String)
        alert(`✅ Produk "${selectedProduct.title}" berhasil ditambahkan sebanyak ${quantity} ke keranjang!`);
        window.location.href = 'ker.html'; // 🟧 Navigasi
    });

    // 🟧 Manipulation - Tombol Buy Now
    const btnBuyNow = document.getElementById('buyNowBtn');
    btnBuyNow.addEventListener('click', (e) => {
        e.preventDefault();

        // 🟨 
        const checkoutItem = [{ ...selectedProduct, quantity, selected: true }];
        localStorage.setItem('checkoutItems', JSON.stringify(checkoutItem)); 

        // 🟧 Navigasi ke halaman checkout
        window.location.href = 'chekout.html';
    });
}

// 🟧 Event Listener saat sudah siap
document.addEventListener('DOMContentLoaded', () => {
    showProductDetail(); // 
});









// Fungsi render keranjang
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cartContainer');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotalEl = document.getElementById('cartTotal');
    const totalItemsEl = document.getElementById('totalItems');

    if (!cartContainer || !cartFooter) return;

    // Kosongkan keranjang jika tidak ada item
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-gray-500">Keranjang kosong.</p>';
        cartFooter.innerHTML = '';
        if (cartTotalEl) cartTotalEl.textContent = 'Rp 0';
        if (totalItemsEl) totalItemsEl.textContent = '0';
        return;
    }

    // Simpan status checkbox sebelum render ulang
    const checkboxStates = {};
    document.querySelectorAll('.product-checkbox').forEach(checkbox => {
        checkboxStates[checkbox.dataset.index] = checkbox.checked;
    });

    cartContainer.innerHTML = '';

    // Render setiap produk di keranjang
    cart.forEach((product, index) => {
        const quantity = product.quantity || 1;
        const subtotal = product.price * quantity;

        const productDiv = document.createElement('div');
        productDiv.className = 'flex items-center gap-4 border-b border-gray-200 py-4';

        productDiv.innerHTML = `
            <div class="flex items-center gap-4">
                <input type="checkbox" class="product-checkbox" data-index="${index}" />
                <img src="${product.thumbnail}" alt="${product.title}" class="bg-[#FFDBDB] w-20 h-20 object-cover rounded-lg" />
            </div>
            <div class="flex-1">
                <h3 class="font-semibold text-lg text-gray-800">${product.title}</h3>
                <p class="text-gray-500">${product.category}</p>
                <p class="font-bold text-pink-700">${formatPrice(subtotal)}</p>
            </div>
            <div class="flex items-center gap-2">
                <button class="quantity-btn bg-[#E195AB] hover:bg-gray-400 px-2 rounded" data-action="decrease" data-index="${index}">-</button>
                <span class="w-6 text-center">${quantity}</span>
                <button class="quantity-btn bg-[#E195AB] hover:bg-gray-400 px-2 rounded" data-action="increase" data-index="${index}">+</button>
            </div>
            <button class="remove-btn text-white hover:text-white ml-4 px-3 py-1 rounded bg-[#E195AB] hover:bg-[#D76C82]" data-index="${index}" title="Hapus Produk">Delete</button>
        `;

        cartContainer.appendChild(productDiv);
    });

    cartFooter.innerHTML = `
        <div class="flex items-center justify-between pt-4">
            <div class="flex items-center gap-2">
                <input type="checkbox" id="selectAll" class="checkbox-all" />
                <label for="selectAll" class="text-gray-600">Select All</label>
                <button id="deleteAllBtn" class="text-[#3D0301] hover:text-white underline ml-4">Delete</button>
            </div>
        </div>
    `;

    // Restore checkbox status setelah render ulang
    document.querySelectorAll('.product-checkbox').forEach(checkbox => {
        const index = checkbox.dataset.index;
        checkbox.checked = checkboxStates[index] || false;
    });

    setupCartButtons();
    setupSelectAllCheckbox();
    setupDeleteAllButton();
    updateTotalSelected(); // Update total keranjang
}

// Tombol tambah/kurang jumlah produk
function setupCartButtons() {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index, 10);

            if (button.dataset.action === 'increase') {
                cart[index].quantity = (cart[index].quantity || 1) + 1;
            } else if (button.dataset.action === 'decrease') {
                cart[index].quantity = Math.max(1, (cart[index].quantity || 1) - 1);
            }

            localStorage.setItem('cartItems', JSON.stringify(cart));
            renderCart();
        });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', () => {
            const confirmDelete = confirm("Anda yakin ingin menghapus produk ini?");
            if (confirmDelete) {
                const index = parseInt(button.dataset.index, 10);
                cart.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cart));
                renderCart();
            }
        });
    });
}

// Fungsi hapus semua produk yang dipilih
function setupDeleteAllButton() {
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    if (!deleteAllBtn) return;

    deleteAllBtn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.product-checkbox');
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

        const selectedIndexes = [];
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedIndexes.push(index);
            }
        });

        if (selectedIndexes.length === 0) {
            alert("⚠️ Pilih dulu produk yang ingin dihapus.");
            return;
        }

        const confirmDelete = confirm(`Yakin ingin menghapus ${selectedIndexes.length} produk dari keranjang?`);
        if (confirmDelete) {
            selectedIndexes.sort((a, b) => b - a).forEach(index => {
                cart.splice(index, 1);
            });

            localStorage.setItem('cartItems', JSON.stringify(cart));
            renderCart();
        }
    });
}

// Fungsi untuk checkbox semua produk
function setupSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const productCheckboxes = document.querySelectorAll('.product-checkbox');
    if (!selectAllCheckbox) return;

    selectAllCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        productCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        updateTotalSelected();
    });

    productCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(productCheckboxes).every(cb => cb.checked);
            selectAllCheckbox.checked = allChecked;
            updateTotalSelected();
        });
    });
}

// Fungsi untuk total keranjang
function updateTotalSelected() {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productCheckboxes = document.querySelectorAll('.product-checkbox');
    const cartTotalEl = document.getElementById('cartTotal');
    const totalItemsEl = document.getElementById('totalItems');

    let totalPrice = 0;
    let totalCount = 0;

    productCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const index = parseInt(checkbox.dataset.index, 10);
            const product = cart[index];
            const quantity = product.quantity || 1;

            const price = parseFloat(product.price);
            totalPrice += price * quantity;
            totalCount += quantity;
        }
    });

    if (cartTotalEl) cartTotalEl.textContent = formatPrice(totalPrice);
    if (totalItemsEl) totalItemsEl.textContent = totalCount;
}

// Fungsi format harga
function formatPrice(price) {
    return 'Rp ' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Jalankan saat halaman dimuat
renderCart();







// ===== Alert keranjang =====
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productDetail')) {
        showProductDetail();
    } else if (document.getElementById('cartContainer')) {
        renderCart();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkoutButton');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
            const selectedProducts = [];

            document.querySelectorAll('.product-checkbox').forEach((checkbox) => {
                if (checkbox.checked) {
                    const index = parseInt(checkbox.dataset.index, 10);
                    selectedProducts.push(cart[index]);
                }
            });

            if (selectedProducts.length === 0) {
                alert("⚠️ Pilih dulu produk yang ingin di-checkout.");
                return;
            }

            localStorage.setItem('checkoutItems', JSON.stringify(selectedProducts));
            window.location.href = 'checkout.html';
        });
    }

    if (document.getElementById('cartContainer')) {
        renderCart();
    }
});

















// ===== Ulasan =====
function tambahUlasan() {
  // 🟧 M
  const namaInput = document.getElementById('input-nama'); 
  const ulasanInput = document.getElementById('input-ulasan'); 
  const ratingValue = parseInt(document.getElementById('rating-value').value); 
  const daftarUlasan = document.getElementById('daftar-ulasan'); 

  
  const nama = namaInput.value.trim();
  const ulasan = ulasanInput.value.trim();

 
  if (nama === '' || ulasan === '') {
    alert('Mohon isi nama dan ulasan terlebih dahulu.'); // Alert
    return;
  }

  if (ratingValue === 0) {
    alert('Mohon beri rating bintang terlebih dahulu.'); // Alert
    return;
  }

  // ✅ 
  const dataUlasan = {
    id: Date.now(), 
    nama,           
    ulasan,         
    rating: ratingValue 
  };

  // 🟨 
  const ulasanList = JSON.parse(localStorage.getItem('ulasanList')) || []; 
  ulasanList.unshift(dataUlasan); 
  localStorage.setItem('ulasanList', JSON.stringify(ulasanList)); 

  // 🟧  Manipulation - Tambahkan satu ulasan ke tampilan
  tampilkanSatuUlasan(dataUlasan);

  // 🟧  Reset form input Manipulation
  namaInput.value = '';
  ulasanInput.value = '';
  document.getElementById('rating-value').value = 0;

  // 🟧  Reset bintang Manipulation
  document.querySelectorAll('#rating-stars .star').forEach(s => {
    s.classList.remove('text-yellow-400');
    s.classList.add('text-gray-300');
  });
}

// ✅ Teknik: Function + Destructuring Object
function tampilkanSatuUlasan({ nama, ulasan, rating, id }) {
  const daftarUlasan = document.getElementById('daftar-ulasan'); 

  // 🟧 Manipulation  Buat elemen baru
  const ulasanBaru = document.createElement('div'); 
  ulasanBaru.className = 'bg-[#FFC6C6] rounded-xl shadow-md p-6 mb-5'; 

  
  ulasanBaru.innerHTML = `
    <div class="flex items-start gap-4">
      <img src="https://i.pravatar.cc/50?u=${id}" alt="Avatar" class="rounded-full h-12 w-12">
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold text-gray-800">${nama}</p>
            <p class="text-sm text-gray-500">Baru saja</p>
          </div>
          <div class="text-yellow-400 text-lg">
            ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
          </div>
        </div>
        <p class="mt-2 text-gray-700">${ulasan}</p>
      </div>
    </div>
  `;

  daftarUlasan.prepend(ulasanBaru); // 🟧  Manipulation - Tambah ke atas daftar
}


document.addEventListener('DOMContentLoaded', () => {
  // 🟨 Ambil data ulasan dari localStorage - Array of Object
  const ulasanList = JSON.parse(localStorage.getItem('ulasanList')) || []; // Array
  ulasanList.forEach(tampilkanSatuUlasan); //  Looping array

  // 🟧  Event untuk klik bintang rating Manipulation
  document.querySelectorAll('#rating-stars .star').forEach(star => {
    star.addEventListener('click', function () {
      // Ambil nilai rating dari atribut HTML - DOM + string -> number
      const rating = parseInt(this.getAttribute('data-value'));
      document.getElementById('rating-value').value = rating; // DOM

      // ubah warna bintang berdasarkan rating
      document.querySelectorAll('#rating-stars .star').forEach(s => {
        const val = parseInt(s.getAttribute('data-value')); 
        s.classList.toggle('text-yellow-400', val <= rating); 
        s.classList.toggle('text-gray-300', val > rating); 
      });
    });
  });
});
