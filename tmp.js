'use strict';

function* fib(max) {
    var 
        a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a+b];
        n++;
    }
    return;
}

var f = fib(5);
for (var x of f) {
    console.log(`out: ${x}`);
}