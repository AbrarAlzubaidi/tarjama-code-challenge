//* Type Aliases:
type CombineFunction = number | string;

//* Union Type
function combine(num1: CombineFunction, num2: CombineFunction) {
    let res;
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        res = num1 + num2;
    }
    else {
        res = num1.toString() + num2.toString();
    }
    return res;
}

console.log(combine(1, 5));
console.log(combine("a", "b"));

//* Literal Type
function combine2(
    num1: CombineFunction,
    num2: CombineFunction,
    resulttype: "as a number" | 'as a string' // this here is a literal type
    ) {
    let res;
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        if (resulttype === 'as a number') {
            res = num1 + num2;
        } else {
            res = num1.toString() + num2.toString();
        }
    }
    else {
        if (resulttype === 'as a number') {
            res = +num1 + +num2;
        } else {
            res = num1.toString() + num2.toString();
        }
    }
    return res;
}

console.log(combine2(1, 5, 'as a number')); // 6
console.log(combine2(1, 5, 'as a string')); // 15
console.log(combine2("a", "b", 'as a string')); // ab
console.log(combine2("a", "b", 'as a number')); // NaN


