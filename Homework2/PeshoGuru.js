function processData(input) {
    let evaledInput = eval(input);
    let result = [];
    let numberCount = 0;

    function reverseString(string) {
        return string.split("").reverse().join("");
    }
    [...evaledInput].forEach(element => {
        let type = typeof (element);
        if (type === "string") {
            result.push(reverseString(element));
        } else if (type === "number") numberCount++;
        else if (type === "object" && !Array.isArray(element)) {
            let object = Object.entries(element);
            //push string "key:value"
            result.push(`${object[0][0]}: ${object[0][1]}`).toString();
        } else if (Array.isArray(element)) {
            let arrayCpy = element;
            while (arrayCpy.some(Array.isArray)) {
                arrayCpy = arrayCpy.flat();
            }
            result.push(arrayCpy.sort());

        } else if (type === "function") {
            result.push(element(42));
        }
    })

    if (numberCount) result.unshift(numberCount);
    console.log(JSON.stringify(result));
    return result;
}

processData(["test", 1, "world", "42", [1, 2, 3, [1, 2], 4, [
    [1, 2]
]]]);