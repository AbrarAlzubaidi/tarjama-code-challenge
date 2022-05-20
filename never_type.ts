/*
* never will be a type of a function does not return anything or does not console anything.
* also if we have an infinite loop it is a never type
* so the type of function below is void and never
*/
function generateAnError(msg: string, codeNum: number): never {
    throw {
        message: msg,
        codeErrorNumber: codeNum
    }
}

generateAnError('An Error Happens', 501);