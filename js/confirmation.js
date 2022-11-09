// Récupération de l'orderId du produit via l' URL
const orderId = new URL(window.location).searchParams.get("order_id");

// affichage du numéro de commande
document.getElementById("orderId").innerText = `${orderId}`;
localStorage.removeItem("cart");
