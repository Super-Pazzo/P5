let cart = getCart();

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

    let listInputQuantity = document.querySelectorAll(".itemQuantity");
    for (let input of listInputQuantity) {
      input.addEventListener("change", function (e) {
        const article = e.target.closest(".cart__item");
        changeQuantity({
          quantity: e.target.value,
          color: article.dataset.color,
          id: article.dataset.id,
        });
      });
    }
    let listDeleteButton = document.querySelectorAll(".deleteItem");
    for (let button of listDeleteButton) {
      button.addEventListener("click", function (e) {
        const article = e.target.closest(".cart__item");
        removeFromCart({
          color: article.dataset.color,
          id: article.dataset.id,
        });
        article.remove();
      });
    }
  });
