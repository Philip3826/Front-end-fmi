function processData(input) {
    let characters = new Map();
    [...input.toLowerCase()].forEach((i) => {

        if (characters.has(i)) {
            characters.set(i, characters.get(i) + 1);
        } else {
            characters.set(i, 1);
        }
    })

    let appearances = Array.from(characters).map(([key, val]) => val);
    let maxApps = Math.max(...appearances);
    let minApps = Math.min(...appearances);

    if (maxApps === minApps || appearances.length == 0) 
    {
        console.log("GOOD");
    }

    if (maxApps - minApps === 1) {
        let counter = 0;
        appearances.forEach((i) => {
            if (i === maxApps) {
                counter++;
            }
        })
        if (counter > 1) 
        {
            let minCounter =0;
            appearances.forEach((i)=>{
                if (i=== minApps){
                    minCounter++;
                }
            })
            if(minCounter > 1) console.log("UGLY");
                else console.log("BAD");
        }
        else console.log("BAD");
    } else if (maxApps - minApps > 1) {
        appearances.splice(appearances.indexOf(1), 1);
        if (minApps === 1 && (Math.min(...appearances) === Math.max(...appearances))) {
            console.log("BAD");
        } else {
            console.log("UGLY");
        }
    }
}


