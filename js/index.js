//récupération de l'API pour la renvoyer en réponse JSON//
fetch("http://localhost:3000/api/products")
  .then((result) => result.json())
  .then((data) => {
    console.log(data);

    //je créé ma variable pour pouvoir stocker mes valeurs
    let produitHtml = "";

    //pour chaque produit dans data on récupère ces infos//
    for (let produit of data) {
      produitHtml += `<a href="./product.html?id=${produit._id}">
            <article>
              <img src="${produit.imageUrl}" alt="${produit.altTxt}">
              <h3 class="productName">${produit.name}</h3>
              <p class="productDescription">${produit.description}</p>
            </article>
          </a> `;
    }
    document.querySelector("#items").innerHTML = produitHtml;
  });
