//récupère le lien URL
const selectProduit = window.location.search;
console.log(selectProduit);

//cherche un paramètre dans l'url et récupère l'ID
const urlParametre = new URLSearchParams(selectProduit);
console.log(urlParametre);

const id = urlParametre.get("id");
console.log(id);

//on récupère les infos produit dans l'api
fetch(`http://localhost:3000/api/products/${id}`)
  .then((result) => result.json())
  .then((data) => {
    console.log(data);

    //création de la balise img et devient enfant de item__img
    let itemImg = document.createElement("img");
    itemImg.setAttribute("src", data.imageUrl);
    itemImg.setAttribute("alt", data.altTxt);
    document.querySelector(".item__img").appendChild(itemImg);

    //injection des informations dans les balises html déjà créée
    document.querySelector("#title").innerHTML = data.name;
    document.querySelector("#price").innerHTML = data.price;
    document.querySelector("#description").innerHTML = data.description;

    //création d'une variable qui va chercher l'emplacement permettant de
    //placer mes éléments suivant
    let selecteur = document.querySelector("#colors");
    console.log(selecteur);

    //pour chaques couleurs de mon (tableau) du produit dans data je créé une option
    data.colors.forEach((colors) => {
      let colorSelect = document.createElement("option");

      //injection de la balise dans le html et de sa valeur
      colorSelect.innerHTML = `${colors}`;
      colorSelect.value = `${colors}`;

      //mes options deviennent l'enfant de ma variable qui correspond à la balise récupérée précédemment
      selecteur.appendChild(colorSelect);
      console.log(document.createElement("option"));
    });
    addProductCart(data);
  });

//j'attribu mon id addToCart à ma variable bouton
const addProductCart = () => {
  let bouton = document.querySelector("#addToCart");
  console.log(bouton);
  //je dis à mon bouton quoi selectionner quand je click sur lui
  bouton.addEventListener("click", () => {
    let product = {
      id: id,
      color: document.querySelector("#colors").value,
      quantity: parseInt(document.querySelector("#quantity").value),
    };
    if (product.quantity > 0 && product.quantity <= 100) {
      addCart(product);
    } else {
      alert("Veuillez sélectionner une quantité entre 1 et 100");
    }
  });
};
