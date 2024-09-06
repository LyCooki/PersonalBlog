---
title: React基础
description: A guide in my new Starlight docs site.
---

## 什么是 React？

React 是一个用于构建用户界面的 JavaScript 库。它被设计用于构建大型、复杂的 Web 应用。

React 的核心思想是将 UI 的构建分离出来，将关注点放在数据的呈现上。React 通过声明式编程的方式，帮助开发者声明式地定义 UI 组件，并将它们与数据绑定。

React 的主要优点：

- 声明式编程：React 通过声明式编程的方式，帮助开发者声明式地定义 UI 组件，并将它们与数据绑定。
- 组件化：React 将 UI 的构建分离出来，将关注点放在数据的呈现上。
- 虚拟 DOM：React 使用虚拟 DOM，它将真实 DOM 与虚拟 DOM 进行比较，并只更新需要更新的部分，从而提高性能。
- 单向数据流：React 的单向数据流使得数据流动更加简单，更容易理解。
- 跨平台：React 可以运行在浏览器、服务器、原生应用等多种环境中。

## 组件

### 无状态组件

无状态组件（Stateless Component）是指没有内部状态（state）的组件。它是一个纯函数，接收 props 作为参数，并返回 React 元素。

```jsx
function App() {
  var count = 0;
  setInterval(() => {
    count++;
    consle.log(count);
  }, 1000);
  return <h1>Hello, world! {count}</h1>;
}
//这里会发现页面渲染了0控制台却在一直更新数据。
```

### 有状态组件

有状态组件（Stateful Component）是指有内部状态（state）的组件。它是一个类组件，包含生命周期方法，可以操作组件的状态。

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    const { count } = this.state;
    return;
    <div>
      <h2>{count}.</h2>
    </div>;
  }
}
```

### JSX 语法

JSX 是一种 JS 的语法扩展，它允许我们在 JS 代码中嵌入 HTML。只允许写表达式，不能写语句。

1.  直接读取值

```jsx
const name = "John";
const element = <h1>Hello, {name}!</h1>;
```

2. 访问对象属性

```jsx
const person = { name: "John", age: 30 };
const element = <h1>Hello, {person.name}!</h1>;
```

3. 访问数组下标

```jsx
const people = ["John", "Jane", "Bob"];
const element = (
  <ul>
    <li>{people[0]}</li>
  </ul>
);
```

4. 三元运算符

```jsx
const isLoggedIn = true;
const element = <h1>{isLoggedIn ? "Welcome!" : "Please log in."}</h1>;
```

5. 调用方法

```jsx
const person = {
  name: "John",
  sayHello: function () {
    return <h1>Hello, {this.name}!</h1>;
  },
};
const element = <div>{person.sayHello()}</div>;
```

## 事件参数传递

比如需要传递多个参数的时候。
推荐用法：

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = (id,e) => {
    //这里的e就是事件对象
    console.log(id，e);
  }

  render() {
    return;
    <div>
      <h1 onClick={this.handleClick.bind(this,'id 1')}></h1>
    </div>;
  }
}
```

### 事件传递丢失 this 的问题

```jsx
class App extends React.Component {
  handleClick() {
    console.log("this", this); //undefined
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleClick}>111</h1>
      </div>
    );
  }
}
```

解决办法：

1. 箭头函数

```jsx
handleClick = (id, id2, e) => {
  //这里的e就是事件对象
  console.log("this", this);
};
```

2. bind 函数

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    //第二种手动指向
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("this", this);
  }
  render() {
    return (
      <div>
        //第一种
        <h1 onClick={this.handleClick.bind(this)}>111</h1>
      </div>
    );
  }
}
```

## props

props 是组件的属性，它是父组件向子组件传递数据的方式。

```jsx
class Parent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name } = this.props;
    return <Child name={name} />;
  }
}
//要使用此方法必须import react-dom库而非react-dom/client
ReactDOM.render(<Parent name="John" />, document.getElementById("root"));
```

### setState 和 props 的区别

#### 1.setState

##### 定义

`setState` 是一个用于更新组件内部状态 (`state`) 的方法。

##### 作用

`state` 是组件内部的可变数据，通常用于存储组件自身的状态。通过调用 `setState`，组件可以更新自己的状态，并触发重新渲染。

##### 用法

- **只能在类组件中或通过 `useState` 钩子在函数组件中使用。**
- **调用 `setState` 是异步的，因此不会立即更新状态，而是会将更新加入到更新队列中，稍后批量执行。**

#### 2.Props

##### 定义

props 是组件的属性，由父组件通过 JSX 的方式传递给子组件。

##### 作用

props 用于在组件之间传递数据，通常是从父组件传递到子组件，子组件通过 props 接收数据并进行渲染。

##### 用法

- 只读属性，不能在子组件中修改 props 的值。
- 修改位置：props 是由父组件控制的，子组件无法直接修改，只能通过父组件传递新的 props。

#### 区别总结

##### 数据来源

- **state** 是组件内部维护的状态。
- **props** 是由父组件传递的属性。

##### 可修改性

- **state** 可以通过 `setState` 来修改。
- **props** 是不可修改的，子组件无法更改 props。

##### 触发渲染

- `setState` 会触发组件的重新渲染。
- props 的改变也会触发组件的重新渲染，但子组件不能直接修改 props。

## 生命周期

![老板生命周期图](@/assets/img/React/life-circle.png)

在 React 中，在每一次由状态改变导致页面视图的改变，都会经历两个阶段：render 阶段、commit 阶段。

只有 Class 组件才有生命周期，因为 class 组件会创建对应的实例，而函数组件不会，组件实例从被创建到被销毁的过程称为组件的**生命周期**。

**老版本生命周期**是 React 组件从创建到销毁的整个过程，它包括三个阶段：挂载、更新和销毁。

### 1.挂载阶段

1. constructor(props)：组件实例化时调用，只调用一次。
2. componentWillMount()：组件即将挂载时调用，只调用一次。
3. render()：组件渲染时调用，返回 JSX 元素。
4. componentDidMount()：组件挂载完成时调用，只调用一次。

**一定是先子组件挂载，才到父节点**

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  render() {
    console.log("render");
    return <h1>Hello, world!</h1>;
  }

  componentDidMount() {
    console.log("componentDidMount");
  }
}
// 输出结果：
// constructor
// componentWillMount
// render
// render之后会执行commit阶段即挂载真实dom
// componentDidMount
```

