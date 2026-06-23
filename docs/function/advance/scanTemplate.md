---
aside: true
---
# 扫码识别功能

接入依赖包`html5-qrcode`实现扫码功能，可拓展适配各种不同的码种。  
- 适配各种前端环境使用
- 解码、识别方便，可控性强
- 错误处理完备
- 安装快捷，引入方式简单，易上手

## 依赖包
#### 1. 安装依赖
```text
npm install html5-qrcode
```

#### 2. 引入依赖
```text
import {Html5Qrcode} from "html5-qrcode";
```

#### 3. 使用详情
具体参考文档说明书,本处仅提供文档链接。  
```text
https://www.npmjs.com/package/html5-qrcode
```

## 核心组件代码

```vue
<template v-if="active === 'selectSale'" #right>
  <var-button v-if="!traceStore.html5QrCodeStopRef" block @click="traceStore.scan2DCode">
    <var-icon name="qrcode-scan" />
    <span style="margin-left: 0.45rem">扫描</span>
  </var-button>
  <var-button  v-else block @click="traceStore.scan2DCodeStop">
    <var-icon name="qrcode-scan" />
    <span style="margin-left: 0.45rem">停止</span>
  </var-button>

  <div id="reader" width="600px"></div>
</template>
```

::: info 属性说明
```js
// v-if="active === 'selectSale'" // 该内容可忽略
traceStore.html5QrCodeStopRef   // 用于控制按钮组件的显示和隐藏
```
:::  

## 扫码函数
```js
async function scan2DCode() {   // 扫码功能
    console.log('扫描二维码')
    this.html5QrCodeStopRef = true
    this.html5QrCode = new Html5Qrcode("reader");
    await this.html5QrCode?.start({facingMode: "environment"}, {
        fps: 2,
        qrbox: {width: 250, height: 250}
    }, (decodedText, decodedResult) => {
        // handle the scanned code as you like, for example:
        if (decodedResult) this.scan2DCodeStop()
        console.log(`Code matched = ${decodedText}`, decodedResult);
        this.goodCodeSearch = decodedText
        ElMessage({
            type: 'success',
            message: '扫描成功！'
        })
    }, (error) => {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${error}`);
    });
}
```

## 停止扫描函数
```js
async function scan2DCodeStop() {
    this.html5QrCodeStopRef = false
    this.html5QrCode?.stop()
}
```

