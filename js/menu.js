const sidebarPagesLinks = document.querySelectorAll(".sidebar_pages_links");
const pageContent = document.getElementById("page-content");

async function loadPage(page, link) {
  sidebarPagesLinks.forEach((pageLink) => {
    pageLink.classList.remove("is_active");
  });

  if (link) {
    link.classList.add("is_active");
  }

  try {
    const response = await fetch(`${page}.html`);

    if (!response.ok) {
      pageContent.innerHTML = "Não foi possível carregar esta página.";
      return;
    }

    pageContent.innerHTML = await response.text();

    document.querySelector("#page-style")?.remove();
    document.querySelector("#page-script")?.remove();

    if (page === "catalogo" || page === "produtos") {
      const stylesheet = document.createElement("link");
      stylesheet.id = "page-style";
      stylesheet.rel = "stylesheet";
      stylesheet.href = `../css/${page}.css`;
      document.head.appendChild(stylesheet);

      const script = document.createElement("script");
      script.id = "page-script";
      script.src = `../js/${page}.js`;
      pageContent.appendChild(script);
    }

    configurarHeader();

  } catch (error) {
    pageContent.innerHTML = "Não foi possível carregar esta página.";
  }
}

function configurarHeader() {
  const campo = document.getElementById("header-search");
  const sugestoes = document.getElementById("search-suggestions");
  const voltar = document.querySelector(".header-back");

  if (!campo || !sugestoes) return;

  voltar.addEventListener("click", () => {
    const destino = voltar.dataset.back;
    const link = document.querySelector(`[data-page="${destino}"]`);

    loadPage(destino, link);
  });

  campo.addEventListener("input", () => {
    const termo = campo.value.trim().toLowerCase();

    sugestoes.innerHTML = "";

    if (!termo) {
      sugestoes.classList.remove("active");
      return;
    }

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    const encontrados = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termo) ||
      produto.categoria.toLowerCase().includes(termo)
    );

    encontrados.forEach((produto) => {
      const opcao = document.createElement("button");
      opcao.className = "search-option";
      opcao.type = "button";

      const nome = document.createElement("strong");
      nome.textContent = produto.nome;

      const categoria = document.createElement("span");
      categoria.textContent = produto.categoria;

      opcao.append(nome, categoria);

      opcao.addEventListener("click", () => {
        localStorage.setItem("produtoSelecionado", JSON.stringify(produto));

        campo.value = "";
        sugestoes.classList.remove("active");

        loadPage("produtos", document.querySelector('[data-page="catalogo"]'));
      });

      sugestoes.appendChild(opcao);
    });

    if (encontrados.length === 0) {
      sugestoes.textContent = "Nenhum produto encontrado.";
    }

    sugestoes.classList.add("active");
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".header-search")) {
      sugestoes.classList.remove("active");
    }
  });
}

sidebarPagesLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    loadPage(link.dataset.page, link);
  });
});

loadPage("inicio", document.querySelector('[data-page="inicio"]'));
