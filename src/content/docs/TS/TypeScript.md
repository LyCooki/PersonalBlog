---
title: TypeScript基础
description: A guide in my new Starlight docs site.
---

## TS 简介

TS 是 JS 的超集, 兼容 JS, 也提供强类型特性, 把 JS 提升了一个新的高度。</br>
TS 在原生 JS 的基础上, 加了一层类型定义.<mark>TS 无法在浏览器中运行, 需要借助工具进行编译(compile)</mark>。如下图所示。</br>

![ts编译图](@/assets/img/TS/TS-1.png)

## TS 的优点

1. 规范我们的代码
2. 代码编译阶段就能及时发现错误
3. 可以提供类型检查, 避免低级错误, 解放劳动力
4. 帮助我们写出更高质量的代码
5. 支持 JS 最新特性(包含 ES6/7/8)

## 基本数据类型

### 数字 number

:::note
如果两个变量数据类型都是数字则+运算符起计数作用，如果两个变量数据类型有一个为字符型则+运算符起连接作用
:::

```ts
const a = 123;
const b = 456;
function add(num1, num2) {
  return num1 + num2;
}
console.log(add(a, b)); //579
```

### 布尔 boolean

**TS 可以在初始化变量的时候, 自动识别类型, 类型一旦确定, 不能更改**

```typescript
let log = true;
log = "hello"; //会报错显示无法将string类型分配给类型boolean
//也可以手动显示的设置数据类型
let log: string;
```

### 字符串 string

```typescript
var aaa: string;
var bbb: string;
var ccc: string;

aaa = "zhangsan";
bbb = "lisi";
ccc = `wangwu`;
```

### 数组 array

**数组中可以存放任意类型的数据, 使用[]比如我们想定义一个全是数字的数组, 有三种写法**

:::note
**尽量使用泛型来定义数据，这样的好处在于确保数据的类型正确维持系统稳定。**
:::

```typescript
// 定义一个list1, 类型是number数组
let list1: number[] = [1, 2, 3, 4, 5];
// 定义一个list2, 类型是number数组
let list2: Array<number> = [6, 7, 8, 9, 0];
// 定义一个list3, 类型是number数组
let list3 = [1, 2, 3, 4, 5];

//无法push定义的类型以外其它的类型值到数组中。
```

**如果你让数组, 既可以包含字符串, 又可以包含数字, 可以这么写**
:::note
**any[]此种方式会绕过类型检查。可能造成运行时的错误。**
:::

```typescript
let list4 = [1, "a"];
let list5: any[] = [1, "a"];
let list6: Array<any> = [1, "a"];

list4.push("aaa");
list5.push(123);
list6.push("abcd");

//此段代码可以看出 list4 为推断类型即从数组中的值判断 list4 数组可接受的值为数字或字符串
//list5 为 any 类型即显式类型，any[] 表示一个元素类型为 any 的数组。
//list6 这种方式使用了泛型类型语法，Array<any> 是 TypeScript 中的一种泛型数组类型。这里的 any 表示数组中的元素可以是任意类型
```

### 元组 tuple

**元组即一个特殊的数组，固定长度，固定类型**

:::note

**还有一点要注意, 元组声明的时候一定要指定类型, 如果不写, 会变成联合类型数组**
:::

```ts
let person: [number, string] = [11111, "zhangsan"];
person.push("123");
console.log(person);
//person数组固定长度为2，第一个元素的值类型为数字，第二个元素的值类型为字符串。
//这里push会成功放进person数组中，是一个小bug，但是使用person[2]并不会读取到该值，只有打印整个数组才会看到新push的值。
```

### 联合类型 union

**联合类型, 顾名思义, 一个变量可以支持多种类型**

```ts
let a: string | number;
//a 可以赋值字符串, 可以赋值数字, 都没有问题, 但是不能赋值其他类型
```

### 字面量类型 literal

**即给定的值即为他的取值范围**

```ts
const a = 123; //a由于const的作用只能是123
let b = 456; //b的类型则为number

let a: 0 | 1 | 2; //a的值可以是0|1|2中的任意一个 把3赋值给a则会报错。
a = 1;
a = 2;
a = 3;
```

