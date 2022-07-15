let tagLink = null;

if (localStorage.getItem("currentTag")) {
  tagLink = localStorage.getItem("currentTag");
  localStorage.removeItem("currentTag");
}

const buttonFind = document.getElementById("button-addon1");
const buttonDelete = document.getElementById("buttonDelete");
const table = document.getElementById("tableId");
const input = document.getElementById("findInput");
let arr = [];

function pullMaterials() {
  table.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    table.innerHTML += `
        <tr>
                        <td><a href="view-material.html" class="titleHref">${arr[i].title}</a></td>
                        <td>${arr[i].author}</td>
                        <td>${arr[i].type}</td>
                        <td>${arr[i].category}</td>
                        <td class="text-nowrap text-end">
                            <a href="create-material.html" class="text-decoration-none me-2 editMaterial">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                </svg>
                            </a>
                            <a href="#" class="text-decoration-none deleteMaterial">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd"
                                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </a>
                        </td>
                    </tr>
        `;
  }
  const deleteButtons = document.getElementsByClassName("deleteMaterial");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      const answer = confirm("Вы точно хотите удалить материал?");
      if (answer) deleteMaterial(arr[i].id);
    });
  }

  const editButtons = document.getElementsByClassName("editMaterial");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", () => {
      localStorage.setItem("currentMaterial", arr[i].id);
    });
  }

  const titleHref = document.getElementsByClassName("titleHref");
  for (let i = 0; i < titleHref.length; i++) {
    titleHref[i].addEventListener("click", () => {
      localStorage.setItem("currentMaterial", arr[i].id);
    });
  }
}

async function getAllMaterials() {
  if (tagLink != null) {
    const answer = await fetch(
      `http://library/api/?method=getMaterialsByTag&tag_id=${tagLink}`
    );
    const result = await answer.json();
    arr = result.data;
    pullMaterials();
    return;
  }
  const answer = await fetch("http://library/api/?method=getAllMaterials");
  const result = await answer.json();
  arr = result.data;
  pullMaterials();
}

buttonFind.addEventListener("click", () => {
  findMaterial(input.value);
});

async function findMaterial(str) {
    if (str.length == 0) {
        getAllMaterials();
        return;
      }

  const answer = await fetch(
    `http://library/api/?method=findMaterial&str=${str}`
  );
  const result = await answer.json();
  arr = result.data;
  pullMaterials();
}

async function deleteMaterial(id) {
  const answer = await fetch(
    `http://library/api/?method=deleteMaterial&id=${id}`
  );
  const result = await answer.json();
  arr = result.data;
  getAllMaterials();
}

getAllMaterials();
