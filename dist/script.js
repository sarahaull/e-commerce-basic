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
    return 'Rp ' + new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
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

        const card = document.createElement("div");

        card.className = `
            product-card
            flex-shrink-0
            w-72
            rounded-[42px]
            p-6
            relative
            overflow-hidden
            cursor-pointer
            transition-all
            duration-500
            hover:-translate-y-4
            hover:scale-[1.04]
        `;

        card.style.background = `
            linear-gradient(
                160deg,
                #ffffff,
                #fff8fb,
                #ffe8f2,
                #ffd9e8
            )
        `;

        card.style.border = "2px solid rgba(255,255,255,.9)";
        card.style.boxShadow = `
            0 25px 60px rgba(233,146,180,.28),
            inset 0 0 25px rgba(255,255,255,.8)
        `;
        card.style.backdropFilter = "blur(16px)";

        // 🎀 Format harga ke Rupiah Indonesia
        const formatRupiah = (price) => {
            return 'Rp ' + Number(price).toLocaleString('id-ID');
        };

        card.innerHTML = `

            <div style="position:absolute;top:-90px;right:-70px;width:240px;height:240px;background:#ffcfe2;border-radius:50%;filter:blur(60px);opacity:.55;"></div>

            <div style="position:absolute;bottom:-80px;left:-70px;width:210px;height:210px;background:#ffeef5;border-radius:50%;filter:blur(55px);"></div>

            <div style="position:absolute;top:18px;left:18px;font-size:34px;filter:drop-shadow(0 10px 12px rgba(225,120,170,.35));">🎀</div>

            <div style="position:absolute;top:18px;left:62px;font-size:14px;color:#f7bfd3;">🤍</div>

            <div style="position:absolute;top:65px;left:38px;font-size:18px;color:#e58eb0;">✦</div>

            <div style="position:absolute;top:95px;left:18px;font-size:13px;color:#f2aac7;">✧</div>

            <div style="position:absolute;bottom:35px;right:35px;font-size:22px;color:#e58eb0;">♡</div>

            <div style="position:absolute;bottom:62px;right:20px;font-size:14px;color:#f2aac7;">✦</div>

            <div style="position:absolute;top:22px;right:22px;padding:8px 16px;border-radius:999px;background:rgba(255,255,255,.82);backdrop-filter:blur(12px);border:1px solid white;box-shadow:0 8px 25px rgba(220,140,170,.2);font-size:14px;">
                ⭐ <span style="font-weight:700;color:#b65c80;">${product.rating}</span>
            </div>

            <div class="relative z-10 flex flex-col items-center text-center">

                <div style="margin-top:38px;width:205px;height:205px;border-radius:50%;background:linear-gradient(145deg,#fff,#fff5f9);display:flex;align-items:center;justify-content:center;border:5px solid rgba(255,255,255,.95);box-shadow:0 22px 50px rgba(225,145,180,.28);position:relative;">

                    <div style="position:absolute;inset:13px;border-radius:50%;border:2px dashed #f6bfd2;"></div>

                    <div style="position:absolute;top:18px;right:28px;width:12px;height:12px;background:white;border-radius:50%;box-shadow:0 0 0 3px #ffe1eb;"></div>

                    <div style="position:absolute;bottom:28px;left:22px;width:10px;height:10px;background:white;border-radius:50%;box-shadow:0 0 0 3px #ffe1eb;"></div>

                    <img src="${product.thumbnail}" alt="${product.title}" class="product-image" style="width:145px;height:145px;object-fit:contain;z-index:2;transition:.5s;filter:drop-shadow(0 18px 20px rgba(0,0,0,.15));">

                </div>

                <h3 style="margin-top:25px;font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:#a65277;line-height:1.35;min-height:62px;">
                    ${product.title}
                </h3>

                <div style="margin-top:12px;padding:8px 18px;border-radius:999px;background:rgba(255,255,255,.7);border:1px solid #f8d4e0;color:#c86f91;font-size:13px;font-weight:600;">
                    🌸 ${product.category}
                </div>

                <div style="width:100%;display:flex;justify-content:space-between;align-items:center;margin-top:30px;">

                    <div>
                        <p style="font-size:11px;letter-spacing:2px;color:#dc9ab6;">COQUETTE PRICE</p>
                        <h2 style="font-family:Georgia,serif;font-size:29px;font-weight:900;color:#df5b8a;">
                            ${formatRupiah(product.price)}
                        </h2>
                    </div>

                    <button style="width:64px;height:64px;border-radius:50%;background:linear-gradient(145deg,#ffe7ef,#f59abc,#ea6f9e);border:3px solid white;font-size:24px;display:flex;justify-content:center;align-items:center;box-shadow:0 18px 35px rgba(226,132,169,.35);transition:.4s;position:relative;overflow:hidden;" class="hover:scale-125 hover:rotate-12">

                        <div style="position:absolute;top:8px;left:10px;width:26px;height:8px;background:rgba(255,255,255,.55);border-radius:999px;transform:rotate(-18deg);"></div>

                        🛍️

                    </button>

                </div>

            </div>

            <div style="position:absolute;top:45%;left:-90px;width:200px;height:45px;background:white;opacity:.25;transform:rotate(-25deg);filter:blur(8px);"></div>

        `;

        const clickable = card.querySelectorAll("img.product-image,h3");

        clickable.forEach(el => {
            el.style.cursor = "pointer";
            el.addEventListener("click", () => {
                if (isLandingPage() && !isUserLoggedIn()) {
                    alert("⚠️ Anda harus login terlebih dahulu.");
                    return;
                }
                localStorage.setItem("selectedProduct", JSON.stringify(product));
                window.location.href = "produk.html";
            });
        });

        const addToCartBtn = card.querySelector("button");

        addToCartBtn.addEventListener("click", e => {
            e.stopPropagation();
            if (isLandingPage() && !isUserLoggedIn()) {
                alert("⚠️ Login terlebih dahulu untuk menambahkan ke keranjang.");
            } else {
                addToCart(product);
                alert("🎀 Produk berhasil ditambahkan ke keranjang.");
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
document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById("productsList")) {
        fetchProducts();
        setupScrolling();
    }

    if (document.getElementById("cartContainer")) {
        renderCart();
    }

});






