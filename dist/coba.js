

// Chekout produk
document.addEventListener('DOMContentLoaded', () => {
    // 🟧
    const orderItemsContainer = document.getElementById("orderItems");               
    const totalPriceElement = document.getElementById("totalPrice");                 
    const footerTotalPriceElement = document.getElementById("footerTotalPrice");     

    const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];    

    
    if (!footerTotalPriceElement) return;                                           

    // Jika halaman ringkasan pesanan, cek elemen orderItemsContainer dan totalPriceElement
    //🟧 Manipulations
    if (orderItemsContainer && totalPriceElement) {                                

        if (checkoutItems.length === 0) {                                           
            orderItemsContainer.innerHTML = `<p class="text-center text-gray-500">Tidak ada produk untuk checkout.</p>`;  
            totalPriceElement.textContent = "Rp 0";                                
            footerTotalPriceElement.textContent = "Rp0";                           
            return;
        }

        let totalPrice = 0;   
        orderItemsContainer.innerHTML = "";                                          

        // 🟨  product adalah ✅ Looping 
        checkoutItems.forEach(product => {                                           
            // Mengakses properti objek dan konversi tipe data
            const quantity = parseInt(product.quantity || 1, 10);                    
            const price = parseFloat(product.price);                                
            const productTotal = price * quantity;                               
            totalPrice += productTotal;                                             

            // Membuat string HTML dengan data objek produk
            const productHTML = `
                <div class="flex items-start gap-4 mb-4">
                    <img src="${product.thumbnail}" alt="${product.title}" 
                         class="w-20 h-20 object-contain bg-[#FFDBDB] rounded-md" />
                    <div class="flex-1">
                        <p class="font-medium">${product.title}</p>
                        <p class="text-gray-500 text-sm">${product.category}</p>
                        <p class="font-semibold mt-1">${formatPrice(price)}</p>
                    </div>
                    <span class="text-sm text-gray-600">x${quantity}</span>
                </div>
            `;                                                                     
            orderItemsContainer.insertAdjacentHTML("beforeend", productHTML);     
        });

        
        const formattedTotal = formatPrice(totalPrice);                           
        totalPriceElement.textContent = formattedTotal;                          
        footerTotalPriceElement.textContent = formattedTotal;                     

    } else {
        
        let totalPrice = 0;                                                       
        checkoutItems.forEach(product => {                                        
            const quantity = parseInt(product.quantity || 1, 10);                
            const price = parseFloat(product.price);                             
            totalPrice += price * quantity;                                      
        });

        footerTotalPriceElement.textContent = formatPrice(totalPrice);           
    }

    // Event listener tombol konfirmasi pesanan
    // 🟧 manipulations
    const confirmOrderBtn = document.getElementById("confirmOrderBtn");          
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener("click", () => {                        
            alert("✅ Checkout berhasil!");                                      
            
        });
    }
});

// Fungsi untuk memformat harga
function formatPrice(price) {
    // Mengembalikan string dengan format mata uang Rupiah
    return "Rp " + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");        
}




// Ambil kategori dari URL
    function getCategoryFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('kategori');
    }

    
    function formatPrice(price) {
        return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    // Tampilkan rating bintang
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

    // Tambah produk ke keranjang lalu redirect
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produk telah ditambahkan ke keranjang!');
        window.location.href = 'ker.html'; // pindah halaman ke keranjang
    }

    // Tampilkan produk sesuai kategori
    async function showProductsByCategory() {
        const category = getCategoryFromUrl();
        const container = document.getElementById('productsContainer');

        if (!category) {
            container.innerHTML = `<p class="text-center text-gray-500">Kategori tidak ditemukan.</p>`;
            return;
        }

        try {
            const response = await fetch('https://dummyjson.com/products?limit=0');
            const data = await response.json();

            const filteredProducts = data.products.filter(p => p.category.toLowerCase() === category.toLowerCase());

            if (filteredProducts.length === 0) {
                container.innerHTML = `<p class="text-center text-gray-500">Produk dengan kategori "${category}" tidak ditemukan.</p>`;
                return;
            }

            container.innerHTML = filteredProducts.map((product) => `
                <div class="bg-white rounded shadow p-4 max-w-xs mx-auto">
                    <img src="${product.thumbnail}" alt="${product.title}" class="rounded mb-2 object-cover h-48 w-full">
                    <h2 class="text-lg font-bold mb-1">${product.title}</h2>
                    <p class="text-sm text-gray-600 mb-1">${product.category}</p>
                    <div class="mb-1">${generateStars(product.rating)}</div>
                    <p class="text-pink-600 font-semibold mb-2">${formatPrice(product.price)}</p>
                    <div class="flex items-center gap-2">
                        <a href="produk.html" onclick='localStorage.setItem("selectedProduct", JSON.stringify(${JSON.stringify(product)}))'
                            class="px-2 py-2 bg-[#B03052] text-white rounded hover:bg-pink-700 transition text-sm">
                            Detail Produk
                        </a>
                        <button class="add-to-cart text-2xl" data-product='${JSON.stringify(product).replace(/'/g, "&apos;")}' title="Tambah ke keranjang">
                            🛒
                        </button>
                    </div>
                </div>
            `).join('');

            // Klik tombol 🛒
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const productData = button.getAttribute('data-product').replace(/&apos;/g, "'");
                    const product = JSON.parse(productData);
                    addToCart(product);
                });
            });

        } catch (error) {
            container.innerHTML = `<p class="text-center text-red-500">Terjadi kesalahan saat memuat produk.</p>`;
            console.error(error);
        }
    }

    // Jalankan saat halaman siap
    document.addEventListener('DOMContentLoaded', () => {
        showProductsByCategory();
    });

    