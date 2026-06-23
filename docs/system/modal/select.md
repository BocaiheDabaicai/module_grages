---
aside: false
---
# 分级筛选模态框
> 本处集成了 element-tree、dialog、table 组件，实现多级筛选与搜索功能

该模板集成了初级分类、关键字搜索、表格选中、查询与确定功能，实现产品的多级筛选与选中单品的功能。  
主要内容如下：

<script setup>
import Select from "../../../src/pages/system/modal/select.vue"
</script>

<Select/>

::: details 代码如下
```vue
<script setup>

import {ref} from "vue";

const input = ref()
const input2 = ref()
const modalOpenRef = ref(false);  // 适用于类型五，控制模态框

const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    label: '利乐纯系列',
  },
  {
    label: '酸奶系列',
  },
  {
    label: '八联杯系列',
  },
  {
    label: '屋顶盒系列',
  },
  {
    label: '无菌砖系列',
  },
]
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const OpenModalChoose = () => {
  // 适配于类型五界面窗口打开
  modalOpenRef.value = !modalOpenRef.value
}

const handleCurrentChange = (val) => {
  console.log(val)
}
</script>

<template>
  <div class="main">
    <el-input v-model="input" show-word-limit
              :autosize="{minRows:3}"
              placeholder="请输入内容" @click="OpenModalChoose"
              clearable
    />
    <p style="margin: 0.5rem 0;color: #909399">Tips: 请点击输入框</p>

    <el-dialog v-model="modalOpenRef" title="商品筛选" width="50%">
      <div>
        <el-row>
          <el-col :span="8" style="font-weight: bold;color: #909399">
            <div style="width: 100%">系列选择</div>
          </el-col>
          <el-col :span="8" style="font-weight: bold;color: #909399">
            <div style="width: 100%">条件筛选</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="padding-right: 1rem">
            <el-tree
                :data="data"
                :props="defaultProps"
                @node-click=""
            />
          </el-col>

          <el-col :span="16">
            <el-row align="middle" justify="space-between">
              <el-col :span="12">
                <el-input placeholder="请输入产品信息关键字" v-model="input2"/>
              </el-col>
              <el-col :span="6">
                <el-button style="width: 100%" type="primary" plain>查询</el-button>
              </el-col>
              <el-col :span="24" style="margin: 0.5rem 0">
                <el-table :data="tableData" @current-change="handleCurrentChange"
                          highlight-current-row style="width: 100%;">
                  <el-table-column prop="date" label="产品信息"/>
                </el-table>
              </el-col>
              <el-col :span="8"></el-col>
              <el-col :span="4">
                <el-button style="width: 100%" type="success" plain>确认</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
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

---

数据源要接入接口才能使用。  
