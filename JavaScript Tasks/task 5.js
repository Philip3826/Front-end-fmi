let A = [10,5,13,18,51];
function divide3(array)
{
    return array.filter(i => i%3 == 0);
}

console.log(divide3(A));