// Saran Produk
// 🟧 Ambil elemen container dari HTML


// 🟦 Ambil data produk dari API
const container = document.getElementById("product-container");

fetch("https://dummyjson.com/products?limit=0")
  .then((res) => res.json())
  .then((data) => {

    const highRated = data.products
      .filter(product => product.rating >= 4.5)
      .slice(0, 28);

    highRated.forEach((product) => {

      const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(product.price * 16000);

      const card = document.createElement("div");

      card.className = `
group
relative
overflow-hidden
flex
flex-col
justify-between
rounded-[30px]
transition-all
duration-500
hover:-translate-y-2
max-w-[250px]
w-full
mx-auto
cursor-pointer
`;



card.style.border = "2px solid #F5B8CC";
card.style.borderRadius = "30px";

card.style.boxShadow = `
0 15px 40px rgba(235,155,185,.30),
0 25px 65px rgba(255,210,230,.35),
inset 0 1px 3px rgba(255,255,255,.95),
inset 0 -1px 3px rgba(255,200,215,.1)
`;

      card.innerHTML = `
<!-- Coquette Background Blur -->
<div class="absolute -top-10 -left-10 w-40 h-40 bg-[#FFE0E8] rounded-full blur-3xl opacity-60"></div>
<div class="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FCC8D5] rounded-full blur-3xl opacity-60"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFF0F5] rounded-full blur-3xl opacity-40"></div>

<!-- Curved Decorative Frame -->
<div class="absolute inset-2 rounded-[26px] border-2 border-[#F5B8CC]/30 pointer-events-none" 
     style="border-radius: 26px; border-style: dashed;"></div>

<!-- Pearl Details - Colorful -->
<div class="absolute top-4 left-4 flex gap-1.5">
    <div class="w-2 h-2 rounded-full bg-[#FFB6C1] shadow-sm"></div>
    <div class="w-2 h-2 rounded-full bg-[#FFD4A8] shadow-sm"></div>
    <div class="w-2 h-2 rounded-full bg-[#B5D8EB] shadow-sm"></div>
</div>
<div class="absolute top-4 right-4 flex gap-1.5">
    <div class="w-2 h-2 rounded-full bg-[#D4A5FF] shadow-sm"></div>
    <div class="w-2 h-2 rounded-full bg-[#FFB6C1] shadow-sm"></div>
    <div class="w-2 h-2 rounded-full bg-[#FFD4A8] shadow-sm"></div>
</div>

<!-- Curved Ribbon Top -->
<div class="absolute -top-1 left-1/2 -translate-x-1/2">
    <div class="w-16 h-4 bg-gradient-to-r from-[#FFB6C1] via-[#FFD4E8] to-[#D4A5FF] rounded-full shadow-inner"></div>
    <div class="absolute -top-0.5 left-3 w-3 h-3 bg-[#FFB6C1] rotate-45 rounded-sm"></div>
    <div class="absolute -top-0.5 right-3 w-3 h-3 bg-[#D4A5FF] -rotate-45 rounded-sm"></div>
</div>

<!-- Colorful Coquette Decorations -->
<div class="absolute top-7 left-6 text-2xl opacity-80 rotate-[-10deg]">
    🌸
</div>
<div class="absolute top-7 right-6 text-2xl opacity-80 rotate-10deg">
    🌺
</div>
<div class="absolute left-3 top-1/3 text-xl opacity-70 -rotate-12">
    💖
</div>
<div class="absolute right-3 top-1/3 text-xl opacity-70 rotate-12">
    💕
</div>
<div class="absolute bottom-20 left-3 text-base opacity-60 rotate-[-8deg]">
    🌷
</div>
<div class="absolute bottom-20 right-3 text-base opacity-60 rotate-8deg">
    🌹
</div>
<div class="absolute top-1/2 left-0 text-sm opacity-40 -translate-y-1/2">
    ✧
</div>
<div class="absolute top-1/2 right-0 text-sm opacity-40 -translate-y-1/2">
    ✧
</div>

<!-- Image Section with Curved Border -->
<div class="pt-10 px-5">

    <div class="
        bg-[#FFF8F9]
        border-2
        border-[#F5B8CC]
        rounded-[40px]
        p-5
        shadow-md
        rotate-[-1deg]
        group-hover:rotate-0
        group-hover:scale-[1.02]
        transition-all
        duration-500
        relative
        overflow-hidden
    ">
        <!-- Inner curved border -->
        <div class="absolute inset-1 rounded-[36px] border-2 border-[#F5B8CC]/20 pointer-events-none"></div>
        
        <!-- Curved overlay decoration -->
        <div class="absolute -top-10 -right-10 w-20 h-20 bg-[#FFD4E8] rounded-full blur-2xl opacity-30"></div>
        <div class="absolute -bottom-10 -left-10 w-20 h-20 bg-[#B5D8EB] rounded-full blur-2xl opacity-30"></div>

        <img
            src="${product.thumbnail}"
            alt="${product.title}"
            class="
                product-image
                w-full
                h-40
                object-contain
                transition-all
                duration-500
                group-hover:scale-110
                drop-shadow-sm
                relative
                z-10
            "
        >

        <p class="
            text-center
            text-[5px]
            italic
            text-[#D9A0B8]
            mt-3
            tracking-[3px]
            font-light
        ">
            ✿ colorful coquette ✿
        </p>

    </div>

</div>

<!-- Content -->
<div class="px-5 pt-4">

    <div class="flex items-center justify-center gap-2 mb-2">
        <div class="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#FFB6C1]"></div>
        <span class="text-[#E8A4BC] text-xs">✦</span>
        <div class="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#FFB6C1]"></div>
    </div>

    <h2 class="
        text-center
        text-[14px]
        font-light
        text-[#B06A7E]
        leading-5
        min-h-[40px]
        line-clamp-2
        px-2
        tracking-wide
    ">
        ${product.title}
    </h2>

    <p class="
        text-center
        text-[18px]
        font-light
        text-[#A85D73]
        tracking-wider
    ">
        ${formattedPrice}
    </p>

</div>

<!-- Bottom -->
<div class="flex items-center justify-between px-5 py-4">

    <div class="
        flex
        items-center
        gap-1
        text-[9px]
        text-[#D9A0B8]
        font-light
        tracking-wider
    ">
        💖 coquette
    </div>

    <button class="
        cart-btn
        w-12
        h-12
        flex
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-[#FFB6C1]
        via-[#FFD4E8]
        to-[#D4A5FF]
        text-white
        shadow-lg
        hover:scale-110
        hover:shadow-xl
        transition-all
        duration-300
        relative
        overflow-hidden
        border-2
        border-white/50
    ">
        <span class="relative z-10 text-xl">🛒</span>
        <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
    </button>

</div>

<!-- Bottom Colorful Decorations -->
<div class="absolute bottom-4 left-4 text-sm opacity-60 rotate-6">
    🌷
</div>
<div class="absolute bottom-4 right-4 text-sm opacity-60 -rotate-6">
    🌹
</div>
<div class="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent via-[#FFB6C1]/30 to-transparent"></div>
`;

      // Klik card → buka detail produk
      card.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "produk.html";
      });

      // Tombol keranjang
      const cartBtn = card.querySelector(".cart-btn");

      cartBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

        const existing = cart.find(item => item.id === product.id);

        if (existing) {
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          cart.push({
            ...product,
            quantity: 1
          });
        }

        localStorage.setItem("cartItems", JSON.stringify(cart));

        // Update badge di navbar
        updateCartBadge();

        cartBtn.innerHTML = "✓";
        cartBtn.classList.remove("from-[#FFB6C1]", "via-[#FFD4E8]", "to-[#D4A5FF]");
        cartBtn.classList.add("bg-green-400", "border-green-300");

        setTimeout(() => {
          cartBtn.innerHTML = "🛒";
          cartBtn.classList.remove("bg-green-400", "border-green-300");
          cartBtn.classList.add("from-[#FFB6C1]", "via-[#FFD4E8]", "to-[#D4A5FF]");
        }, 1000);

        alert(`✨ ${product.title} added to your cart 💖`);
      });

      container.appendChild(card);

    });

  })
  .catch((err) => {
    console.error(err);

    container.innerHTML = `
      <p class="text-center text-[#D9A0B8] col-span-full font-light tracking-wider">
        🌸 Failed to load products 🌸
      </p>
    `;
  });

