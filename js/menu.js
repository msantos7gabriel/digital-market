const sidebar_pages_links = Array.from(
  document.querySelectorAll(".sidebar_pages_links"),
);

function sidebar_changes(event, id) {
  sidebar_pages_links.map((page_link) => {
    page_link.classList.remove("is_active");
    page_link.childNodes[1].data = page_link.childNodes[1].data.replace(
      "_active",
      "_deactive",
    );
  });

  let pagina = document.getElementById(`link_${id}`);
  pagina.classList.add("is_active");
  pagina.childNodes[1].data = pagina.childNodes[1].data.replace(
    "_deactive",
    "_active",
  );
  console.log(pagina.childNodes[1].data);
}
