const currentMaterial = localStorage.getItem("currentMaterial");
const type = document.getElementById("type");
const category = document.getElementById("category");
const title = document.getElementById("title");
const author = document.getElementById("author");
const description = document.getElementById("description");
const tag = document.getElementById("selectAddTag");
const addTagButton = document.getElementById("addTagButton");
const tagList = document.getElementById("tagList");
const linksList = document.getElementById("linksList");
const signature = document.getElementById("floatingModalSignature");
const inputLink = document.getElementById("floatingModalLink");
const addLinkButton = document.getElementById("addLinkButton");
const modalWindow = document.getElementById("exampleModalToggle");
const openModalWindow = document.getElementById("openModalWindow");
let clickedLinkId = null;

let isButtonAddLink = true;

async function pullData() {
  const answer = await fetch(
    `http://library/api/?method=getMaterial&id=${currentMaterial}`
  );
  const result = await answer.json();
  const data = result.data;

  title.innerHTML = data.title;
  author.innerHTML = data.author;
  description.innerHTML = data.description;
  type.innerHTML = data.type;
  category.innerHTML = data.category;
}

pullData();

async function getTags() {
  const answer = await fetch(`http://library/api/?method=getTags`);
  const result = await answer.json();
  const tags = result.data;
  for (let i = 0; i < tags.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", tags[i].id);
    option.innerHTML = tags[i].name;
    tag.appendChild(option);
  }
}

async function getMaterialTags() {
  const answer = await fetch(
    `http://library/api/?method=getMaterialTags&material_id=${currentMaterial}`
  );
  const result = await answer.json();

  const tags = result.data;

  tagList.innerHTML = ``;
  for (let i = 0; i < tags.length; i++) {
    tagList.innerHTML += `<li class="list-group-item list-group-item-action d-flex justify-content-between">
        <a href="list-materials.html" class="me-3 tagLink">
            ${tags[i].name}
        </a>
        <a href="#" class="text-decoration-none deleteTag">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        </a></li>`;
  }

  const deleteTag = document.getElementsByClassName("deleteTag");
  for (let i = 0; i < deleteTag.length; i++) {
    deleteTag[i].addEventListener("click", () => {
      const answer = confirm("Вы точно хотите удалить тег?");
      if (answer) deleteTagMaterial(tags[i].id);
    });
  }

  const tagLink = document.getElementsByClassName("tagLink");
  for (let i = 0; i < tagLink.length; i++) {
    tagLink[i].addEventListener("click", () => {
      localStorage.setItem("currentTag", tags[i].id);
    });
  }
}

async function getMaterialLinks() {
  const answer = await fetch(
    `http://library/api/?method=getMaterialLinks&material_id=${currentMaterial}`
  );
  const result = await answer.json();

  const links = result.data;

  linksList.innerHTML = ``;
  for (let i = 0; i < links.length; i++) {
    let name = links[i].signature;
    if (name.trim() == "") name = links[i].link;
    linksList.innerHTML += `<li class="list-group-item list-group-item-action d-flex justify-content-between">
    <a href="${links[i].link}" class="me-3">
        ${name}
    </a>
    <span class="text-nowrap">
    <a data-bs-toggle="modal" href="#exampleModalToggle" role="button" class="text-decoration-none me-2 editLink">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             class="bi bi-pencil" viewBox="0 0 16 16">
<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>
    </a>
<a href="#" class="text-decoration-none deleteLink">
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

  const deleteLink = document.getElementsByClassName("deleteLink");
  for (let i = 0; i < deleteLink.length; i++) {
    deleteLink[i].addEventListener("click", () => {
      const answer = confirm("Вы точно хотите удалить ссылку?");
      if (answer) deleteLinkMaterial(links[i].id);
    });
  }

  const editLink = document.getElementsByClassName("editLink");
  for (let i = 0; i < editLink.length; i++) {
    editLink[i].addEventListener("click", () => {
      clickedLinkId = links[i].id;
      signature.value = links[i].signature;
      inputLink.value = links[i].link;
      let text = document.getElementById("exampleModalToggleLabel");
      text.innerHTML = "Изменить ссылку";
      addLinkButton.innerHTML = "Изменить";
      isButtonAddLink = false;
    });
  }
}

getTags();

async function addTagToMaterial() {
  const answer = await fetch(
    `http://library/api/?method=addTagToMaterial&material_id=${currentMaterial}&tag_id=${tag.value}`
  );
  const result = await answer.json();
  if (result.data) getMaterialTags();
}

async function deleteTagMaterial(id) {
  await fetch(
    `http://library/api/?method=deleteTagMaterial&material_id=${currentMaterial}&tag_id=${id}`
  );
  getMaterialTags();
}

async function addLinkToMaterial() {
  const answer = await fetch(
    `http://library/api/?method=addLinkToMaterial&
      material_id=${currentMaterial}&
      signature=${signature.value}&
      link=${inputLink.value}`
  );
  const result = await answer.json();
  if (result.data) {
    getMaterialLinks();
    return true;
  } 
  return false;
}

async function deleteLinkMaterial(id) {
  await fetch(`http://library/api/?method=deleteLinkMaterial&id=${id}`);
  getMaterialLinks();
}

addTagButton.addEventListener("click", () => {
  addTagToMaterial();
});

addLinkButton.addEventListener("click", () => {
  if(inputLink.value.trim() == ''){
    inputLink.classList.add("is-invalid");
    return;
  }
  if(isButtonAddLink){
    const isOk = addLinkToMaterial();
    if(isOk) $('#exampleModalToggle').modal('hide');
  } 
  else {
    editLink();
    $('#exampleModalToggle').modal('hide');
  };
});

openModalWindow.addEventListener("click", () => {
  let text = document.getElementById("exampleModalToggleLabel");
  text.innerHTML = "Добавить ссылку";
  addLinkButton.innerHTML = "Добавить";
  isButtonAddLink = true;
});

async function editLink() {
  await fetch(`http://library/api/?method=updateLink&id=${clickedLinkId}&material_id=${currentMaterial}&signature=${signature.value}&link=${inputLink.value}`);
  getMaterialLinks();
}

getMaterialTags();
getMaterialLinks();
