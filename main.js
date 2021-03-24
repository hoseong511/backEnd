"use strict";

const queue = []
queue.push(1)
queue.push(2)
console.log(queue);
const r = queue.shift();
console.log(r);
console.log(queue);

const stack = []
stack.push(2)
stack.push(3)
console.log(stack);
const f = stack.pop();
console.log(f);
console.log(stack);