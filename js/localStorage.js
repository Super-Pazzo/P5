function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * récupère le panier dans le localStorage
 * @returns {Array} le panier si il existe sinon un tableau vide
 */
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}
/**
 * ajoute un produit au panier et enregistre dans le local storage
 * @param {Object} product le produit a ajouter au panier
 */
function addCart(product) {
  let cart = getCart();
  let productFound = cart.find(
    (element) => element.id == product.id && element.color == product.color
  );
  if (productFound == undefined) {
    cart.push(product);
  } else {
    productFound.quantity += product.quantity;
    if (productFound.quantity > 100) {
      productFound.quantity = 100;
    }
  }
  saveCart(cart);
}

/**
 * Supprimer un produit du localStorage
 * @param {object} product le produit que l'on souhaite supprimer
 */
function removeFromCart(product) {
  let cart = getCart();
  cart = cart.filter((p) => p.id != product.id || p.color != product.color);
  saveCart(cart);
}

/**
 * met à jours la quantité d'un produit dans mon localstorage
 * @param {object} product le produit dont on veut changer la quantité
 */
function changeQuantity(product) {
  let cart = getCart();
  let productFound = cart.find(
    (p) => p.id == product.id && p.color == product.color
  );
  if (productFound != undefined) {
    productFound.quantity = product.quantity;
    if (productFound.quantity <= 0) {
      removeFromCart(product);
    }
  }
  saveCart(cart);
}
