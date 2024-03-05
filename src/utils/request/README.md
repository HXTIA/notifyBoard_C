# 请求函数部分

### 使用
``` js
import { requestUrlCreator, Get, Post, Put, Delete } from 'src/utils/request'

(async () => {
  const res = await Get({
    url: requestUrlCreator({ absolutePath: '/editor' }),
    data: '',
    silent: false
  })

  const { isSuccess, data, code, msg } = res  
})()

```

请求函数各自维护在自己的页面中，可以在pages下面新建一个request.ts中维护属于自己的业务逻辑

- requestUrlCreator是用来构建请求url的，其本身构造又DefineEnumKeys类型体操推断枚举定义了什么常量，从而提示业务使用何种入参，具体可查看当前位置的index.ts的requestUrlCreator函数

- res响应被封装为一个ResultWrap包装类向外暴露如上的四个getter，isSuccess用来判断业务后端或者网络环境是否抛错
- 
- TODO: 
  - 后续会支持原子性响应码判断 & 原子性错误处理都统一由业务传入在business中做为pipeline执行
  - 考虑是否需要在请求过程中将loading可替代为一个pipeline，支持业务手动定义loading逻辑【必要性调研中】
