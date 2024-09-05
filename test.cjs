
//写一个闭包的例子

function createCounter() {
  var count = 0;
  return function() {
    return count++;
  };
}

var counter1 = createCounter();
var counter2 = createCounter();
console.dir(counter1); // 0
console.log(counter1()); // 0
console.log(counter1()); // 1
console.log(counter2()); // 0
console.log(counter2()); // 1