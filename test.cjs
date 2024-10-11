//写一个闭包的例子

const str = "asdasfaad";

const a = [...str].reduce((a, b) => ((a[b]++||(a[b] = 1)),a), {})

console.log(a);

function click(){
    return {...obj,a:2}
}

const obj = {
    a:1,
    b:{
        c:3
    }
}
// const b = click();
// setTimeout(click, 1000);
// console.log(b);

const obj2= {
    ...obj,
}
obj2.a = 2
obj2.b.c = 4
console.log(obj);

Reducer 必需符合以下规则：

仅使用 state 和 action 参数计算新的状态值
禁止直接修改 state。必须通过复制现有的 state 并对复制的值进行更改的方式来做 不可变更新（immutable updates）。
禁止任何异步逻辑、依赖随机值或导致其他“副作用”的代码

<Route index element={   <Home />}></Route>