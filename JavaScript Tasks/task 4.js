let A = [11,5,13,18,51];
function lessThan10(array)
{
    for(let i of array)
    {
        if(i <= 10) return true;
    }

    return false;
}
console.log(lessThan10(A));

console.log(A.some(i => i <10));