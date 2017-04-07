
> 本项目是由[CNode社区](https://cnodejs.org)提供的API，使用React全家桶所开发的数据持久化的单页应用。

这里所说数据持久化的单页应用，指的是利用`immutable + normalizr + reselect`这一套组合，在应用中简单实现了类似数据库的数据存储，使数据保持持久且同步，在渲染时优先使用存储的数据，以减少请求，提升应用响应。

#### 为什么这么做？
可以参考文章[State 范式化](http://cn.redux.js.org/docs/recipes/reducers/NormalizingStateShape.html)的描述。  

用本项目举例，在首次拉取主题列表页数据，经过范式化后得到数据如下：
![拉取主题列表数据后](https://raw.githubusercontent.com/JoV5/blog/master/images/Inked%E6%8B%89%E5%8F%96%E4%B8%BB%E9%A2%98%E5%88%97%E8%A1%A8%E6%95%B0%E6%8D%AE%E5%90%8E_LI.jpg)
这里我把范式化后的数据都存放于`db`之下，之内包含`topics`、`users`、`replies`等“*数据表*”，`topics`表内的主题以其`id`作为索引，`users`表内的用户以其`loginname`作为索引。主题内的`author`通过索引可以关联到`users`表内对应用户。


这里可以看到，主题内已经包含了主题内容但不包含评论，所以可以直接打开主题详情页而不用去拉取数据，可以留一个加载评论的按钮，在用户需要时加载评论，由于接口限制，不能单独加载主题评论，所以这里实际拉取的是主题完整数据。在用户主动拉取这一篇主题之后的`db`如下：
![拉取主题详情数据后](https://raw.githubusercontent.com/JoV5/blog/master/images/Inked%E6%8B%89%E5%8F%96%E4%B8%BB%E9%A2%98%E8%AF%A6%E6%83%85%E6%95%B0%E6%8D%AE%E5%90%8E_LI.jpg)
这里的`replies`表，用来存放评论，评论以其`id`作为索引。而主题内也多了`replies`属性，展开后是主题的`id`列表，可以通过索引关联到`replies`表内对应评论。评论内的`author`通过索引可以关联到`users`表内对应用户。

那好处到底是是什么呢？引用文章[State 范式化](http://cn.redux.js.org/docs/recipes/reducers/NormalizingStateShape.html)的话来说：
* 每个数据项只在一个地方定义，如果数据项需要更新的话不用在多处改变
* reducer 逻辑不用处理深层次的嵌套，因此看上去可能会更加简单
* 检索或者更新给定数据项的逻辑变得简单与一致。给定一个数据项的 type 和 ID，不必挖掘其他对象而是通过几个简单的步骤就能查找到它。

#### 接下来该这么做？
上面只讲到了范式化，接下来我们需要从`db`中提取出渲染所需数据，这时候就该`reselect`出场了，引用[官方文档的描述](https://github.com/reactjs/reselect):
* Selectors can compute derived data, allowing Redux to store the minimal possible state.

    selectors可以计算衍生数据，使得Redux最小化存储的state。

* Selectors are efficient. A selector is not recomputed unless one of its arguments change.

    selectors是高效的。一个selector只在arguments改变时进行重计算。
    
* Selectors are composable. They can be used as input to other selectors.

    selectors是可组合的，它可作为其他selectors的输入。

另外可以参考文章[计算衍生数据](http://cn.redux.js.org/docs/recipes/ComputingDerivedData.html)。

由于项目全面使用了`immutable.js`，对于数据的存取还是比较方便。

## 涉及技术
* react
* react router 4
* redux
* redux-observable
* rxjs
* immutable.js
* normalizr
* reselect

## 开发记录
[用create-react-app定制自己的react项目模板](https://github.com/JoV5/blog/blob/master/前端/React/用create-react-app定制自己的react项目模板.md)

[用react写一个下拉刷新上滑加载组件](https://github.com/JoV5/blog/blob/master/%E5%89%8D%E7%AB%AF/React/%E7%94%A8react%E5%86%99%E4%B8%80%E4%B8%AA%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0%E4%B8%8A%E6%BB%91%E5%8A%A0%E8%BD%BD%E7%BB%84%E4%BB%B6.md)

## TODOS
- [ ] 回到顶部  
- [ ] 回复尾巴  
- [ ] 已发布主题更新  
- [ ] 友好提示  
- [ ] 消息页面支持直接回复点赞  
- [ ] 收藏页面支持直接取消收藏  
- [ ] 优化css  
- [ ] 优化reducers  
- [ ] 各种动画  
- [ ] chunk的重命名  


