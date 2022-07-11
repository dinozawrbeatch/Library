const categoryList = document.getElementById("categoryContainer");

async function getCategories() {
  const answer = await fetch(`http://library/api/?method=getCategories`);
  const result = await answer.json();
  const categories = result.data;
  categoryList.innerHTML = `<li class="list-group-item d-flex justify-content-between">
                            <strong>Название</strong>
                        </li>`;
  for (let i = 0; i < categories.length; i++) {
    categoryList.innerHTML += `<li class="list-group-item list-group-item-action d-flex justify-content-between">
        <span class="me-3">
            ${categories[i].name}
        </span>
        <span class="text-nowrap">
        <a href="create-category.html" class="text-decoration-none me-2 editCategoryButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
  </svg>
        </a>
    <a href="#" class="text-decoration-none deleteCategoryButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    </a>
    </span>
    </li>`;
  }

  const deleteCategoryButton = document.getElementsByClassName("deleteCategoryButton");
  for (let i = 0; i < deleteCategoryButton.length; i++) {
    deleteCategoryButton[i].addEventListener("click", () => {
      const answer = confirm("Вы точно хотите удалить тег?");
      if (answer) deleteCategory(categories[i].id);
    });
  }

  const categoryLink = document.getElementsByClassName("categoryLink");
  for (let i = 0; i < categoryLink.length; i++) {
    categoryLink[i].addEventListener("click", () => {
      localStorage.setItem("currentCategory", categories[i].id);
    });
  }

  const editCategoryButton =
    document.getElementsByClassName("editCategoryButton");
  for (let i = 0; i < editCategoryButton.length; i++) {
    editCategoryButton[i].addEventListener("click", () => {
      localStorage.setItem("currentCategory", categories[i].id);
    });
  }
}

async function deleteCategory(id) {
  await fetch(`http://library/api/?method=deleteCategory&id=${id}`);
  getCategories();
}

getCategories();
