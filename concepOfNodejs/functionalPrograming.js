'use strict'
// reduce?

const numbers= [10,20,30,40]

const avg = numbers.reduce((tot, val, idx, arr) => {
  console.log(tot, val, idx, arr)
  tot += val
  if (idx === arr.length -1 ) {
    
    return tot/arr.length
  } else {
    return tot
  }
})

console.log(avg)