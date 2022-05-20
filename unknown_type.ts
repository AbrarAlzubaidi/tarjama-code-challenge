/* 
* used for if you dont know what is the type the user will use
* Benifite: you can store any datatype in it 
        unkownInput = 5;
        unkownInput = "5";
        unkownInput = true;
*/

let unkownInput : unknown;
let userName : string;

if (typeof unkownInput === 'string') {
    userName = unkownInput;
} else {
    new Error('please, enter a string/text');
}
/*
* if unkownInput is a unkown datatype this statement will be an error `userName = unkownInput;`
* because the system does not garantee some inputs will be a string it is just unkown

* but if we put it as this `let unkownInput : any;` it will be accessable, because it will 
* convert the type of userName depends on unknownInput types
        let unkownInput : any;
        let userName : string;

        unkownInput = 5;
        userName = unkownInput
        console.log(userName); // 5
        console.log(typeof userName); // number

        unkownInput = true;
        userName = unkownInput
        console.log(userName); // true
        console.log(typeof userName); // boolean
*/
