'use strict'
// 리듀스 응용
const numbers = [0,1,2,3,4,5,6,7]

const res = numbers.reduce((tot, amt) => {
  console.log(tot,amt)
  if (amt > 0) tot.push(amt)
  return tot
}, [])

// 문제 !!
const arr = ['pdf', 'html', 'html', 'gif', 'gif', 'gif']

const res2 = arr.reduce((cnt, fileType) => {
  console.log(cnt[fileType] || 0)
  cnt[fileType] = (cnt[fileType] || 0) + 1
  return cnt
}, {})

console.log(res2) //res 2