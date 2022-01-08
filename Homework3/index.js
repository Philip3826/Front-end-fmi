//const { async } = require("fast-glob");
//const { object } = require("webidl-conversions");

const recipeBoxTemplate = (recipe) => {
    let li = document.createElement("li");
    li.classList.add("recipe-box");

    let img = document.createElement("img");
    img.classList.add("recipe-img");
    img.alt = `${recipe.name}`;
    img.src = `${recipe.image}`;

    let recipeName = document.createElement("p");
    recipeName.classList.add("recipe-name");
    recipeName.innerHTML = `${recipe.name}`;

    let category = document.createElement("p");
    category.classList.add("recipe-info");
    category.setAttribute("id","recipe-category")
    category.innerHTML = `${recipe.category},`;


    let origin = document.createElement("p");
    origin.classList.add("recipe-info");
    origin.innerHTML = `${recipe.region}`;

    let btn = document.createElement("button");
    btn.classList.add("recipe-button");
    btn.innerText = "See Recipe";

    li.appendChild(img);
    li.appendChild(recipeName);
    li.appendChild(category);
    li.appendChild(origin);
    li.appendChild(btn);
    document.getElementsByClassName("menu")[0].appendChild(li);
}

const popUpTemplate = (recipe) =>{
    let div = document.createElement("div");
    div.classList.add("pop-up-Box");

    let img = document.createElement("img");
    img.classList.add("pop-up-image");
    img.alt = `${recipe.name}`;
    img.src = `${recipe.image}`;

    let recipeName = document.createElement("p");
    recipeName.classList.add("pop-up-name");
    recipeName.innerHTML = `${recipe.name}`;
    
    let instructions = document.createElement("p");
    instructions.classList.add("pop-up-instructions");
    instructions.innerHTML = `${recipe.instruction}`;

    div.appendChild(recipeName);
    div.appendChild(img);
    div.appendChild(instructions);
    document.getElementById("dialog").appendChild(div);
}

const loadRecipes = async () => {
    const response = await fetch("https://api.npoint.io/51ed846bdd74ff693d7e");
    const json = (await response.json())["meals"];
    const keys = Object.keys(json);
    keys.forEach((element) => recipeBoxTemplate(json[element]));

}

// add toggle fun

const addEventListeners = ()=>{
    let buttons = document.querySelectorAll(".recipe-button");
    buttons.forEach((button)=>{
        
        button.addEventListener("click",async(event)=>{
            console.log("event");
            const parentNode = event.target.parentNode;
            const recipeTitle = parentNode.querySelector(".recipe-name").innerText;
            const response = await fetch(`https://api.npoint.io/51ed846bdd74ff693d7e=${recipeTitle}`);
            const jsonVar = await response.json();
            const keys = Object.keys(jsonVar);


            keys.forEach((element)=>popUpTemplate(element));
            // here function for toggle
        })
    })
    
}

async function initialLoad() {
    await loadRecipes();
    addEventListeners();

}
initialLoad();

function filterFunction() {
    let inputName = document.getElementById("name-filter");
    let nameValue = inputName.value.toLowerCase();

    let inputCat = document.getElementById("category-filter");
    let catValue = inputCat.value.toLowerCase();
    
    let inputRegion = document.getElementById("region-filter");
    let regionValue = inputRegion.value.toLowerCase();
    
    let ul = document.getElementById("recipe-list");
    let li = ul.getElementsByTagName("li");
   

    for(let i = 0  ; i < li.length;i++){
        let isFiltered = false;
        let nameList = li[i].getElementsByTagName("p")[0];
        let nameListStr = nameList.textContent;

        let catList = li[i].getElementsByTagName("p")[1];
        let catListStr = catList.textContent;

        let regionList = li[i].getElementsByTagName("p")[2];
        let regionListStr = regionList.textContent;
        

        if((nameListStr.toLowerCase().indexOf(nameValue) > -1) || (regionListStr.toLowerCase().indexOf(regionValue) < -1)){
            li[i].style.display="";
            isFiltered = true;
        }
        else{
            li[i].style.display="none";
        }
       ///////////////////////////////////////////////////////////////
       let secondFilter = false;
       if(regionListStr.toLowerCase().indexOf(regionValue) > -1 && isFiltered){
             li[i].style.display="";
             secondFilter= true;
        }
        else{
             li[i].style.display="none";
        }
///////////////////////////////////////////////////////////////////////////////////
        if(catListStr.toLowerCase().indexOf(catValue) > -1 && isFiltered && secondFilter){
             li[i].style.display="";
             
        }
        else{
        li[i].style.display="none";
        }
      
}

}
