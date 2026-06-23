---
aside: true
---

# 本地存储模板

本处主要记录了各种工作环境下需要使用`LocalStorage`,`SessionStorage`的情况，包含：  
- 暂时存储关键信息
- 持续化存储关键信息
- 记录粘贴板信息
- 保存快捷操作信息
- 生成隐藏在本地的数据信息

## 本地请求唯一设备ID

本处`nanoid`是轻量级ID生成库，用于为设备生成唯一ID

```js
import {nanoid} from 'nanoid';

export const setLocalId = () => {
    // console.log(nanoid(10))
    if (!localStorage.getItem('localId'))
        localStorage.setItem('localId', nanoid(32));
}

export const getLocalId = () => {
    return localStorage.getItem('localId')
}

```

> `nanoid`详情参见：https://github.com/ai/nanoid/blob/HEAD/README.zh-CN.md  
> 包含库介绍、库安装、库使用的详细记录，以及ID之间的冲突可能性

<script setup>
import StoreTemplate from '../../../src/pages/function/normal/storeTemplate.vue'
</script>

<StoreTemplate/>

::: details 代码如下

```vue

<script setup>
  import {ref} from "vue";
  import {tagsGroup} from "../../../utils/tags";

  const form = ref({
    selectWord: '',
    type: '',
    tags: [
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
      <el-table-column prop="type" label="题目类型"/>
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
