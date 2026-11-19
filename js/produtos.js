const produto = JSON.parse(
  localStorage.getItem("produtoSelecionado")
);

console.log(produto);

console.log(document.getElementById("product-name"));

document.getElementById("product-name").textContent = produto.nome;

document.getElementById("product-category").textContent =
  produto.categoria;

document.getElementById("detail-category").textContent =
  produto.categoria;

document.getElementById("product-price").textContent =
  `R$ ${produto.preco.toFixed(2).replace(".", ",")}`;

document.getElementById("product-quantity").textContent =
  `${produto.quantidade} Unidades`;

document.getElementById("product-cost").textContent =
  `R$ ${produto.preco.toFixed(2).replace(".", ",")}`;