---
title: React高级
description: A guide in my new Starlight docs site.
---

## context 初识

### 创建

```jsx
import React, { createContext } from "react";

const MyContext = createContext("default value");

function App() {
  return (
    <MyContext.Provider value={{ name: "John Doe" }}>
      <MyComponent />
    </MyContext.Provider>
  );
}

function MyComponent() {
  const context = React.useContext(MyContext);
  return <div>{context.name}</div>;
}
```

### 动态更新接收的默认值

根据一些状态变化，来决定返回的 value 值，如果无状态则使用默认值即定义 context 时候的 value 值。

```jsx
class Home extends React.Component {
  render() {
    const useNewValue = true;
    if (useNewValue) {
      return (
        <MyContext.Provider value="new value">
          <MyComponent />
        </MyContext.Provider>
      );
    } else {
      return <MyComponent />;
    }
  }
}
```

### context 导致的重新渲染问题

当 context 的值发生变化时，所有使用该 context 的组件都会重新渲染。

下面这个例子表示，生产消费者模式，会触发两层组件的重新渲染。即状态这一层以及消费这一层。也就是 ThemButton 组件和 App 组件。

```jsx
const ThemContext = createContext({ count: 0 });
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }
    //箭头函数可以避免在constructor中绑定this
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render(){
        return (
            <ThemContext.Provider value={{ count: this.state.count }}>
                <button onClick={this.handleClick}>点我改变状态</button>
                <ToolBar />
            </ThemContext.Provider>
        )
    }
}

function ToolBar(props) {
 return (<div>
    <ThemeButton />
 </div>)

}

class ToolBar extends React.Component {
    //这里表示更新时不重新渲染
    shouldComponentUpdate() {
        return false;
    }
    render(){
        return
        (<div>
            <ThemeButton />
        </div>)
    }
}

class ThemeButton extends React.Component {
    render() {
        const { count } = this.context;
        return (
            <button theme = {this.context}>
                {this.context}
            </button>
        )
}
ThemeButton.contextType = ThemContext;
```

### context 注意事项

context 是以 Object.is()来比较值的，其原理等效于===。但不完全相同。即触发 render 的条件是比较这一次与上一次的引用是否相同，如果相同不触发。不同则触发。当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。举个例子，当每一次 Provider 重渲染时，由于 value 属性总是被赋值为新的对象，以下的代码会重新渲染下面所有的 consumers 组件。

```jsx
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{ name: "John Doe" }}>
        <MyComponent />
      </MyContext.Provider>
    );
  }
}
```

为了防止这种情况，将 value 状态提升到父节点的 state 里：

```jsx
class App extends React.component {
  constructor(props) {
    super();
    this.state = {
      value: { something: "something" },
    };
  }
  render() {
    return (
      <MyContext.Provider value={this.state.value}>
        <MyComponent />
      </MyContext.Provider>
    );
  }
}
```

## 错误边界(Error Boundaries)

部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 提供了一种机制叫做错误边界(Error Boundaries)。它是一个组件，它可以**捕获其子组件树中的 JavaScript 错误**，并渲染出备用 UI。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

你在项目中如何进行错误监控的？(面试高频)

:::note
错误边界无法捕获以下场景的错误：

1. 事件处理
2. 异步代码（如 setTimeout、requestAnimationFrame）
3. 服务端渲染
4. 它自身抛出来的错误（并非它的子组件）
   :::

使用方法

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // 可以把错误信息上报到服务器
    ajax.post("url", error);
    logErrorToMyService(error, info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }
  }
}
```

## createPortal

React 提供了一个 createPortal 方法，可以将子组件渲染到父组件以外的 DOM 节点中。

```jsx
import React, { createPortal } from "react";

class Modal extends React.Component {
  componentDidMount() {
    this.node = document.createElement("div");
    document.body.appendChild(this.node);
  }
  componentWillUnmount() {
    document.body.removeChild(this.node);
  }
  render() {
    //语法结构：第一个参数是要渲染的元素，第二个参数是要渲染到的节点中
    return createPortal(this.props.children, this.node);
  }
}

class App extends React.Component {
  //这里的p标签会插入到上面组件创建的div节点中
  render() {
    return (
      <div>
        <h1>App</h1>
        <Modal>
          <p>This is a modal</p>
        </Modal>
      </div>
    );
  }
}
```

### portal 的事件冒泡注意事项

通过 portal 创建的组件，它的事件冒泡还是会遵循 react 组件的父子关系，而不是真实渲染出来的 dom 结构。

```jsx
class Modal extends React.Component {
  componentDidMount() {
    this.node = document.getElementByTagName("body");
  }
  render() {
    return createPortal(<div>{this.props.children}</div>, this.node);
  }
}

class App extends React.Component {
  handleClick = () => {
    console.log("click app");
  };
  render() {
    return (
      <div onClick={this.handleClick}>
        <h1>App</h1>
        <Modal>
          <button>This is a modal</button>
        </Modal>
      </div>
    );
  }
}
```

## 发布订阅模型

<details>
  <summary>点击展开</summary>

```jsx
import React, { createContext } from "react";

class dataSource {
  constructor() {
    this.listener = [];
  }
  //订阅者
  addListener(callback) {
    this.listener.push(callback);
  }
  //发布者
  publish(data) {
    const len = this.listener.length;
    for (let i = 0; i < len; i++) {
      const listener = this.listener[i];
      listener(data);
    }
  }
}

const data_source = new dataSource();

data_source.addListener((data) => {
  console.log("xm接收到了新的," + data);
});
data_source.addListener((data) => {
  console.log("xw接收到了新的," + data);
});

class publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestNewspaper: "", // 初始状态为空
    };
  }
  componentDidMount() {
    // 订阅数据源，当有新报纸发布时更新状态
    data_source.addListener((data) => {
      this.setState({ latestNewspaper: data });
    });
  }
  render() {
    return (
      <div>
        <h1>发布页面</h1>
        <button
          onClick={() => {
            data_source.publish("新的报纸");
          }}
        >
          发布
        </button>
        <div>
          <h2>最新报纸:</h2>
          <p>{this.state.latestNewspaper}</p>
        </div>
      </div>
    );
  }
}

export default publish;
```

</details>

## Hooks 介绍

Hooks 可以让函数式组件拥有和 class 组件一样的状态和钩子(生命周期)

面试考点：

完全可选的一个技术，无需重写任何已有代码就可以在一些组件中尝试 Hook，但是如果你不想，你不必现在就去学习或使用 Hook。100%向后兼容，Hook 不包含任何破坏性改动。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用，Hook 使你在无需修改组件结构的情况下复用状态逻辑。这使得在组件间或社区内共享 Hook 变得更便捷。

### 在组件之间复用状态逻辑很难

React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你可能会熟悉一些解决此类问题的方案，比如 render props 和 高阶组件（如 Redux）。

然而，这些方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。你会发现由 providers、consumers、高阶组件、render props 等其他抽象层组成的组件会形成“嵌套地狱”。

这揭示了一个更深层次的问题：<mark>React 需要为共享状态逻辑提供更好的原生途径。**Hooks** 正是为了解决这一问题而设计的（面试考点）。</mark>

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。<mark>Hook 使你在无需修改组件结构的情况下复用状态逻辑，这使得在组件间或社区内共享 Hook 变得更便捷。</mark>

### 复杂组件变得难以理解

> 在传统的 class 组件中，数据获取通常在 `componentDidMount` 和 `componentDidUpdate` 生命周期方法中进行。然而，`componentDidMount` 不仅用于数据获取，还可能包含设置事件监听等其他逻辑，而这些逻辑需要在 `componentWillUnmount` 中进行清理。这种做法导致相互关联的代码被拆分，而完全不相关的代码却被组合在同一个方法中，容易产生 bug，并导致逻辑不一致。

在大多数情况下，由于状态逻辑无处不在，很难将组件进一步拆分为更小的粒度，这给测试带来了挑战。因此，许多人选择将 React 与状态管理库（如 Redux）结合使用。然而，这通常会引入许多抽象概念，需要在不同的文件之间来回切换，使得代码复用变得更加困难。

### Hooks 的解决方案

<mark>为了解决上述问题，Hooks 将组件中相互关联的部分拆分成更小的函数（面试考点），例如设置订阅或请求数据</mark>，而不是强制按照生命周期来划分。此外，你还可以使用 `reducer` 来管理组件的内部状态，使其更加可预测。

### useEffect

  useEffect 是一个 Hook，它可以让你在函数组件中执行副作用操作，包括获取数据、设置订阅、手动修改 DOM 等。

  useEffect 的第一个参数是一个函数，该函数会在组件渲染后执行。useEffect 的第二个参数是一个数组，数组中的值代表 useEffect 所依赖的变量，只有当这些变量发生变化时，useEffect 才会重新执行。

  useEffect 的返回值是一个函数，该函数会在组件卸载时执行。

#### 原理

1. 组件挂载时：

>  执行 useEffect 函数体内的语句。
  如果 useEffect 返回了一个函数，这个返回的函数会被保存，但不会立即执行。
  
2. 组件更新时：

>  如果 useEffect 的依赖项（即第二个参数数组中的值）发生变化，React 会先调用之前保存的返回函数（如果有的话），进行清理操作。
  然后执行 useEffect 函数体内的语句。
  再次保存新的返回函数（如果有的话）。

3. 组件卸载时：

>  调用之前保存的返回函数，进行清理操作。

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // useEffect是必须在DOM真实挂载在页面中，或者已经dom更新完成才执行
    console.log("useEffect 被调用了");
    document.title = `You clicked ${count} times`;

    // 订阅
    const subscription = props.source.subscribe(() => {
      setCount(count + 1);
    });

    // 清理订阅
    return () => {
      subscription.unsubscribe();
    };
  }, [count]); // 只有 count 变化时才会重新执行 useEffect

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```
#### 只在更新时运行useEffect

useEffect 默认在组件挂载和卸载时都会执行，如果想让 useEffect 只在更新时执行，可以使用一个开关控制。

```jsx

function example(){
  const Ref = useRef(); // 定义一个ref，拿到指定DOM元素

  useEffect(() => {
    // 仅在更新时执行
    if(!Ref.current.flag){
      Ref.current.flag = true;
      // 这里的代码只会在组件初始化时执行一次
    }else{
      // 这里的代码只会在组件更新时执行
      console.log("组件更新了");
    }
}); // 第三个参数为true，表示仅在更新时执行 useEffect
}
```




### useContext

通常来说，你会通过 props 将信息从父组件传递到子组件。但是，如果你必须通过许多中间组件向下传递 props，或是在你应用中的许多组件需要相同的信息，传递 props 会变的十分冗长和不便。Context 允许父组件向其下层无论多深的任何组件提供信息，而无需通过 props 显式传递。

```jsx
import React, { createContext, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light"? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{ backgroundColor: theme === "light"? "white" : "black" }}
    >
      {theme === "light"? "Dark" : "Light"}
    </button>
  );
}
```