### 枚举类型 Enum

**类似 C 语言中的枚举**

```ts
// 定义颜色的枚举类型
enum Color {
  red,
  green,
  blue,
}
// 使用默认从0开始递增
console.log(Color.red); // 0
console.log(Color.green); // 1
console.log(Color.blue); // 2
//也可自定义数值，或者字符串等。
// 定义颜色的枚举类型
enum Color {
  red = 1,
  green = 3,
  blue = 5,
}
// 使用
console.log(Color.red); // 1
console.log(Color.green); // 3
console.log(Color.blue); // 5
```

### 任意类型 any

**设置该类型表示数据类型不受约束。any 类型, 就是没有类型限制, 相当于和原生 JS 一样, 设计 any 类型的目的就是为了兼顾原生 JS 的灵活性和 TS 的严谨性**

```ts
let a: any;
a = 123;
a = "hello";
a = true;
a = [1, 2, 3];
a = { name: "zhangsan" };
```

### 未知类型 unkown

:::note
any 适合代码的快速成型和上线, 但是可能会留下安全隐患
unkown 会多一些限制, 可以保证类型的安全。unkown 未知类型和 any 很像, 不限制类型, 但是可以保证类型安全和 any 对比一下, 代码如下
:::

```ts
let a: any;
a = 123;
a();
a.toUpperCase();
//不会报错

let a: unknow;
a = 123;
a();
a.toUpperCase();
//会报错提示a的类型为"未知"
```

### 空白类型 void

:::note
void 类型不仅仅用于函数，还可以用于变量的类型注解。在变量的类型注解中，void 表示该变量可以存储 undefined 或 null，或者用于标识不需要存储任何值的情况。
:::

```ts
let someVoidFunction: () => void; // 声明了一个函数类型的变量，该函数没有返回值

function logMessage(message: string): void {
  // 声明了一个函数，没有返回值
  console.log(message);
}

let voidVariable: void; // 声明了一个变量，该变量的类型为 void，可以存储 undefined 或 null

voidVariable = undefined;
voidVariable = null;

//也可通过设置其它type类型设置返回值
function demo(): type {}
function demo(): number {} //即返回值为number类型
```

### 未定义 undefined

:::note
如果设置为 undefined, 必须写上 return, 因为 undefined 既可以是数据类型, 又可以是值, TS 把它当成了值, 所以必须写 return
:::

```ts
function demo(): undefined {
  console.log("hello");
  return; //不写return会报错。
}
```

### 永不 never

:::note
never 是一个表示永远不会出现的值的类型。它通常用于描述永远不会正常返回的函数的返回值类型，或者用于标识永远不会被赋值的变量的类型
:::

```ts
//作为函数返回类型：当函数抛出异常或者无限循环等导致无法正常返回时，可以将该函数的返回类型声明为 never。
function throwError(message: string): never {
  throw new Error(message);
}
//作为变量的类型：当一个变量被断言为永远不会被赋值，可以将其类型标注为 never。
let unreachable: never;
unreachable = (() => {
  throw new Error("This code path is unreachable");
})();
```

### 类型断言/类型适配 Type Assertions

**本质上告诉 TypeScript 编译器某个变量的确切类型。**
:::note
使用 as 语法进行类型断言在某些情况下更推荐，因为它在 JSX/TSX 语法中更加安全。
:::

```ts
// 使用尖括号进行类型断言
let a: any = "hello";
let b1 = <string>a; // 将变量 a 断言为 string 类型
console.log(b1.toUpperCase()); // 在编译时不会报错，因为此时 b1 被视为 string 类型

// 使用 as 进行类型断言
let b2 = a as string; // 将变量 a 断言为 string 类型
console.log(b2.toUpperCase()); // 在编译时不会报错，同样被视为 string 类型

// 使用尖括号进行类型断言在 JSX/TSX 语法中的限制
// 注意：下面的代码在 TypeScript 中可以编译通过，但在 JSX/TSX 语法中会报错
let c1: any = <span>Hello</span>;
// let d1 = <string>c1; // 编译时会报错，在 JSX/TSX 中不允许使用尖括号进行类型断言

// 使用 as 进行类型断言在 JSX/TSX 语法中的安全性
let c2: any = <span>Hello</span>;
let d2 = c2 as string; // 使用 as 进行类型断言是安全的
console.log(d2.toUpperCase()); // 在编译时不会报错，因为此时 d2 被视为 string 类型

```

