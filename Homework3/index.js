
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

    let imgDiv = document.createElement("div");
    imgDiv.classList.add("image-div");
    imgDiv.appendChild(img);
    imgDiv.appendChild(recipeName);

    let category = document.createElement("p");
    category.classList.add("recipe-info");
    category.setAttribute("id","recipe-category")
    category.innerHTML = `${recipe.category},`;


    let origin = document.createElement("p");
    origin.classList.add("recipe-info");
    origin.setAttribute("id","recipe-origin");
    origin.innerHTML = `${recipe.region}`;

    let btn = document.createElement("button");
    btn.classList.add("recipe-button");
    btn.innerText = "See Recipe";
    btn.addEventListener("click",(event)=>{
        toggleDialog(true,recipe);
    })

    let recipeBtnDiv = document.createElement("div");
    recipeBtnDiv.classList.add("recipe-button-container");
    recipeBtnDiv.appendChild(category);
    recipeBtnDiv.appendChild(origin);
    recipeBtnDiv.appendChild(btn);

    li.appendChild(imgDiv);
    li.appendChild(recipeBtnDiv);
    document.getElementsByClassName("menu")[0].appendChild(li);
}

const popUpTemplate = (recipe) =>{
    let div = document.createElement("div");
    div.classList.add("pop-name-container");

    let img = document.createElement("img");
    img.classList.add("pop-up-image");
    img.alt = `${recipe.name}`;
    img.src = `${recipe.image}`;

    let recipeName = document.createElement("p");
    recipeName.classList.add("pop-up-name");
    recipeName.innerHTML = `${recipe.name}`;
    div.appendChild(recipeName);
    
    let instructions = document.createElement("p");
    instructions.classList.add("pop-up-instructions");
    instructions.innerHTML = `${recipe.instruction}`;

    let ingredients = document.createElement("table");
    ingredients.classList.add("ingredients-table");
    let ingredientsArr = recipe.ingredients;
    let keys = Object.keys(ingredientsArr);
   
    let firstRow = document.createElement("tr");
    firstRow.classList.add("table-row");
    let first = document.createElement("td");
    first.innerText = "Ingredients";
    let second = document.createElement("td");
    second.innerText="Measures";
    firstRow.appendChild(first);
    firstRow.appendChild(second);
    ingredients.appendChild(firstRow);
    
    ingredientsArr.forEach((pair)=>{
       let row= document.createElement("tr");
       row.classList.add("table-row");
       let ingredient = `${pair.name}`;
       let measure = `${pair.measure}`;
       let firstCell =  document.createElement("td");
       let secondCell = document.createElement("td");
      
       firstCell.innerText= ingredient;
       secondCell.innerText= measure;

       row.appendChild(firstCell);
       row.appendChild(secondCell);
       ingredients.appendChild(row);
    })


    let btnDiv = document.createElement("div");
    btnDiv.classList.add("close-btn-container");
    let btn = document.createElement("button");
    btn.classList.add("close-dialog-btn");
    btn.innerText = "Close";
    btn.addEventListener("click",(event)=>{
        toggleDialog(false);
    })

    btnDiv.appendChild(btn);
    let dialog = document.getElementById("dialog");
    dialog.style.border="1.5px solid black";
    dialog.appendChild(div);
    dialog.appendChild(img);
    dialog.appendChild(instructions);
    dialog.appendChild(ingredients);
    dialog.appendChild(btnDiv);
   

}

const loadRecipes = async () => {
    const response = await fetch("https://api.npoint.io/51ed846bdd74ff693d7e");
    const json = (await response.json())["meals"];
    const keys = Object.keys(json);
    keys.forEach((element) => recipeBoxTemplate(json[element]));

}


const toggleDialog = (open,recipe) =>{
    let dialog= document.getElementById("dialog");
    let background = document.getElementById("dialog-background");
    
    dialog.toggleAttribute("hidden",!open);
    
    if(open){
         popUpTemplate(recipe);
        background.style.display="block";
       
    }
    else {
        dialog.innerHTML="";
        background.style.display="none";
    }
  //  title.innerText=`${recipe.name}`;
}



async function initialLoad() {
    await loadRecipes();
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
        console.log(li[i]);

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



