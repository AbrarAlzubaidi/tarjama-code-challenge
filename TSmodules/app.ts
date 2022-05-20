function add(num1:number, num2:number){ // always just accept number as a parameters else it will producce an error
    return num1 + num2;
}

let n1 = 5;
let n2 = 4;

console.log(add(n1, n2));

function concatinate(str1:string, str2:string){ // always just accept string as a parameters else it will producce an error
    return str1 + str2;
}

let str1 = 'Hello';
let str2 = ' World !!!';

console.log(concatinate(str1, str2));


function boolean(b1: boolean, b2: boolean){// always just accept boolean as a parameters else it will producce an error
    if(b1){
        return b2;
    }else{
        return b1;
    }
}

let b1 = true;
let b2 = true;

console.log(boolean(b1, b2));

function objects(ob1: object, ob2: object){
    return {
        object1: ob1,
        object2: ob2
    };
}

let ob1:{
    name: string;
    age: number;
    // hoppies: object;// we can declare it as object because arrays are an object
    hoppies: string[]; // or we can declare it as this -> datatype[]
   
    /*
    ! important note: if the array have multi-datatype the solutions are: 
    !                           1. declare it as object
    !                           2. declare it as any[]
    */ 
    role: [number, string]; // tuple: fixed length with fixed datatype for the elements. 
} = {
    name:"aaaaa",
    age: 30,
    hoppies: ['walking', 'sleeping'],
    role: [1, 'admin']
};

enum Role {ADMIN, READ_ONLY_USER, AUTHER}

let ob2 = {
    name:"lllll",
    age:12,
    role: Role.ADMIN
};

console.log(objects(ob1, ob2));
for(let hoppy of ob1.hoppies){
    console.log(hoppy.concat('hhh'));
}