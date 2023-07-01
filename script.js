document.addEventListener("DOMContentLoaded", function() {
  const inputField = document.querySelector("input[type='text']");
  const addButton = document.querySelector(".add-button");
  const productListContainer = document.querySelector(".first-container");


  addButton.addEventListener("click", addItem);
  inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      addItem();
    }
  });

  function addItem() {
    const itemName = inputField.value.trim();
    if (itemName !== "") {
      const row = document.createElement("div");
      row.className = "row";

      const leftContainer = document.createElement("div");
      leftContainer.className = "row-column left-container";

      const productName = document.createElement("span");
      productName.className = "product";
      productName.textContent = itemName;

      leftContainer.appendChild(productName);
      row.appendChild(leftContainer);

      const centerContainer = document.createElement("div");
      centerContainer.className = "row-column center-container";

      const minusButton = document.createElement("span");
      minusButton.className = "circle-button minus faded tooltip";
      minusButton.dataset.tooltip = "Мінус";

      const minusButtonText = document.createElement("span");
      minusButtonText.className = "button-text";
      minusButtonText.textContent = "-";
      minusButton.appendChild(minusButtonText);

      const count = document.createElement("span");
      count.className = "count";
      const countText = document.createElement("span");
      countText.className = "count-text";
      countText.textContent = "1";
      count.appendChild(countText);

      const plusButton = document.createElement("span");
      plusButton.className = "circle-button plus tooltip";
      plusButton.dataset.tooltip = "Плюс";

      const plusButtonText = document.createElement("span");
      plusButtonText.className = "button-text";
      plusButtonText.textContent = "+";
      plusButton.appendChild(plusButtonText);

      centerContainer.appendChild(minusButton);
      centerContainer.appendChild(count);
      centerContainer.appendChild(plusButton);
      row.appendChild(centerContainer);

      const rightContainer = document.createElement("div");
      rightContainer.className = "row-column right-container";

      const purchaseButton = document.createElement("div");
      purchaseButton.className = "purchase-button right tooltip";
      purchaseButton.dataset.tooltip = "Куплено";
      purchaseButton.textContent = "Куплено";

      const xButton = document.createElement("span");
      xButton.className = "square-button X right minus tooltip";
      xButton.dataset.tooltip = "X";

      xButton.addEventListener("click", function() {
        if (purchaseButton.textContent === "Куплено") {
          row.remove();
          separator.remove();
        }
      });

      const xButtonText = document.createElement("span");
      xButtonText.className = "X button-text right";
      xButtonText.textContent = "x";

      xButton.appendChild(xButtonText);

      rightContainer.appendChild(purchaseButton);
      rightContainer.appendChild(xButton);
      row.appendChild(rightContainer);

      const separator = document.createElement("div");
      separator.className = "separator";

      xButton.addEventListener("click", function() {
        if (purchaseButton.textContent === "Куплено") {
          separator.remove();
        }
      });

        // Create a new cart product element
      const cartProduct = document.createElement("div");
      cartProduct.className = "cart-product";

      const cartProductText = document.createElement("span");
      cartProductText.className = "cart-product-text";
      cartProductText.textContent = itemName;

      const cartProductAmount = document.createElement("span");
      cartProductAmount.className = "cart-product-amount";
      cartProductAmount.textContent = "1";

      cartProduct.appendChild(cartProductText);
      cartProduct.appendChild(cartProductAmount);

      // Find the second container and append the cart product
      const secondContainer = document.querySelector(".second-container");
      const secondContainerLeft = secondContainer.querySelector(".second.row-left");
      secondContainerLeft.appendChild(cartProduct);

      //Remove from cart upon pressing X
      xButton.addEventListener("click", function() {
        if (purchaseButton.textContent === "Куплено") {
          row.remove();
          separator.remove();
      
          // Find the corresponding cart product in the second container and remove it
          const cartProducts = document.querySelectorAll(".second-container .cart-product");
          const productName = row.querySelector(".product").textContent;
          const productCount = row.querySelector(".count-text").textContent;
          
          for (let i = 0; i < cartProducts.length; i++) {
            const cartProduct = cartProducts[i];
            const cartProductName = cartProduct.querySelector(".cart-product-text").textContent;
            const cartProductCount = cartProduct.querySelector(".cart-product-amount").textContent;
            
            if (productName === cartProductName && productCount === cartProductCount) {
              cartProduct.remove();
              break;
            }
          }
        }
      });

      productListContainer.appendChild(row);
      productListContainer.appendChild(separator);
    }
     inputField.value = "";
  }

  // Deleting a row
  productListContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains("X")) {
    const row = event.target.closest(".row");
    const separator = row.nextElementSibling;
    const purchaseButton = row.querySelector(".purchase-button");

    if (purchaseButton.textContent === "Куплено") {
      row.remove();
      separator.remove();

      // Find the corresponding cart product in the second container and remove it
      const cartProducts = document.querySelectorAll(".second-container .cart-product");
      const productName = row.querySelector(".product").textContent;
      const productCount = row.querySelector(".count-text").textContent;

      for (let i = 0; i < cartProducts.length; i++) {
        const cartProduct = cartProducts[i];
        const cartProductName = cartProduct.querySelector(".cart-product-text").textContent;
        const cartProductCount = cartProduct.querySelector(".cart-product-amount").textContent;

        if (productName === cartProductName && productCount === cartProductCount) {
          cartProduct.remove();
          break;
        }
      }
    }
  }
});

  // Куплено-Не куплено
  productListContainer.addEventListener("click", function(event) {
    const target = event.target;
    const row = target.closest(".row");

    if (target.classList.contains("purchase-button")) {
      togglePurchaseStatus(row);
    } else if (target.classList.contains("X")) {
      const purchaseButton = row.querySelector(".purchase-button");

      if (purchaseButton.textContent === "Не куплено") {
        row.remove();
        const separator = row.nextElementSibling;
        separator.remove();
      }
    }
  });

  function togglePurchaseStatus(row) {
    const productName = row.querySelector(".product");
    const minusButton = row.querySelector(".minus");
    const plusButton = row.querySelector(".plus");
    const xButton = row.querySelector(".X");
    const purchaseButton = row.querySelector(".purchase-button");
    const fadedButtons = row.querySelectorAll(".faded");
  
    if (purchaseButton.textContent === "Куплено") {
      productName.classList.add("crossed");
      minusButton.classList.add("notseen");
      plusButton.classList.add("notseen");
      xButton.classList.add("notseen");
      purchaseButton.style.right = "0";
      purchaseButton.textContent = "Не куплено";
  
      // Move the corresponding cart product from "Залишилось" to "Куплено" section
      const cartProductName = productName.textContent;
      const cartProducts = document.querySelectorAll(".second-container .cart-product");
  
      for (let i = 0; i < cartProducts.length; i++) {
        const cartProduct = cartProducts[i];
        const cartProductText = cartProduct.querySelector(".cart-product-text");
  
        if (cartProductText.textContent === cartProductName) {
          // Remove from "Залишилось" section
          cartProduct.remove();
  
          // Create a new cart product in "Куплено" section
          const purchasedProduct = document.createElement("div");
          purchasedProduct.className = "cart-product";
  
          const purchasedProductText = document.createElement("span");
          purchasedProductText.className = "cart-product-text crossed";
          purchasedProductText.textContent = cartProductName;
  
          const purchasedProductAmount = document.createElement("span");
          purchasedProductAmount.className = "cart-product-amount crossed";
          purchasedProductAmount.textContent = "1";
  
          purchasedProduct.appendChild(purchasedProductText);
          purchasedProduct.appendChild(purchasedProductAmount);
  
          // Append to "Куплено" section
          const purchasedSection = document.querySelector(".second-container .fourth.row-left");
          purchasedSection.appendChild(purchasedProduct);
  
          break;
        }
      }
    } else {
      productName.classList.remove("crossed");
      minusButton.classList.remove("notseen");
      plusButton.classList.remove("notseen");
      xButton.classList.remove("notseen");
      purchaseButton.style.right = null;
      purchaseButton.textContent = "Куплено";
  
      // Move the corresponding cart product from "Куплено" to "Залишилось" section
      const cartProductName = productName.textContent;
      const purchasedProducts = document.querySelectorAll(".second-container .fourth.row-left .cart-product");
  
      for (let i = 0; i < purchasedProducts.length; i++) {
        const purchasedProduct = purchasedProducts[i];
        const purchasedProductText = purchasedProduct.querySelector(".cart-product-text");
  
        if (purchasedProductText.textContent === cartProductName) {
          // Remove from "Куплено" section
          purchasedProduct.remove();
  
          // Create a new cart product in "Залишилось" section
          const cartProduct = document.createElement("div");
          cartProduct.className = "cart-product";
  
          const cartProductText = document.createElement("span");
          cartProductText.className = "cart-product-text";
          cartProductText.textContent = cartProductName;
  
          const cartProductAmount = document.createElement("span");
          cartProductAmount.className = "cart-product-amount";
          cartProductAmount.textContent = "1";
  
          cartProduct.appendChild(cartProductText);
          cartProduct.appendChild(cartProductAmount);
  
          // Append to "Залишилось" section
          const cartSection = document.querySelector(".second-container .second.row-left");
          cartSection.appendChild(cartProduct);
  
          break;
        }
      }
    }
  }
  

  // Editing the quantity of items
  productListContainer.addEventListener("click", function(event) {
    const target = event.target;
    const row = target.closest(".row");

    if (target.classList.contains("plus")) {
      incrementCount(row);
    } else if (target.classList.contains("minus")) {
      decrementCount(row);
    }
  });

  function incrementCount(row) {
    const countText = row.querySelector(".count-text");
    const count = parseInt(countText.textContent);

    countText.textContent = count + 1;

    if (count + 1 > 1) {
      const minusButton = row.querySelector(".minus");
      minusButton.classList.remove("faded");
    }

    updateCartProduct(row, count + 1); 
  }

  function decrementCount(row) {
    const countText = row.querySelector(".count-text");
    const count = parseInt(countText.textContent);

    if (count > 1) {
      countText.textContent = count - 1;
      updateCartProduct(row, count - 1); 
    }

    if (count - 1 === 1) {
      const minusButton = row.querySelector(".minus");
      minusButton.classList.add("faded");
    }
  }

  function updateCartProduct(row, newCount) {
    const productName = row.querySelector(".product").textContent;
    const cartProducts = document.querySelectorAll(".second-container .cart-product");

    for (let i = 0; i < cartProducts.length; i++) {
      const cartProduct = cartProducts[i];
      const cartProductName = cartProduct.querySelector(".cart-product-text").textContent;

      if (productName === cartProductName) {
        const cartProductAmount = cartProduct.querySelector(".cart-product-amount");
        cartProductAmount.textContent = newCount;
        break;
      }
    }
  }
  
  // Event listener for product name editing
productListContainer.addEventListener("click", function(event) {
  const target = event.target;
  const productName = target.closest(".product");

  if (productName && !productName.classList.contains("crossed")) {
    const originalName = productName.textContent;
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = originalName;
    inputField.classList.add("product-input");

    inputField.addEventListener("blur", function() {
      const editedName = inputField.value.trim();
      if (editedName !== "") {
        productName.textContent = editedName;

        // Update the name of the product in the cart
        const cartProducts = document.querySelectorAll(".second-container .cart-product");
        for (let i = 0; i < cartProducts.length; i++) {
          const cartProduct = cartProducts[i];
          const cartProductName = cartProduct.querySelector(".cart-product-text").textContent;

          if (originalName === cartProductName) {
            cartProduct.querySelector(".cart-product-text").textContent = editedName;
            break;
          }
        }
      }
      inputField.parentNode.replaceChild(productName, inputField);
    });

    productName.parentNode.replaceChild(inputField, productName);
    inputField.focus();
  }
});
})