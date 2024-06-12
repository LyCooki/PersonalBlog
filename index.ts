let obj1 = {
  name: "obj1",
  age: 18,
};

let obj2 = {
  name: "obj2",
  age: 20,
};

obj1 = obj2;

console.log(obj1, obj2);

obj1.name = "obj1-new";
console.log(obj1, obj2);

let arr;

type Persons = {
  id: string;
  name: string;
  age: number;
};
function add<T>(arr: T): T {
  // arr.push(arr[0]);
  return arr;
}

add<{ list: Persons }>({ id: "1", name: "John", age: 25 });
