const add = (a,b) => {
    return a + b;
} 

const sub = (a,b) =>{
    return a - b;
}

//module.exports = add; // single function export 

// Multi functions exports 

exports.add = add;
exports.sub = sub;


