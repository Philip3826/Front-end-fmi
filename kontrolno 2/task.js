console.log(document.getElementsByClassName("action"));
const allElArray = Array.from(document.getElementsByClassName("action")) ;
allElArray.forEach(el => el.addEventListener("click", onButtonClick));
const inputField = document.getElementById("input");
const actionArray = Array.from(document.getElementsByClassName("action orange"));
const list = document.getElementById("list");
let rawString = "";
function compareAction()
{
    let last = rawString[rawString.length-1];
    return last == "+" || last == "-" || last=="*" || last=="/";
}

function evaluate()
{
    console.log(rawString);
    inputField.value = eval(rawString);
    const items = JSON.parse(window.localStorage.getItem("history")??"[]");
    items.push(rawString + "=" + eval(rawString).toString());
    window.localStorage.setItem("history",JSON.stringify(items));
    const elToAdd = document.createElement("li");
    elToAdd.innerText=rawString + "=" + eval(rawString).toString();
    list.appendChild(elToAdd);
    rawString = eval(rawString).toString();
}

function onButtonClick(event)
{
    console.log(event.target.innerText);
    if (event.target.className == "action action-btn")
    {
        if (event.target.innerText == "C")
        {
            rawString = "";
            inputField.value = rawString;
        }
        if(event.target.innerText == "√")
        {
            rawString = Math.sqrt(eval(rawString)).toString();
            inputField.value = rawString;
        }
        if(event.target.innerText == "n2")
        {
            rawString = Math.pow(eval(rawString),2).toString();
            inputField.value = rawString;
        }
    }
    else
    {
        if((event.target.className == "action" || event.target.className == "action zero"))
        {
            if (compareAction() || rawString == "")
            {
                inputField.value = event.target.innerText;
            }
            else
            {
                inputField.value+=event.target.innerText;
            }
            rawString+=event.target.innerText;
        }
        else if (event.target.innerText == "=")
        {
            evaluate();
        }
        else if(event.target.innerText == "×")
        {
            rawString+="*";
        }
        else  if(event.target.innerText == "÷")
        {
            rawString+="/";
        }
        else if(event.target.innerText == "+")
        {
            rawString+="+";
        }
        else if(event.target.innerText == "−")
        {
            rawString+="-";
        }
    }
}

function clearHistory()
{
    window.localStorage.clear();
    list.innerHTML="";
}