// ====== FUNGSI UPDATE BADGE KERANJANG ======
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  
  try {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    if (total > 0) {
      badge.textContent = total;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error updating cart badge:', error);
  }
}

// Jalankan saat halaman dimuat untuk update badge
document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
  
  // Update badge jika ada perubahan di localStorage dari tab lain
  window.addEventListener('storage', function(e) {
    if (e.key === 'cartItems') {
      updateCartBadge();
    }
  });
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
  <div class="max-w-5xl mx-auto bg-gradient-to-br from-[#FFFDFE] via-[#FFF6F9] to-[#FDEBF2] rounded-[32px] border border-pink-200 shadow-xl p-8 md:p-10 relative overflow-hidden">
    
    <!-- Background Decorative Elements -->
    <div class="absolute -top-20 -right-20 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-30"></div>
    <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-30"></div>
    
    <!-- Main Grid -->
    <div class="grid md:grid-cols-2 gap-10 items-center relative z-10">
      
      <!-- LEFT: Image Section -->
      <div class="flex justify-center">
        <div class="relative">
          
          <!-- Glow Effect -->
          <div class="absolute inset-0 bg-pink-100 rounded-full blur-3xl opacity-70 scale-110"></div>
          
          <!-- Decorative Elements -->
          <div class="absolute -top-4 -left-4 text-pink-300 text-2xl animate-pulse">✦</div>
          <div class="absolute -top-4 -right-4 text-pink-300 text-xl">♡</div>
          <div class="absolute -bottom-4 -left-4 text-pink-300 text-xl">♡</div>
          
          <!-- Product Image -->
          <img
            src="${selectedProduct.thumbnail}"
            alt="${selectedProduct.title}"
            class="relative w-64 h-64 object-cover rounded-full border-[8px] border-white shadow-2xl hover:scale-105 transition-all duration-300"
          />
          
          <!-- Rating Badge -->
          <div class="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#d4527c] to-[#b03a5e] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1 shadow-lg border-2 border-white">
            <span>♡</span>
            <span>${selectedProduct.rating}</span>
          </div>
          
        </div>
      </div>
      
      <!-- RIGHT: Content Section -->
      <div>
        
        <!-- Category Badge -->
        <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-100 text-pink-500 text-[11px] tracking-widest uppercase mb-4 border border-pink-200/50">
          🎀 Beauty Collection
        </span>
        
        <!-- Title -->
        <h1 class="text-[28px] md:text-[32px] font-bold text-[#B76E79] leading-tight font-[Georgia,serif]">
          ${selectedProduct.title}
        </h1>
        
        <!-- Rating Stars -->
        <div class="flex items-center gap-2 mt-3">
          ${generateStars(selectedProduct.rating)}
          <span class="text-xs text-pink-400 ml-1">(${selectedProduct.rating})</span>
        </div>
        
        <!-- Description -->
        <p class="mt-4 text-[14px] leading-7 text-gray-500 italic">
          "${selectedProduct.description}"
        </p>
        
        <!-- Divider -->
        <div class="w-16 h-[2px] bg-gradient-to-r from-pink-300 to-pink-400 rounded-full my-5"></div>
        
        <!-- Category & Brand -->
        <div class="space-y-2 text-[14px]">
          <p class="text-gray-600">
            <span class="font-semibold text-[#B76E79]">Category :</span>
            <a 
              href="blub.html?kategori=${encodeURIComponent(selectedProduct.category)}" 
              class="text-pink-500 hover:text-pink-600 hover:underline transition ml-1"
            >
              ${selectedProduct.category}
            </a>
          </p>
          <p class="text-gray-600">
            <span class="font-semibold text-[#B76E79]">Brand :</span>
            <span class="text-gray-500 ml-1">${selectedProduct.brand}</span>
          </p>
        </div>
        
        <!-- Price -->
        <h2 class="mt-6 text-3xl font-bold text-[#D97E9D] font-[Georgia,serif] tracking-wide">
          ${formatPrice(selectedProduct.price)}
        </h2>
        <p class="text-[10px] text-pink-300 tracking-[0.2em] uppercase mt-1">
          ~ douceur ~
        </p>
        
        <!-- Quantity Selector -->
        <div class="flex items-center gap-4 mt-6">
          <span class="text-sm text-[#B76E79] font-medium">Quantité</span>
          <div class="flex items-center gap-2 bg-pink-50 rounded-full p-1 border border-pink-200">
            <button
              id="decreaseQty"
              class="w-10 h-10 rounded-full bg-white text-pink-500 hover:bg-pink-100 hover:scale-105 transition-all duration-200 shadow-sm flex items-center justify-center text-xl font-light"
            >
              −
            </button>
            <span id="qtyCount" class="w-8 text-center text-lg font-semibold text-[#B76E79]">
              1
            </span>
            <button
              id="increaseQty"
              class="w-10 h-10 rounded-full bg-white text-pink-500 hover:bg-pink-100 hover:scale-105 transition-all duration-200 shadow-sm flex items-center justify-center text-xl font-light"
            >
              +
            </button>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 mt-8">
          <button
            id="addToCartBtn"
            class="flex-1 min-w-[140px] py-3 px-6 rounded-full bg-gradient-to-r from-[#E7AFC3] to-[#DA97AF] hover:from-[#DA97AF] hover:to-[#CC7C92] text-white font-medium shadow-lg shadow-pink-300/30 hover:shadow-pink-400/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <span >🛍️</span> Add to Cart
          </button>
          
          <button
            id="buyNowBtn"
            class="flex-1 min-w-[140px] py-3 px-6 rounded-full border-2 border-pink-300 bg-[#DA97AF] text-[#B76E79] hover:bg-pink-50 hover:border-pink-400 hover:scale-105 transition-all duration-300 font-medium shadow-sm flex items-center justify-center gap-2"
          >
            <span>♡</span> Buy Now
          </button>
        </div>
        
        <!-- Decorative Footer -->
        <div class="flex items-center justify-center gap-3 mt-6">
          <span class="w-12 h-[1px] bg-gradient-to-r from-transparent to-pink-300"></span>
          <span class="w-12 h-[1px] bg-gradient-to-l from-transparent to-pink-300"></span>
        </div>
        
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

    const checkoutItem = [{
        ...selectedProduct,
        quantity: quantity
    }];

    localStorage.setItem("checkoutItems", JSON.stringify(checkoutItem));

    window.location.href = "chekout.html";
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
// ===== ULASAN =====

