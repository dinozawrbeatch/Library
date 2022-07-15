let currentMaterial = null;

if (localStorage.getItem('currentMaterial')) {
    currentMaterial = localStorage.getItem('currentMaterial');
    localStorage.removeItem('currentMaterial');
}

const type = document.getElementById('floatingSelectType');
const category = document.getElementById('floatingSelectCategory');
const title = document.getElementById('floatingName');
const author = document.getElementById('floatingAuthor');
const description = document.getElementById('floatingDescription');
const addForm = document.getElementById('addForm');

async function getTypes() {
    const answer = await fetch('http://library/API/?method=getTypes');
    const result = await answer.json();
    const types = result.data;
    for (let i = 0; i < types.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', types[i].id);
        option.innerHTML = types[i].name;
        type.appendChild(option);
    }
}

async function getCategories() {
    const answer = await fetch('http://library/API/?method=getCategories');
    const result = await answer.json();
    const categories = result.data;
    for (let i = 0; i < categories.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', categories[i].id);
        option.innerHTML = categories[i].name;
        category.appendChild(option);
    }
}

async function fillPage() {
    if (currentMaterial == null) {
        return;
    }
    const answer = await fetch(`http://library/api/?method=getMaterial&id=${currentMaterial}`);
    const result = await answer.json();
    const data = result.data;
    for (let i = 0; i < type.options.length; i++) {
        if (data.id_type === type.options[i].value) {
            type.selectedIndex = i;
        }
    }
    for (let i = 0; i < category.options.length; i++) {
        if (data.id_category === category.options[i].value) {
            category.selectedIndex = i;
        }
    }
    title.value = data.title;
    author.value = data.author;
    description.value = data.description;
}

getTypes();

getCategories();

fillPage();

addForm.addEventListener('submit', updateMaterial);
function updateMaterial(e) {
    e.preventDefault();
    if(!validateForm()) return;
    if (currentMaterial != null) {
        fetch(`http://library/API/?method=updateMaterial&
            id=${currentMaterial}&
            type=${type.value}&
            category=${category.value}&
            title=${title.value}&
            author=${author.value}&
            description=${description.value}`);
            window.location.href='list-materials.html';
        return;
    }
    fetch(`http://library/API/?method=addMaterial&
        type=${type.value}&
        category=${category.value}&
        title=${title.value}&
        author=${author.value}&
        description=${description.value}`);
    window.location.href='list-materials.html';
}

function validateForm(){
    let status = true;
    if(type.value == 'null'){
        type.classList.add("is-invalid");
        status = false;
    }
    if(category.value == 'null'){
        category.classList.add("is-invalid");
        status = false;
    }
    if(title.value.trim() == ''){
        title.classList.add("is-invalid");
        status = false;
    }
    return status;
}

