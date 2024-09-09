document.addEventListener("DOMContentLoaded", function() {
    let productsPerPage = 4; // Number of products to load per batch
    let currentPage = 0;
    let products = [];
  
    // Fetch all products initially
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        products = data;
        loadInitialProducts();  // Load enough products to fill the page
      })
      .catch(error => console.error('Error fetching products:', error));
  
    // Function to load products dynamically
    function loadProducts() {
      const productGrid = document.getElementById('productGrid');
      const start = currentPage * productsPerPage;
      const end = start + productsPerPage;
  
      const productsToLoad = products.slice(start, end);
  
      productsToLoad.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-3';
        productCard.innerHTML = `
          <div class="product-card">
            <img class="thumbnail" src="${product.image}" alt="${product.product}">
            <h3>${product.product}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price} sp</p>
          </div>
        `;
        productGrid.appendChild(productCard);
      });
  
      currentPage++;
    }
  
    // Function to load enough products to fill the initial viewport
    function loadInitialProducts() {
      const productGrid = document.getElementById('productGrid');
      const viewportHeight = window.innerHeight;
      const productCardHeight = 300; // Approximate height of a product card including margins
      const productsNeeded = Math.ceil(viewportHeight / productCardHeight) * 4; // Estimate how many rows fit in the viewport
  
      for (let i = 0; i < productsNeeded / productsPerPage; i++) {
        loadProducts();  // Load more products in batches
      }
    }
  
    // Infinite scroll event listener
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadProducts();  // Load more products when user scrolls to bottom
      }
    });
  });
  