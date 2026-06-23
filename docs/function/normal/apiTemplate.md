---
aside: true
---
# 接口模板

接口请求模板，旨在提供规范的`Axios`请求代码，方便接入接口直接使用。  
- 解决错误判断的问题
- 区分`get`,`post`请求的区别
- 涉及多种使用结构，包括参数的设计、构造
- 以真实化的项目进行打造  

## 接口头创建

```js
// ./request.js
import axios from 'axios';

export const request = axios.create({
    baseURL: 'https://some-domain.com/api/',    // 基地址配置
    timeout: 1000,  // 请求最大等待时间
    headers: {'X-Custom-Header': 'foobar'}  // 标签头配置
});
```

::: details 请求体配置
```Json
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认值

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  transformRequest: [function (data, headers) {
    // 对发送的 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对接收的 data 进行任意转换处理

    return data;
  }],

  // 自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是与请求一起发送的 URL 参数
  // 必须是一个简单对象或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个可选配置，允许您自定义序列化 `params`。
  paramsSerializer: {

    //自定义编码器函数，以迭代方式发送键/值对。
    encode?: (param: string): string => { /* 在这里进行自定义操作并返回转换后的字符串 */ }, 
    
    // 整个参数的自定义序列化器函数。允许用户模仿 1.x 之前的行为。
    serialize?: (params: Record<string, any>, options?: ParamsSerializerOptions ), 
    
    //用于格式化参数中数组索引的配置。
    indexes: false // 三个可用选项：
    // (1) indexes: null (导致没有括号), 
    // (2) (default) indexes: false (导致空括号),
    // (3) indexes: true (引导空字符串).    
  },

  // `data` 是作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属: FormData, File, Blob
  // - Node 专属: Stream, Buffer
  data: {
    firstName: 'Fred'
  },
  
  // 发送请求体数据的可选语法
  // 请求方式 post
  // 只有 value 会被发送，key 则不会
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000, // 默认值是 `0` (永不超时)

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，这使测试更加容易。
  // 返回一个 promise 并提供一个有效的响应 （参见 lib/adapters/README.md）。
  adapter: function (config) {
    /* ... */
  },

  // `auth` HTTP Basic Auth
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType: 'json', // 默认值

  // `responseEncoding` 表示用于解码响应的编码 (Node.js 专属)
  // 注意：忽略 `responseType` 的值为 'stream'，或者是客户端请求
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // 默认值

  // `xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称
  xsrfCookieName: 'XSRF-TOKEN', // 默认值

  // `xsrfHeaderName` 是带有 xsrf token 值的http 请求头名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值

  // `onUploadProgress` 允许为上传处理进度事件
  // 浏览器专属
  onUploadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  // 浏览器专属
  onDownloadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `maxContentLength` 定义了node.js中允许的HTTP响应内容的最大字节数
  maxContentLength: 2000,

  // `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
  maxBodyLength: 2000,

  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认值
  },

  // `maxRedirects` 定义了在node.js中要遵循的最大重定向数。
  // 如果设置为0，则不会进行重定向
  maxRedirects: 5, // 默认值

  // `socketPath` 定义了在node.js中使用的UNIX套接字。
  // e.g. '/var/run/docker.sock' 发送请求到 docker 守护进程。
  // 只能指定 `socketPath` 或 `proxy` 。
  // 若都指定，这使用 `socketPath` 。
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别定义了在 node.js 中执行 http 和 https 请求时使用的自定义代理。
  // 这允许添加诸如 `keepAlive` 之类的选项，这些选项在 Node.js v19.0.0 之前默认未启用。
  // 在 Node.js v19.0.0 之后，不再需要自定义代理来启用 `keepAlive`，
  // 因为 `http.globalAgent` 已经默认启用了 `keepAlive`。
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` 定义了代理服务器的主机名，端口和协议。
  // 您可以使用常规的`http_proxy` 和 `https_proxy` 环境变量。
  // 使用 `false` 可以禁用代理功能，同时环境变量也会被忽略。
  // `auth`表示应使用HTTP Basic auth连接到代理，并且提供凭据。
  // 这将设置一个 `Proxy-Authorization` 请求头，它会覆盖 `headers` 中已存在的自定义 `Proxy-Authorization` 请求头。
  // 如果代理服务器使用 HTTPS，则必须设置 protocol 为`https`
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // see https://axios-http.com/zh/docs/cancellation
  cancelToken: new CancelToken(function (cancel) {
  }),

  // `decompress` indicates whether or not the response body should be decompressed 
  // automatically. If set to `true` will also remove the 'content-encoding' header 
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true // 默认值

}
```
:::  

## 简单get请求
```js
import {request} from './request.js'

export const getParams = async function(){
    let result = await request.get('/xxx');
    
    return result.data; // 返回数据给前端
}
```