### 函数类型 function

**声明函数的语法和 ES6 一致**

```ts
let a = function (message) {
  console.log(message);
};
let b = (message) => console.log(message);

//可以在函数参数设定接收数据类型
let b = (message: string, code: number) => console.log(message, code);
b("Hello", 123);

//在调用的时候 多传，少传，错传都不可以。会报错。如果有可选参数需在参数后跟?。
let b = (message: string, code?: number) => console.log(message, code); //这个时候参数不传, 默认 undefined, 称之为可选参数
```

### 对象类型 object

:::note
在 JS 中, 如果访问不存在的属性, 会返回 undefined
在 TS 中, 如果访问不存在的属性, 会报错。
js 中的对象类型是键值对。
ts 中的对象类型是键值类型对，表示赋值的时候类型也必须匹配
:::

```ts
const user = {
  username: "lisi",
  age: 15,
  sex: "male",
};
console.log(user.phone); //会报错

user.age = "3"; // 会报错类型错误。
```

### 接口 interface

:::note
接口用来规范数据的类型。
:::

```ts
// 定义一个接口
interface Pos {
  x: number;
  y: number;
}

function demo1(position: Pos) {
  //解构赋值
  const { x, y } = position;
  console.log(`x轴位置: ${x}, y轴位置: ${y}`);
}

demo({ x: 111, y: 222 });
demo({ x: "hello", y: "world" });
demo({ a: 1, b: 2 });

function demo2(x: number, y: number) {
  console.log(`x轴位置: ${x}, y轴位置: ${y}`);
}
//demo1和demo2功能上没有差别，使用接口声明参数能够提高代码的可读性和可维护性，特别是当参数比较复杂时，推荐使用接口来描述参数的结构。
```

### 类 class

**类中的 constructor 即构造函数用于初始化类的属性或执行其他必要的操作。**
:::note
类执行接口用来规范数据的类型。类中构造函数中的参数必须在类中显式定义否则报错属性不存在。
:::

```ts
interface IPoint {
  x: number;
  y: number;
  drawPoint: () => void;
  getDistance: (point: { x: number; y: number }) => number;
}
//类实现接口的属性和方法如下。
class Point implements IPoint {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  drawPoint = () => {
    console.log(this.x, this.y);
  };
  getDistance = (point: { x: number; y: number }) => {
    const a = Math.abs(point.x - this.x);
    const b = Math.abs(point.y - this.y);
    return Math.sqrt(a * a + b * b);
  };
}
//这里类中要有x和y是因为接口有的属性和方法，类中一定要出现，不写会被认为是私有变量。
```

##### 类中参数属性

**使用参数属性（Parameter Properties）来自动将构造函数参数赋值给类的属性：**

```ts
class Animal {
  constructor(private name: string) {} //必须添加private、public、protected访问修饰符，否则需要显式定义。
  // constructor会自动声明属性并为其赋值等同于如下代码。
  /*class Animal{
      name:string;
     constructor(name: string) {
      this.name = name
     }
  }*/

  drawPoint = () => {
    console.log(this.name);
  };
}
```

##### 抽象类

**抽象类是一种特殊的类，它不能被实例化，只能被继承，抽象类中的抽象方法必须被子类实现。**

```ts
abstract class Animal {
  constructor(public name: string) {}
  abstract drawPoint(): void; //抽象方法，子类必须实现
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  drawPoint() {
    console.log(this.name + " is drawing a point");
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }
  drawPoint() {
    console.log(this.name + " is drawing a point");
  }
}
```

### 访问修饰符 Access Modifier

