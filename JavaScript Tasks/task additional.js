function containsfifty(array)
{
    if (array.includes(50) == true) return true;
    else return false;
}
function isSum50(array)
{
    let sum= array.reduce((sum,curr)=> sum+curr,0);

    if (sum == 50) return true;
    else return false
}
function to50(array)
{
    return 50 - array.reduce((sum,curr)=> sum+curr,0);
}

let array = [3,6,10,15,17,50];
console.log(containsfifty(array));
console.log(isSum50(array));
console.log(to50(array));