
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const productModal = document.getElementById("product-modal");
const productForm = document.getElementById("product-form");
const catalogContainer = document.getElementById("catalog-container");

let produtos = [];

openModal.addEventListener("click", () => {
  productModal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  productModal.classList.remove("active");
});

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const produto = {
    nome: document.getElementById("product-name").value,
    categoria: document.getElementById("product-category").value,
    preco: Number(document.getElementById("product-price").value),
    quantidade: Number(document.getElementById("product-quantity").value),
  };

  produtos.push(produto);

  renderizarProdutos();

  productForm.reset();
  productModal.classList.remove("active");
});

function renderizarProdutos() {
  catalogContainer.innerHTML = "";

  const categorias = {};

  produtos.forEach((produto) => {
    if (!categorias[produto.categoria]) {
      categorias[produto.categoria] = [];
    }

    categorias[produto.categoria].push(produto);
  });

  Object.entries(categorias).forEach(([categoria, produtosCategoria]) => {
    const secao = document.createElement("section");
    secao.classList.add("category-section");

    const titulo = document.createElement("h3");
    titulo.classList.add("category-title");
    titulo.textContent = categoria;

    const lista = document.createElement("div");
    lista.classList.add("product-list");

    produtosCategoria.forEach((produto) => {
      const card = document.createElement("article");
      card.classList.add("product-card");

      const imagem = document.createElement("div");
      imagem.classList.add("product-image");

      const informacoes = document.createElement("div");
      informacoes.classList.add("product-info");

      const nome = document.createElement("h4");
      nome.textContent = produto.nome;

      const categoriaProduto = document.createElement("span");
      categoriaProduto.textContent = produto.categoria;

      const preco = document.createElement("strong");
      preco.textContent = `R$ ${produto.preco.toFixed(2)}`;

      const quantidade = document.createElement("small");
      quantidade.textContent = `${produto.quantidade} Unidades`;

      informacoes.append(nome, categoriaProduto, preco, quantidade);
      card.append(imagem, informacoes);
      lista.appendChild(card);
    });

    secao.append(titulo, lista);
    catalogContainer.appendChild(secao);
  });

  document.getElementById("total-categorias").textContent =
    Object.keys(categorias).length;

  document.getElementById("total-unidades").textContent =
    produtos.reduce((total, produto) => total + produto.quantidade, 0);
}