**类的属性和方法, 默认是 public**
| 调用位置 | public(公共的) | protected(受保护的)| private(私有的)|
| :------------:| :------------:| :------------:| :------------:|
| 类外部(实例化对象) | ✔️ |❌|❌|
| 类内部(子类) | ✔️ |✔️|❌|
| 类内部(自身) | ✔️ |✔️|✔️|

1. **受保护的属性（protected）：**

**<mark>受保护的属性只能在类内部和派生类中访问，不能在类的实例中直接访问。</mark>可以通过在属性声明前加上 protected 关键字来定义受保护的属性。**

```ts
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
    console.log(this.name); // 在派生类中可以访问父类的受保护属性
  }
}

let dog = new Dog("Buddy");
```

2. **私有属性（private）：**

**<mark>私有属性只能在类内部访问</mark>，派生类中也无法访问。可以通过在属性声明前加上 private 关键字来定义私有属性。<mark>私有方法访问方式类似</mark>。**

```ts
class Person {
  private age: number;

  constructor(age: number) {
    this.age = age;
  }

  getAge(): number {
    return this.age;
  }
}

let person = new Person(25);
// console.log(person.age); // 报错，无法访问私有属性
console.log(person.getAge()); // 可以通过公有方法访问私有属性
```

3. **Getter 和 Setter**

**Getter 方法用于获取私有属性的值，而 setter 方法用于设置私有属性的值。**

```ts
class Point implements IPoint {
  constructor(private _x: number, private _y: number) {}
  drawPoint = () => {
    console.log(this._x, this._y);
  };
  getDistance = (point: { x: number; y: number }) => {
    const a = Math.abs(point.x - this._x);
    const b = Math.abs(point.y - this._y);
    return Math.sqrt(a * a + b * b);
  };
  //下列4个函数即为属性访问器get用于获取，set用于设置。
  get X() {
    return this._x;
  }
  set X(value: number) {
    this._x = value;
  }
  get Y() {
    return this._y;
  }
  set Y(value: number) {
    this._y = value;
  }
}
```

## 模块 module

```ts
export class Person {
  private age: number;

  constructor(age: number) {
    this.age = age;
  }

  getAge(): number {
    return this.age;
  }
} //导出以后可以在其它ts文件中使用import导入进行实例化
//新文件中
import { Person } from "文件存放位置";
const Jack = new Person(20);
```

## 泛型 Generics

**泛型用来解决两个值之间存在的对应关系, 在这里就是输入和输出的对应关系**

```ts
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

**常见的泛型类型参数包括：**

- T：通用类型参数，表示任意类型。

```ts
function identity<T>(arg: T): T {
  return arg;
}
//当你在调用 identity 函数时，你可以用任何类型来替换 T。例如，如果你调用 identity<number>(123)，那么在这个函数调用中，T 就代表了 number 类型。如果你调用 identity<string>('hello')，那么 T 就代表了 string 类型。
//加<number>和不加都不影响代码运行，不加会自动识别，加了必须按照给定的类型传参
const result = identity<number>(42); // 返回 42
```

- U、V、W：用于多个泛型参数时的额外参数。

```ts
function pair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}
///这里myPair是一个数组，在js中数组就是一个特殊的对象使用typeof会返回object。
const myPair = pair<string, number>("hello", 42); // 返回 ['hello', 42]
```

## 类型守卫 Type Guards

**用于在运行时检查变量的类型，并在检查通过后将变量的类型缩小为更具体的类型。类型守护可以帮助开发者在代码中处理不同类型的数据，以确保类型的安全性和正确性。**

**1. 类型判断 typeof:使用 typeof 操作符来检查变量的类型。**

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

**2. 实例判断 instanceof：使用 instanceof 操作符来检查变量是否属于某个类的实例。例如：**

> 本质就是判断 animal 的原型链是否包含 Dog.prototype 或 Cat.prototype。

```ts
class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

function getAnimalType(animal: Animal) {
  if (animal instanceof Dog) {
    return "Dog";
  } else if (animal instanceof Cat) {
    return "Cat";
  } else {
    return "Unknown";
  }
}
```

**3. 属性判断 in：检查某个属性是否存在一个对象中。**

```ts
interface Foo {
  foo: string;
}

