//写一个闭包的例子

const str = "asdasfaad";

const a = [...str].reduce((a, b) => ((a[b]++||(a[b] = 1)),a), {})

console.log(a);
