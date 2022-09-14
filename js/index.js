//récupération de l'API pour la renvoyer en réponse JSON//
fetch("http://localhost:3000/api/products")
  .then((result) => result.json())
  .then((data) => {
    console.log(data);

    //pour chaque produit dans data on récupère ces infos//
    for (let produit of data) {
      //créé la balise a qui récupère l'id de chaque produit dans data//
      let link = document.createElement("a");
      link.setAttribute("href", "./product.html?id=" + produit._id);

      //créé l'article qui devient enfant de link (balise "a")//
      let article = document.createElement("article");
      link.appendChild(article);

      //créé la balise image et ses attribust qui devient l'enfant de "article"//
      let img = document.createElement("img");
      img.setAttribute("src", produit.imageUrl);
      img.setAttribute("alt", produit.altTxt);
      article.appendChild(img);

      //créé le titre h3 avec sa class avec le nom du produit et devient enfant de l'article//
      let titre = document.createElement("h3");
      titre.classList.add("productName");
      titre.innerHTML = produit.name;
      article.appendChild(titre);

      //créé la balise p avec sa class, la description produit et devient enfant d'article//
      let p = document.createElement("p");
      p.classList.add("productDescription");
      p.innerHTML = produit.description;
      article.appendChild(p);

      //récupère la balise items et on lui attribut l'ensemble de la balise "a"(link) en enfant //
      document.querySelector("#items").appendChild(link);
    }
  });
