let array=[];
let date = new Date();

array.push(date);
console.log(array);

let date8 = new Date(2018,11,8,21);
array.push(date8);
console.log(array);

function numberDays(date)
{
    return new Date(date.getFullYear(),date.getMonth(),0).getDate();
}
let infoDate=array.map(date => [numberDays(date),date.getDate()]);
console.log(infoDate);

