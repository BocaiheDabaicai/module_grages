---
aside: false
---
# 省市区选择器
> 本处集成了 china-area-data 实现本地静态地区数据选择

该组件集成了选择输入框、china-area-data静态数据、递归选择函数，最终实现地区的正确选择和规范管理。  
主要内容如下：

<script setup>
import Area from "../../../src/pages/system/component/area.vue"
</script>

<Area/>

::: details 代码如下
```vue
<script setup>
import {ref} from 'vue'
import {buildTree} from "../../../utils/area";
import regionData from "china-area-data";

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const chooseArea1 = () => {
  // 收集省份
  // console.log(regionData['86'][value1.value])
  value2.value = ''
  value3.value = ''
};
const chooseArea2 = () => {
  // 收集市区
  // console.log(regionData[value1.value][value2.value])
  value3.value = ''
};
const chooseArea3 = () => {
  // 收集地区
  // console.log(regionData[value2.value][value3.value])
};
</script>

<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-select v-model="value1" placeholder="请输入省份" style="width: 100%" @change="chooseArea1">
        <el-option
            v-for="item in buildTree(regionData,'86')"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select v-model="value2" placeholder="请输入市区" style="width: 100%" @change="chooseArea2">
        <el-option
            v-for="item in buildTree(regionData,value1)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select v-model="value3" placeholder="请输入地区" style="width: 100%" @change="chooseArea3">
        <el-option
            v-for="item in buildTree(regionData,value2)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-col>
  </el-row>
  <p style="margin: 0.5rem 0;color: #909399">Tips: 请点击输入框</p>
</template>

<style scoped lang="scss">

</style>

```
:::

补充：  
`buildTree`函数内容如下：
```js
/**
 * 将扁平区域数据转换为树形结构
 * @param {Object} flatData 原始扁平数据对象，键为区域代码，值为对象（下级区域）或字符串（名称）
 * @param {string} parentCode 父级代码，默认 '86' 表示根级（中国）
 * @returns {Array} 树形结构数组
 */
export function buildTree(flatData, parentCode = '86') {
    // 获取当前父级下的直接子节点列表
    const currentLevel = flatData[parentCode];
    if (!currentLevel) return [];

    // 如果 currentLevel 是对象，则遍历其键值对；如果是字符串（即叶子节点名称），则返回空
    if (typeof currentLevel !== 'object') return [];

    // 将当前层级的键值对转换为数组
    const children = Object.entries(currentLevel).map(([code, name]) => ({
        label: name,
        value: code,
        children: buildTree(flatData, code) // 递归查找下一级
    }));

    return children;
}
```

---

这个组件实现的特别点在于使用了递归搜索来处理扁平化数组数据对象。
