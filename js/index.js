fetch("http://localhost:3000/api/products")
  .then((result) => result.json())
  .then((data) => console.log(data));