// Fungsi untuk menambahkan ulasan baru
function tambahUlasan() {
  const namaInput = document.getElementById('input-nama');
  const ulasanInput = document.getElementById('input-ulasan');
  const ratingValue = parseInt(document.getElementById('rating-value').value);
  const daftarUlasanContainer = document.getElementById('daftar-ulasan-container');

  const nama = namaInput.value.trim();
  const ulasan = ulasanInput.value.trim();

  // Validasi input
  if (nama === '' || ulasan === '') {
    alert('Mohon isi nama dan ulasan terlebih dahulu.');
    return;
  }

  if (ratingValue === 0) {
    alert('Mohon beri rating bintang terlebih dahulu.');
    return;
  }

  // Buat objek data ulasan
  const dataUlasan = {
    id: Date.now(),
    nama: nama,
    ulasan: ulasan,
    rating: ratingValue,
    waktu: new Date().toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  };

  // Simpan ke localStorage
  const ulasanList = JSON.parse(localStorage.getItem('ulasanList')) || [];
  ulasanList.unshift(dataUlasan);
  localStorage.setItem('ulasanList', JSON.stringify(ulasanList));

  // Tampilkan ulasan baru
  tampilkanSatuUlasan(dataUlasan);

  // Reset form
  namaInput.value = '';
  ulasanInput.value = '';
  document.getElementById('rating-value').value = 0;

  // Reset bintang
  document.querySelectorAll('#rating-stars .star').forEach(s => {
    s.classList.remove('active');
  });
}

