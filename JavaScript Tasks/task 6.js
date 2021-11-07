let A = [10,5,13,18,51];
function sumArr(array)
{
    return array.reduce((sum,current) => sum + current);
}
console.log(sumArr(A));
