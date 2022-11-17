let cart = getCart();

//je récupère les infos produits de l'API
fetch("http://localhost:3000/api/products")
  .then((result) => result.json())
  .then((data) => {
    //pour chaque produit dans "cart", on recherche dans "data" le produit de l'Api correspondant
    cart.forEach((product) => {
      let productFound = data.find(
        (productApi) => productApi._id == product.id
      );
      //on assigne les infos du  produit trouvé dans le data à product
      Object.assign(product, productFound);
    });
    let cartDom = "";
    cart.forEach((product) => {
      cartDom += ` <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
  `;
    });
    document.querySelector("#cart__items").innerHTML = cartDom;
    displayTotal(cart);

    //créé un évênement qui met à jour la quantité d'un produit dans le LS à pmartir de
    //la valeur de l'input modifié
    let listInputQuantity = document.querySelectorAll(".itemQuantity");
    for (let input of listInputQuantity) {
      input.addEventListener("change", function (e) {
        const article = e.target.closest(".cart__item");
        changeQuantity({
          quantity: parseInt(e.target.value),
          color: article.dataset.color,
          id: article.dataset.id,
        });
        cart.find(
          (product) =>
            product.id == article.dataset.id &&
            product.color == article.dataset.color
        ).quantity = parseInt(e.target.value);
        displayTotal(cart);
      });
    }
    //créé un évênement qui supprime l'article du localstorage et du panier quand on click
    let listDeleteButton = document.querySelectorAll(".deleteItem");
    for (let button of listDeleteButton) {
      button.addEventListener("click", function (e) {
        const article = e.target.closest(".cart__item");
        removeFromCart({
          color: article.dataset.color,
          id: article.dataset.id,
        });
        article.remove();
        cart = cart.filter(
          (product) =>
            product.id != article.dataset.id ||
            product.color != article.dataset.color
        );
        displayTotal(cart);
      });
    }
  });
//fonction qui calcule le prix et la quantité total et l'affiche
function displayTotal(currentCart) {
  let totalPrice = 0;
  let totalQuantity = 0;
  for (let product of currentCart) {
    totalPrice += product.price * product.quantity;
    totalQuantity += product.quantity;
  }
  document.querySelector("#totalPrice").innerHTML = totalPrice;
  document.querySelector("#totalQuantity").innerHTML = totalQuantity;
}
//j'attribue les input dans form à fields
let fields = document.querySelectorAll("form input");

//pour chaque field de fields, je met des conditions en parcourant l'élément et ses parents
for (let field of fields) {
  field.addEventListener("keyup", (e) => {
    let valid = e.target.checkValidity();
    if (valid) {
      e.target
        .closest(".cart__order__form__question")
        .querySelector("#error").innerText = "";
      field.style.color = "black";
    } else {
      e.target
        .closest(".cart__order__form__question")
        .querySelector("#error").innerText = e.target.validationMessage;
      field.style.color = "Red";
    }
  });
}
//j'attribue button à mon bouton de validation et donne des conditions
let button = document.querySelector("#order");
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (document.querySelector(".cart__order__form").checkValidity()) {
    let data = {
      contact: {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
      },
      products: cart.map((product) => product.id),
    };
    console.log(data);
    //envoie une requête http vers url
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        window.location.assign(`confirmation.html?order_id=${data.orderId}`);
      })
      .catch(function (err) {
        console.log(err);
        alert("erreur");
      });
  } else {
    alert("formulaire non valide");
  }
});
