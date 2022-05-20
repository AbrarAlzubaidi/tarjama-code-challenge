//* functions returns type
function add(n1: number, n2: number): number {
    return n1 + n2;
}

function printResult(res: number): void {
    console.log(res);
}

printResult(add(10,50));

let combineNumbers: (a: number, b: number) => number;
// let combineNumbers: Function // if i did this it will accept any function regardless of its returning value or behavior

combineNumbers = add;
// combineNumbers = printResult;  // ERROR
console.log(combineNumbers(4,4));

//* callbacks function as a parameter inside a function:

function addAndCallBack(n1: number, n2: number, callback: (result: number) => void) {
    let result = n1 + n2;
    callback(result);
}
addAndCallBack(5,5,(result)=>{
    console.log(result);
})