## 传参get请求
实际会以`/xxx/id`的方式进行接口请求  

```js
import {request} from './request.js'

export const getParams = async function(id){
    let result = await request.get('/xxx/id');
    
    return result.data; // 返回数据给前端
}
```

实际会以`/xxx/id/index`的方式进行接口请求
```js
import {request} from './request.js'

export const getParams = async function(id,index){
    let result = await request.get('/xxx/id/index');
    
    return result.data; // 返回数据给前端
}
```

## 多项传参get请求
实际会以`/xxx/id?=y1&&data?=y2`的方式进行接口请求

```js
import {request} from './request.js'

export const getParams = async function(obj){
    let result = await request.get('/xxx/id',{
        params:{
            id:obj.id,
            data:obj.data
        }
    });
    
    return result.data; // 返回数据给前端
}
```

## 简单post请求
`post`方式一  
```js
import {request} from './request.js'

export const getParams = async function(obj){
    let result = await request.post('/xxx',obj);
    
    return result.data; // 返回数据给前端
}
```
`post`方式二  
```js
import {request} from './request.js'

export const getParams = async function(obj){
    let result = await request.post('/xxx',{
        ...obj
    });
    
    return result.data; // 返回数据给前端
}
```


<script setup>
import ApiTemplate from '../../../src/pages/function/normal/apiTemplate.vue'
</script>

<ApiTemplate/>

::: details 代码如下
```vue
<script setup>
import {ref} from "vue";
import {tagsGroup} from "../../../utils/tags";

const form = ref({
  selectWord:'',
  type:'',
  tags:[
    {name: 'Tag 1', type: 'primary'},
    {name: 'Tag 2', type: 'success'},
    {name: 'Tag 3', type: 'info'},
    {name: 'Tag 4', type: 'warning'},
    {name: 'Tag 5', type: 'danger'},
  ],
})

const options = [
  {
    value: 1,
    label: '单选',
  },
  {
    value: 2,
    label: '多选',
  },
  {
    value: 3,
    label: '填空',
  },
  {
    value: 4,
    label: '图片',
  },
]

const tagsRef = ref(false)

let currentPage = ref(1)
let pageSize = ref(20)

const tableData = [
  {
    title: '消防题1',
    tag: '消防类型',
    type: '选择题',
  },
  {
    title: '安全题2',
    tag: '安全类型',
    type: '多选题',
  },
  {
    title: '技术题3',
    tag: '技术类型',
    type: '填空题',
  },
  {
    title: '计算题4',
    tag: '财务类型',
    type: '选择题',
  },
]

const closeTag = (tag) => {
  // console.log(tag)
  form.value.tags.splice(form.value.tags.indexOf(tag), 1)
}
const chooseTag = (tag) => {
  // console.log(tag)
  form.value.tags.unshift(tag)
}

const select = () => {
  // console.log(tag)
  console.log(form.value)
}
</script>

<template>
  <div class="main">
    <h2>条件筛选页面</h2>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input placeholder="请输入题目标题关键字" v-model="form.selectWord" clearable/>
      </el-col>
      <el-col :span="6">
        <el-select placeholder="请输入题目类型" v-model="form.type" clearable>
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain style="width: 100%;" @click="tagsRef = !tagsRef">选择题目标签</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" style="width: 100%;" @click="select">查询</el-button>
      </el-col>
    </el-row>
    <div style="margin-top: 0.75rem;">
      题目标签：
      <el-tag v-for="tag in form.tags" :key="tag.name" closable :type="tag.type" style="margin-right: 0.35rem"
              @close="closeTag(tag)">
        {{ tag.name }}
      </el-tag>
    </div>
    <el-row align="middle" justify="end">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100, 200]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="213"
          @size-change=""
          @current-change=""
      />
    </el-row>

    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column prop="title" label="题目标题"/>
      <el-table-column prop="tag" label="题目标签">
        <template #default="scope">
          <el-tag type="primary">{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="题目类型" />
      <el-table-column label="可选操作">
        <template #default="scope">
          <div>
            <el-button type="primary" text>修改</el-button>
            <el-button type="danger" text>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog v-model="tagsRef" title="选择标签" width="50%">
      <div>选择标签</div>
      <el-tag
          v-for="tag in tagsGroup"
          :key="tag.name"
          :type="tag.type"
          style="margin-right: 0.35rem"
          @click="chooseTag(tag)"
      >
        {{ tag.name }}
      </el-tag>
      <el-divider/>
      <div>已选择的标签</div>
      <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" style="margin-right: 0.35rem"
              @close="closeTag(tag)">
        {{ tag.name }}
      </el-tag>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding: 0.75rem;
}
</style>

```
:::
