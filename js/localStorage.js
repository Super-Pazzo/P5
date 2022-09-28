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

  localStorage.setItem("cart", JSON.stringify(cart));
  2;
}
