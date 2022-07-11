let tagId = null;
const inputTag = document.getElementById("floatingName");
const addTagButton = document.getElementById("addTagButton");
const addText = document.getElementById("addText");

if (localStorage.getItem('currentTag')) {
    tagId = localStorage.getItem('currentTag');
    localStorage.removeItem('currentTag');
}

async function addTag(){
    if(tagId == null){
        await fetch(`http://library/api/?method=addTag&name=${inputTag.value}`);
        return;
    }
    await fetch(`http://library/api/?method=updateTag&name=${inputTag.value}&id=${tagId}`);
}


async function getTag(){
    if(tagId == null) return;
    const answer = await fetch(`http://library/api/?method=getTag&id=${tagId}`);
    const result  = await answer.json();
    const tag = result.data;
    inputTag.value = tag.name
}

addTagButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTag();
    window.location.href='list-tag.html';
});

getTag();

if(tagId != null){
    addText.innerHTML = `Изменить тег`;
    addTagButton.innerHTML = `Изменить`; 
}