// Fungsi untuk menampilkan satu ulasan
function tampilkanSatuUlasan({ nama, ulasan, rating, id, waktu }) {
  const daftarUlasanContainer = document.getElementById('daftar-ulasan-container');

  // Buat elemen card ulasan
  const ulasanBaru = document.createElement('div');
  ulasanBaru.className = 'review-card';
  ulasanBaru.style.animation = 'fadeInUp 0.4s ease';

  // Generate bintang
  const bintang = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  ulasanBaru.innerHTML = `
    <div class="review-header">
      <span class="review-name">${nama}</span>
      <span class="review-stars">${bintang}</span>
    </div>
    <p class="review-text">${ulasan}</p>
    <span class="review-date">${waktu || 'Baru saja'}</span>
  `;

  // Tambahkan ke atas daftar
  daftarUlasanContainer.prepend(ulasanBaru);
}

// Load ulasan dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  const ulasanList = JSON.parse(localStorage.getItem('ulasanList')) || [];

  // Jika ada ulasan di localStorage, tampilkan
  if (ulasanList.length > 0) {
    ulasanList.forEach(tampilkanSatuUlasan);
  }

  // Event untuk klik bintang rating
  document.querySelectorAll('#rating-stars .star').forEach(star => {
    star.addEventListener('click', function() {
      const rating = parseInt(this.getAttribute('data-value'));
      document.getElementById('rating-value').value = rating;

      // Ubah warna bintang
      document.querySelectorAll('#rating-stars .star').forEach(s => {
        const val = parseInt(s.getAttribute('data-value'));
        if (val <= rating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });
});

// ===== HAMBURGER MENU (jika ada) =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    if (mobileMenu) {
      mobileMenu.style.right = "0";
    }
    if (overlay) {
      overlay.classList.remove("hidden");
    }
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    if (mobileMenu) {
      mobileMenu.style.right = "-320px";
    }
    if (overlay) {
      overlay.classList.add("hidden");
    }
  });
}

if (overlay) {
  overlay.addEventListener("click", () => {
    if (mobileMenu) {
      mobileMenu.style.right = "-320px";
    }
    if (overlay) {
      overlay.classList.add("hidden");
    }
  });
}