interface Bar {
  bar: string;
}

function test(input: Foo | Bar) {
  if ("foo" in input) {
    // 在这里，input 的类型被收紧为 Foo
  } else {
    // 在这里，input 的类型被收紧为 Bar
  }
}
```

**4. 自定义守卫允许我们在块级作用域中获得更精确的变量类型，从而避免不必要的类型断言。**

```ts
//类型检查参数只能写一个
function betterIsString(input: any): input is string {
  return typeof input === "string";
}

// 使用自定义守卫
function foo(input: string | number) {
  if (betterIsString(input)) {
    // 在这里，input 的类型被收紧为 string
  } else {
    // 在这里，input 的类型仍为 string | number
  }
}
```

## 可以为 NULL 的类型

**5. 当值为 null 或 undefined 时，您需要在对该值使用方法或属性之前测试这些值。就像在使用可选属性之前检查 undefined 一样，我们可以使用缩小范围来检查可能为 null 的值：**

```ts
//strictNullChecks off
关闭严格空检查，允许值为null或undefined的变量
//strictNullChecks on
开启严格空检查，不允许值为null或undefined的变量
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

**6.翻译 Non-null Assertion Operator (Postfix !)**

```ts
//TypeScript 还有一种特殊的语法，可以从类型中删除 null 和 undefined，而无需进行任何显式检查。写作 ！任何表达式之后实际上都是一个值不为 null 或未定义的类型断言：
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

## 函数重载 Function Overloading

- 函数重载允许在同一作用域内声明多个同名函数，但这些函数的参数列表（参数类型和数量）不同。
- 当调用一个重载函数时，编译器会根据函数参数的具体情况选择合适的定义来执行。

:::note
函数重载的顺序很重要。编译器会按照声明的顺序从上到下匹配参数类型。
如果没有匹配的函数签名，编译器会报错。
:::

```ts
//上方两个为函数签名
function makeDate(timestamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;

function makeDate(timestampOrYear: number, month?: number, day?: number) {
  if (month != null && day != null) {
    return new Date(timestampOrYear, month - 1, day);
  } else {
    return new Date(timestampOrYear);
  }
}
const day1 = makeDate(2022, 1, 1);
const day2 = makeDate(1640966400000);
const day3 = makeDate(2022, 1);
console.log(day1); // 2021-12-31T16:00:00.000Z
console.log(day2); // 2021-12-31T16:00:00.000Z
```

## 函数调用签名 Call Signatures

```ts
//语法格式，定义一个函数接收两个参数，：后跟函数的返回值类型。可定义多个
type count = {
  (num1: number, num2: number): number;
};
//此方法便于使用函数重载。
type count = {
  (num1: number, num2: number): number;
  (num1: number, num2: number, num3: number): number;
};
//简写方式
type count = (num1: number, num2: number, num3?: number) => number;

const add: count = (num1, num2, num3?) => {
  if (num3 !== undefined) {
    return num1 + num2 + num3;
  }
  return num1 + num2;
};

const minus: count = function (num1, num2) {
  return num1 - num2;
};

const multi: count = function (num1, num2) {
  return num1 * num2;
};

const division: count = function (num1, num2) {
  return num1 / num2;
};
```

## 索引签名 Index Signatures

**允许我们定义对象的属性类型，以便可以使用字符串或数字作为索引来访问对象的属性。**

```ts
//自定义Person数据类型是一个对象包含name和email两个属性并限定其数据类型为string
type Person = {
  name: string;
  email: string;
};
//定义索引签名PersonDictionary为一个对象包含{键值类型为string:Person数据类型}
type PersonDictionary = {
  [key: string]: Person;
};
const obj: PersonDictionary = {
  zhangsan: {
    name: "张三",
    email: "zhangsan@163.com",
  },
  lisi: {
    name: "李四",
    email: "lisi@126.com",
  },
};
```

## 只读 readonly

1. **只读属性**

- 在类中，可以使用 readonly 关键字来声明只读属性。
- 只读属性的值在对象创建后不能被修改。

```ts
class Circle {
  readonly radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(5);
console.log(circle.getArea()); // 输出：78.53981633974483
// circle.radius = 10; // 错误：只读属性不能被修改
```

2. **只读变量**

- 使用 readonly 关键字来声明一个变量，表示该变量的值不能被修改。
- 只读变量必须在声明时或在构造函数中进行初始化，之后不能再修改。

```ts
class Person {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person("Alice");
console.log(person.name); // 输出：Alice
// person.name = 'Bob'; // 错误：只读属性不能被修改
```

## 双重断言 Double Assertion

```ts
type Point2D = { x: number; y: number };
type Point3D = { x: number; y: number; z: number };
type Person = { name: string; email: string };

let point2: Point2D = { x: 0, y: 0 };
let point3: Point3D = { x: 10, y: 10, z: 10 };
let person: Person = { name: "zhangsan", email: "zhangsan@126.com" };

//成功是因为多于的参数不会引起ts报错，失败的例子是因为缺少属性。
point2 = point3; // 成功
point3 = point2; // 失败

//如果一个属性都对不上的
person = point3; //error
point3 = person; //error
//一次断言不能解决问题需要双重断言
//as any告诉TS不做类型断言 第二个as类型才会把该变量断言成此类型。
person = point3 as any as Person; //不报错了
point3 = person as any as Point3D; //不报错了
```

## 常量断言 const Assertion

```ts
//正常情况下，下面的代码只会组织修改user的值，而无法阻止修改user内部属性的值
const user = {
  username: "zhangsan",
  age: 18,
};

user.username = "lisi";
user.age = 19;

console.log(user);

//想要阻止修改属性的值可以做如下操作。
const user = {
  username: "zhangsan",
  age: 18,
} as const;

//下列情况也许使用常量断言
function layout(setting: {
  align: "left" | "center" | "right";
  padding: number;
}) {
  console.log("Layout: ", setting);
}

const paramater = {
  align: "left",
  padding: 0,
};
layout(paramater);
//直接调用函数会报错显示paramater中的align为string类型 而非自定义类似需要给该对象加常量断言如下。
const paramater = {
  align: "left" as const,
  padding: 0,
};
```

## TS 的 this 问题

```ts
function double() {
  this.age = this.age * 2;
}
const user = {
  age: 10,
  double,
};
user.double();
console.log(user.age);
//如果修改age为其它元素依然会返回结果尽管该属性并不存在
//可以给this指定参数类型
function double(this: { age: number }) {
  this.ag = this.ag * 2; //会报错显示类型{ age: number }不存在ag属性
}
//确保this指向{age: number}该对象

//如果定义了多个参数必须把this参数放在第一位否则报错
❌function double2(aaa, this: { age: number }) {
  this.age = this.age * 2;
}
```

## typeof 操作符

**两种写法，第一种 <mark>typeof(表达式)</mark>对表达式做运算,第二种<mark>typeof 变量名</mark>对变量做运算**

```ts
/*可以定义一个对象来添加属性，如果以后想要新加的属性触发其它关联的变量类型断言，可以在其它定义的
变量后使用typeof操作符来进行断言，这样新增加的属性如果其它关联变量不存在则会触发ts类型断言报错。*/
// 中心点
const center = {
  x: 0,
  y: 0,
  z: 0,
};
// 定义一个单位
//由于center新增加了z属性，而此三个单位并不存在z属性，这时候由typeof的作用会提示缺少z属性防止修改对象以后忘了添加其它关联对象的属性。
const unit1: typeof center = {
  x: center.x * 10,
  y: center.y * 10,
};
// 定义一个单位
const unit2: typeof center = {
  x: center.x * 100,
  y: center.y * 100,
};
// 定义一个单位
const unit3: typeof center = {
  x: center.x * 1000,
  y: center.y * 1000,
};
```

## keyof 关键字

1. **创建映射类型**

```ts
//自定义Person数据类型
type Person = {
  name: string;
  age: number;
  address: string;
};
type PersonKeys = keyof Person;

type PersonMap = {
  [K in keyof Person]: string;
};
// 等同于：type PersonMap = { name: string; age: string; address: string; }
/*在这个映射类型中，[K in keyof Person] 部分是一个索引签名，它遍历 Person 类型的每个属性。
  keyof Person 表示取出 Person 类型的所有属性名组成的联合类型，然后通过 in 关键字遍历这个
  联合类型中的每个属性名，赋值给变量 K。*/
```

2. **限制函数参数的属性名**

```ts
function printProperty<T, K extends keyof T>(obj: T, key: K) {
  console.log(obj[key]);
}
const person: Person = { name: "Alice", age: 30, address: "Wonderland" };
printProperty(person, "name"); // 输出：Alice
```

3. **遍历对象属性名**

```ts
const keys: PersonKeys[] = ["name", "age", "address"];
const person: Person = {
  name: "John",
  age: 30,
  address: "123 Main St",
};

keys.forEach((key) => {
  console.log(`${key}: ${person[key]}`);
});
//key用来保存每次迭代keys数组中的元素即"name", "age", "address"。
```

## 类型查找 lookup types

**项目采用的是前后端分离，则需要数据前后端保持一致。**

```ts
//在下面这段代码中，前端只会用到一部分数据
// 服务器的数据的结构, 转账交易记录
type RequestData = {
  // 交易id
  transactionId: string;
  // 用户信息
  user: {
    name: string;
    email: string;
    phone: string;
    nickname: string;
    gender: string;
    dob: string;
    nationality: string;
    address: {
      stress: string;
      unitNumber: string;
      city: string;
      provance: string;
      contury: string;
    }[];
  };
  // 驾照信息
  dirverInfo: {
    licenceNumber: string;
    exporyDate: string;
    classes: string;
    status: string;
  };
  // 交易信息
  payment: {
    creditCardNumber: string;
  };
};
//如果有如下函数要获取creditCardNumber需要限定其数据类型
function getPayment() {
  return {
    creditCardNumber: "1111111",
  };
}
//第一种方法设定函数的返回类型值
function getPayment(): { creditCardNumber: string } {
  return {
    creditCardNumber: "1111111",
  };
}
//第二种方法把pament抽象出来单独定义
type RequestData = {
  // ...
  payment: PaymentRequestType;
};
type PaymentRequestType = {
  creditCardNumber: string;
};
function getPayment(): PaymentRequestType {
  return {
    creditCardNumber: "1111111",
  };
}
//但是这种写法, 破坏了原有类型规则的结构, 也会增加规则的复杂性
//类型查找(Look up types)，通过类型查找，我们就可以避免重复
//使用索引从 RequestData 中获取对应的规则
function getPayment(): RequestData["payment"] {
  return {
    creditCardNumber: "1111111  ",
  };
}
```

## 类型映射 Mapped Types

```ts
type Point = {
  x: number;
  y: number;
  z: number;
};
const center: Point = {
  x: 0,
  y: 0,
  z: 0,
};
//执行下列代码会修改center里的值
center.x = 1;
center.y = 1;
center.z = 1;
console.log(center); //{x:1,y:1,z:1}
//可以使用类型映射来简化代码
type Point = {
  x: number;
  y: number;
  z: number;
};
type ReadOnlyPoint = {
  readonly [key in "x" | "y" | "z"]: number;
}; //key会递遍历了字符串字面量类型x,y,z中的每一个成员。并且都附加上只读属性。
```

## tsconfig.json 的通用配置

```json
//tsconfig.json通用配置
{
    "compilweOptions":{
        "module": "commonjs",
        "types":["node"], //声明类型，使得ts-node支持对tsx的编译
        "target": "es6",
        "jsx":"react-jsx", //全局导入，不在需要每个文件定义react
        "lib":["dom","dom.iterable","esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "baseUrl": "./",
        "paths": {
            "@/*": ["src/*"]
            },
        "include":["src/**/*"]
    }
}
```