### 2.更新阶段

1. componentWillReceiveProps(nextProps)：组件接收到新的 props 时调用，只调用一次。
2. shouldComponentUpdate(nextProps, nextState)：组件判断是否需要更新时调用，返回 true 或 false。
3. componentWillUpdate(nextProps, nextState)：组件即将更新时调用，只调用一次。
4. render()：组件渲染时调用，返回 JSX 元素。
5. componentDidUpdate(prevProps, prevState)：组件更新完成时调用，只调用一次。

### 3.销毁阶段

1. componentWillUnmount()：组件即将销毁时调用，只调用一次。

### **shouldComponentUpdate 的应用场景（面试）**

- 优化性能：shouldComponentUpdate 可以在一定条件下阻止组件的重新渲染，从而提高性能。
- 防止不必要的渲染：shouldComponentUpdate 可以在 props 或 state 发生变化时返回 false，阻止组件的重新渲染，避免不必要的渲染。

```jsx
class child extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(newProps, newState) {
    if (newProps.count === 1) {
      return false;
    }
    return true;
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    this.setState({ count: 1 });
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <child></child>
      </div>
    );
  }
}
//这里父组件引入了子组件，本质上调用了setState就会触发render,但并不会因为每调用一次setState就执行一次render，如果不在子组件使用shouldComponentUpdate进行判断，就会导致子组件的重新渲染，造成性能问题。
```


## 1.7版本后废弃的三个钩子

- componentWillMount：已废弃，使用 componentDidMount 替代。
- componentWillReceiveProps：已废弃，使用 static getDerivedStateFromProps 替代。
- componentWillUpdate：已废弃，使用 componentDidUpdate 替代。

废弃原因:

这三个钩子都是在`render`阶段执行的,在fiber架构推出之前,render阶段不可打断,所以在大型复杂的组件嵌套项目中如果用到了多个render,可能会阻塞页面的渲染.推出fiber架构以后,低优先级的render阶段会被高优先级的render阶段打断.

## 阻止组件渲染

- 当一个函数组件返回一个null的时候,React不会渲染这个组件,不会调用组件的生命周期函数.
```jsx
function Person(props){
  
  if(props.name){
    return <h2>{props.name}</h2>;
  }
  else return null
}
class App extends React.Component {

  render() {
    return (
      <div>
        <Person name="张三" age={20} onClick={this.handleClick} />
      </div>
    );
  }
}
```

## 受控组件

- 受控组件：表单元素的值由 state 控制，即表单元素的值由 state 决定，而非 DOM 元素的值决定。

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <input type="text" value={inputValue} onChange={this.handleInputChange} />
      </div>
    );
  }
}
//如果去掉onChange事件则input框不可修改.select、textArea同理.
```
### 受控组件变为非受控组件

修改value属性为null属性即可.

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }
  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <input type="text" value={null}/>
      </div>
    );
  }
}
```

## props.children

- 父组件可以向子组件传递任意 JSX 元素作为子组件的子节点。

```jsx
class Parent extends React.Component {
  render() {
    return <Child>{this.props.children}</Child>;
  }
}

class Child extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

ReactDOM.render(
  <Parent>
    <h1>Hello, world!</h1>
    <p>This is a paragraph.</p>
  </Parent>,
  document.getElementById("root")
);
```
## 属性组件传递
  通过在父组件定义属性组件，然后在子组件中通过属性组件的形式传递属性。
```jsx
function Parent(props) {
  return (
    <div className="parent"> 
      <div className="left">{props.left}</div>
      <div className="right">{props.right}</div>
    </div>
  )
}

function Left(){
  return (
    <div>
      我是左边
    </div>
  )
}

function Right(){
  return(
    <div>
      我是右边
    </div>
  )
}
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <Parent left={<Left/>} right={<Right/>} />
);
```
