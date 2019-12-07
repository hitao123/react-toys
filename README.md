# hooks

> 最开始是使用 react 提供的 useState、useRef、useEffect 基础 hooks 来实现 播放器的控制，hooks 自去年出来也有一段时间了，陆续读了一些技术文章，现在可能有些已经运用到产线了，我想通过这个项目实践一下 react hooks 对原来的写法上有什么不同（不探讨原理，hooks 出现的原因在 react 官网有描述）

## 基于 react-player 使用 react-hooks 自定义播放器控制

## 使用最新的 react-router hooks 实现路由参数获取

> 主要使用下面 3 个 hooks，使用起来比之前更加方便，没什么上手难度，对原有代码改造简单 [hooks](https://reacttraining.com/react-router/web/api/Hooks)

```js
let { id } = useParams();
let location = useLocation();
let history = useHistory();
```

## 使用最新的 react-redux hooks 实现状态管理

> [hooks](https://react-redux.js.org/api/hooks) 目前基本能满足需求，如果你需要传递 connnect ownProps 参数，那么现在 useSelector 这个hooks 还不适合你，你可以接着使用之前的 connect

## 使用 swr hooks 实现数据获取

> [swr](https://github.com/zeit/swr), 冒事是宇宙最强前端出品，目前是单个使用在函数组件里面，使用起来很简单，没有和 redux 结合，目前还存在不少问题，可以等后续稳定一点在使用

## 使用 umijs/hooks 常用业务组件对项目进行改造
