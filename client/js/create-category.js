let categoryId = null;
const inputCategory = document.getElementById("floatingName");
const addCategoryButton = document.getElementById("addCategoryButton");
const addText = document.getElementById("addText");

if (localStorage.getItem('currentCategory')) {
    categoryId = localStorage.getItem('currentCategory');
    localStorage.removeItem('currentCategory');
}
async function addCategory(){
    if(categoryId == null){
        await fetch(`http://library/api/?method=addCategory&name=${inputCategory.value}`);
        return;
    }
    await fetch(`http://library/api/?method=updateCategory&name=${inputCategory.value}&id=${categoryId}`);
}

async function getCategory(){
    if(categoryId == null) return;
    const answer = await fetch(`http://library/api/?method=getCategory&id=${categoryId}`);
    const result  = await answer.json();
    const category = result.data;
    inputCategory.value = category.name;
}

addCategoryButton.addEventListener('click', (e) => {
    e.preventDefault();
    addCategory();
    window.location.href='list-category.html';
});

getCategory();

if(categoryId != null){
    addText.innerHTML = `Изменить категорию`;
    addCategoryButton.innerHTML = `Изменить`; 
}

