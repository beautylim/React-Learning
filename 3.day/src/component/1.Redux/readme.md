
# Redux是React最常用的集中状态管理工具，可以独立于框架运行
作用：通过集中管理的方式管理应用的状态
主要有以下概念：
action, 对数据的操作名称，比如是increment， toggle等等
dispatch， 用来发送action的函数
state， 数据状态，redux的存储对象，state是一个对象可以有不同的数据类型
store，通过redux 和reducer存储一个store，可以通过store去subscribe订阅state的变化，用于更新组件
reducer，是一个函数根据参数是state和action，响应action动作来更新state
所以基本流程是UI view 发action -> reducer 根据action更新state -> 执行subscribe方法更新组件

## 配套工具
1. Redux Toolkit - 官方推荐编写Redux逻辑的方式，是一套工具的集合，简化书写方式，包含了 Redux 核心逻辑和官方推荐的最佳实践工具。
   * 简化store的配置方式
   * 内置immer 支持可变式状态修改
   * 内置thunk更好的异步创建

2. react-redux 提供了让 React 组件与 Redux store 连接的绑定。
  Redux -> react-redux  -> React组件

```
npm i @reduxjs/toolkit react-redux
```