// ===== ANIMASI CSS =====
// Tambahkan style untuk animasi fadeInUp
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ====== SEARCH FUNCTIONALITY ======
(function() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    // Store all product elements for searching
    let allProductElements = [];
    let allProductTitles = [];

    // Function to collect all products from all sections
    function collectAllProducts() {
        allProductElements = [];
        allProductTitles = [];

        // 1. Popular Products (from productsList - horizontal scroll)
        const popularItems = document.querySelectorAll('#productsList .product-card');
        popularItems.forEach(item => {
            const titleEl = item.querySelector('h3');
            if (titleEl) {
                allProductElements.push({
                    element: item,
                    title: titleEl.textContent.trim().toLowerCase(),
                    section: 'popular',
                    parent: item.closest('#productsList')
                });
            }
        });

        // 2. Recommended Products (from product-container)
        const recommendedItems = document.querySelectorAll('#product-container .product-card');
        recommendedItems.forEach(item => {
            const titleEl = item.querySelector('h2');
            if (titleEl) {
                allProductElements.push({
                    element: item,
                    title: titleEl.textContent.trim().toLowerCase(),
                    section: 'recommended',
                    parent: item.closest('#product-container')
                });
            }
        });

        // 3. Best Sellers (Mask Lotus & Liip Barry - coquette-grid)
        const bestSellerItems = document.querySelectorAll('.coquette-card');
        bestSellerItems.forEach(item => {
            const titleEl = item.querySelector('.product-name');
            if (titleEl) {
                allProductElements.push({
                    element: item,
                    title: titleEl.textContent.trim().toLowerCase(),
                    section: 'bestseller',
                    parent: item.closest('.coquette-grid')
                });
            }
        });

        // 4. New Products (new-products-grid)
        const newItems = document.querySelectorAll('.new-product-card');
        newItems.forEach(item => {
            const titleEl = item.querySelector('.product-name');
            if (titleEl) {
                allProductElements.push({
                    element: item,
                    title: titleEl.textContent.trim().toLowerCase(),
                    section: 'new',
                    parent: item.closest('.new-products-grid')
                });
            }
        });
    }

    // Function to get all section containers
    function getSectionContainers() {
        const sections = [];
        
        // Popular products section
        const popularSection = document.querySelector('#productsContainer');
        if (popularSection) {
            sections.push({
                container: popularSection.closest('.max-w-7xl'),
                type: 'popular',
                emptyMessage: 'No popular products found matching your search.'
            });
        }

        // Recommended products section
        const recommendedSection = document.querySelector('#product-container');
        if (recommendedSection) {
            sections.push({
                container: recommendedSection.closest('.max-w-6xl'),
                type: 'recommended',
                emptyMessage: 'No recommended products found matching your search.'
            });
        }

        // Best Sellers section
        const bestSection = document.querySelector('.coquette-grid');
        if (bestSection) {
            sections.push({
                container: bestSection.closest('.coquette-product-section'),
                type: 'bestseller',
                emptyMessage: 'No best sellers found matching your search.'
            });
        }

        // New products section
        const newSection = document.querySelector('.new-products-grid');
        if (newSection) {
            sections.push({
                container: newSection.closest('.new-products-section'),
                type: 'new',
                emptyMessage: 'No new products found matching your search.'
            });
        }

        return sections;
    }

    // Function to show/hide empty messages
    function showEmptyMessage(container, show, message) {
        let emptyMsg = container.querySelector('.search-empty-message');
        
        if (show) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('div');
                emptyMsg.className = 'search-empty-message';
                emptyMsg.style.cssText = `
                    text-align: center;
                    padding: 40px 20px;
                    color: #b28a96;
                    font-family: 'Playfair Display', serif;
                    font-size: 1.1rem;
                    font-style: italic;
                    width: 100%;
                `;
                emptyMsg.innerHTML = `
                    <div style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.4;">✦</div>
                    ${message}
                    <div style="font-size: 0.85rem; margin-top: 8px; opacity: 0.6;">Try searching for something else</div>
                `;
                container.appendChild(emptyMsg);
            }
            emptyMsg.style.display = 'block';
        } else {
            if (emptyMsg) {
                emptyMsg.style.display = 'none';
            }
        }
    }

    // Main search function
    function performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        // Re-collect products (in case DOM changed)
        collectAllProducts();
        
        const sections = getSectionContainers();
        
        // Reset all products visibility first
        allProductElements.forEach(p => {
            if (p.element) {
                p.element.style.display = '';
            }
        });

        // Show all sections
        sections.forEach(s => {
            if (s.container) {
                s.container.style.display = '';
                showEmptyMessage(s.container, false, '');
            }
        });

        // If search is empty, show everything
        if (!searchTerm) {
            sections.forEach(s => {
                if (s.container) {
                    showEmptyMessage(s.container, false, '');
                }
            });
            // Show popular products container
            const popularContainer = document.querySelector('#productsContainer');
            if (popularContainer) {
                const wrapper = popularContainer.closest('.max-w-7xl');
                if (wrapper) wrapper.style.display = '';
            }
            return;
        }

        // Filter products
        let hasVisibleProducts = false;
        const sectionHasProducts = {};

        allProductElements.forEach(p => {
            const matches = p.title.includes(searchTerm);
            if (p.element) {
                if (matches) {
                    p.element.style.display = '';
                    hasVisibleProducts = true;
                    sectionHasProducts[p.section] = true;
                } else {
                    p.element.style.display = 'none';
                }
            }
        });

        // Handle popular products container (horizontal scroll)
        const popularContainer = document.querySelector('#productsContainer');
        if (popularContainer) {
            const wrapper = popularContainer.closest('.max-w-7xl');
            if (wrapper) {
                if (sectionHasProducts['popular']) {
                    wrapper.style.display = '';
                } else {
                    wrapper.style.display = 'none';
                }
            }
        }

        // Show/hide sections based on whether they have visible products
        sections.forEach(s => {
            if (s.container) {
                const hasProducts = sectionHasProducts[s.type] || false;
                if (!hasProducts) {
                    s.container.style.display = 'none';
                } else {
                    s.container.style.display = '';
                }
            }
        });

        // Show empty state if no products found
        if (!hasVisibleProducts) {
            sections.forEach(s => {
                if (s.container) {
                    s.container.style.display = 'block';
                    showEmptyMessage(s.container, true, s.emptyMessage);
                }
            });
        }
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Collect products initially
    setTimeout(collectAllProducts, 500);

    // Add search event listener
    const debouncedSearch = debounce(performSearch, 300);
    
    searchInput.addEventListener('input', function(e) {
        debouncedSearch(this.value);
    });

    // Also handle search on enter key
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });

    // Add clear button
    const searchWrapper = searchInput.closest('.relative');
    if (searchWrapper) {
        const clearBtn = document.createElement('button');
        clearBtn.className = 'absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors';
        clearBtn.style.display = 'none';
        clearBtn.style.cursor = 'pointer';
        clearBtn.style.background = 'none';
        clearBtn.style.border = 'none';
        clearBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        searchWrapper.appendChild(clearBtn);

        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearBtn.style.display = 'block';
            } else {
                clearBtn.style.display = 'none';
                performSearch(''); // Reset search
            }
        });

        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            this.style.display = 'none';
            performSearch('');
        });
    }

    // Re-collect products when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
        collectAllProducts();
    });

    // Observe product containers for changes
    const containers = [
        document.querySelector('#productsList'),
        document.querySelector('#product-container'),
        document.querySelector('.coquette-grid'),
        document.querySelector('.new-products-grid')
    ];

    containers.forEach(container => {
        if (container) {
            observer.observe(container, {
                childList: true,
                subtree: true
            });
        }
    });

    console.log('🔍 Search functionality initialized!');
})();
// ====== SEARCH FUNCTIONALITY - FIXED ======
(function() {
    // Cari input search di desktop dan mobile
    const searchInput = document.querySelector('.navbar-transparan .search-wrapper input');
    const mobileSearchInput = document.querySelector('.mobile-menu-transparan .links input');
    
    if (!searchInput && !mobileSearchInput) {
        console.log('Search input not found');
        return;
    }

    // Function to collect all products from all sections
    function collectAllProducts() {
        const products = [];
        
        // 1. Popular Products (from productsList - dynamic from API)
        const popularItems = document.querySelectorAll('#productsList .product-card');
        popularItems.forEach(item => {
            const titleEl = item.querySelector('h3');
            if (titleEl) {
                products.push({
                    element: item,
                    title: titleEl.textContent.trim().toLowerCase(),
                    section: 'popular'
                });
            }
        });

        // 2. Recommended Products (from product-container)
        const recommendedItems = document.querySelectorAll('#product-container .product-card');
        recommendedItems.forEach(item => {
            const titleEl = item.querySelector('h2');
            if (titleEl) {
                products.push({
                    element: item,
                    title: titleEl.textContent.trim().toLowerCase(),
                    section: 'recommended'
                });
            }
        });

        // 3. Best Sellers - Mask Lotus & Liip Barry
        const bestSellerItems = document.querySelectorAll('.coquette-card');
        bestSellerItems.forEach(item => {
            const titleEl = item.querySelector('.product-name');
            if (titleEl) {
                products.push({
                    element: item,
                    title: titleEl.textContent.trim().toLowerCase(),
                    section: 'bestseller'
                });
            }
        });

        // 4. New Collection Products
        const newCollectionItems = document.querySelectorAll('.new-collection-card');
        newCollectionItems.forEach(item => {
            const titleEl = item.querySelector('.product-title');
            if (titleEl) {
                products.push({
                    element: item,
                    title: titleEl.textContent.trim().toLowerCase(),
                    section: 'newcollection'
                });
            }
        });

        // 5. Product Grid Cards (Maskara, Mul, Kiwi, etc)
        const gridItems = document.querySelectorAll('.bg-pink-100.rounded-lg');
        gridItems.forEach(item => {
            const textEl = item.querySelector('.text-gray-700');
            if (textEl) {
                const text = textEl.textContent.trim().toLowerCase();
                products.push({
                    element: item,
                    title: text,
                    section: 'grid'
                });
            }
        });

        return products;
    }

    // Get all section containers
    function getSectionContainers() {
        const sections = [];
        
        // Popular products section
        const popularSection = document.querySelector('#productsContainer');
        if (popularSection) {
            const wrapper = popularSection.closest('.max-w-7xl');
            if (wrapper) {
                sections.push({
                    container: wrapper,
                    type: 'popular',
                    emptyMessage: 'No popular products found matching your search.'
                });
            }
        }

        // Recommended products section
        const recommendedSection = document.querySelector('#product-container');
        if (recommendedSection) {
            const wrapper = recommendedSection.closest('.max-w-6xl');
            if (wrapper) {
                sections.push({
                    container: wrapper,
                    type: 'recommended',
                    emptyMessage: 'No recommended products found matching your search.'
                });
            }
        }

        // Best Sellers section
        const bestSection = document.querySelector('.coquette-grid');
        if (bestSection) {
            const wrapper = bestSection.closest('.coquette-product-section');
            if (wrapper) {
                sections.push({
                    container: wrapper,
                    type: 'bestseller',
                    emptyMessage: 'No best sellers found matching your search.'
                });
            }
        }

        // New Collection section
        const newCollectionSection = document.querySelector('.container.mx-auto.px-4.py-12 .grid');
        if (newCollectionSection) {
            const wrapper = newCollectionSection.closest('.container.mx-auto.px-4.py-12');
            if (wrapper) {
                sections.push({
                    container: wrapper,
                    type: 'newcollection',
                    emptyMessage: 'No new collection products found matching your search.'
                });
            }
        }

        // Product Grid section
        const gridSection = document.querySelector('.relative.overflow-hidden.bg-gradient-to-br');
        if (gridSection) {
            sections.push({
                container: gridSection,
                type: 'grid',
                emptyMessage: 'No products found matching your search.'
            });
        }

        return sections;
    }

    // Show/hide empty message
    function showEmptyMessage(container, show, message) {
        let emptyMsg = container.querySelector('.search-empty-message');
        
        if (show) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('div');
                emptyMsg.className = 'search-empty-message';
                emptyMsg.style.cssText = `
                    text-align: center;
                    padding: 40px 20px;
                    color: #b28a96;
                    font-family: 'Playfair Display', serif;
                    font-size: 1.1rem;
                    font-style: italic;
                    width: 100%;
                `;
                emptyMsg.innerHTML = `
                    <div style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.4;">✦</div>
                    ${message}
                    <div style="font-size: 0.85rem; margin-top: 8px; opacity: 0.6;">Try searching for something else</div>
                `;
                container.appendChild(emptyMsg);
            }
            emptyMsg.style.display = 'block';
        } else {
            if (emptyMsg) {
                emptyMsg.style.display = 'none';
            }
        }
    }

    // Main search function
    function performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        const allProducts = collectAllProducts();
        const sections = getSectionContainers();
        
        // Reset all products visibility
        allProducts.forEach(p => {
            if (p.element) {
                p.element.style.display = '';
            }
        });

        // Show all sections
        sections.forEach(s => {
            if (s.container) {
                s.container.style.display = '';
                showEmptyMessage(s.container, false, '');
            }
        });

        // If search is empty, show everything
        if (!searchTerm) {
            sections.forEach(s => {
                if (s.container) {
                    showEmptyMessage(s.container, false, '');
                }
            });
            return;
        }

        // Filter products
        let hasVisibleProducts = false;
        const sectionHasProducts = {};

        allProducts.forEach(p => {
            const matches = p.title.includes(searchTerm);
            if (p.element) {
                if (matches) {
                    p.element.style.display = '';
                    hasVisibleProducts = true;
                    sectionHasProducts[p.section] = true;
                } else {
                    p.element.style.display = 'none';
                }
            }
        });

        // Show/hide sections
        sections.forEach(s => {
            if (s.container) {
                const hasProducts = sectionHasProducts[s.type] || false;
                if (!hasProducts) {
                    s.container.style.display = 'none';
                } else {
                    s.container.style.display = '';
                    // Check if section has any visible products
                    const visibleItems = s.container.querySelectorAll('.product-card, .coquette-card, .new-collection-card, .bg-pink-100.rounded-lg');
                    let hasVisible = false;
                    visibleItems.forEach(item => {
                        if (item.style.display !== 'none') {
                            hasVisible = true;
                        }
                    });
                    if (!hasVisible) {
                        s.container.style.display = 'none';
                    }
                }
            }
        });

        // Show empty state if no products found
        if (!hasVisibleProducts) {
            sections.forEach(s => {
                if (s.container) {
                    s.container.style.display = 'block';
                    showEmptyMessage(s.container, true, s.emptyMessage);
                }
            });
        }
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedSearch = debounce(performSearch, 300);

    // Add search event to desktop search
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            debouncedSearch(this.value);
        });

        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });

        // Add clear button for desktop
        const searchWrapper = searchInput.closest('.search-wrapper');
        if (searchWrapper) {
            const clearBtn = document.createElement('button');
            clearBtn.className = 'absolute right-10 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors';
            clearBtn.style.display = 'none';
            clearBtn.style.cursor = 'pointer';
            clearBtn.style.background = 'none';
            clearBtn.style.border = 'none';
            clearBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            searchWrapper.appendChild(clearBtn);

            searchInput.addEventListener('input', function() {
                if (this.value.length > 0) {
                    clearBtn.style.display = 'block';
                } else {
                    clearBtn.style.display = 'none';
                    performSearch('');
                }
            });

            clearBtn.addEventListener('click', function() {
                searchInput.value = '';
                searchInput.focus();
                this.style.display = 'none';
                performSearch('');
            });
        }
    }

    // Add search event to mobile search
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', function(e) {
            debouncedSearch(this.value);
        });

        mobileSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    console.log('🔍 Search functionality initialized!');
})();






