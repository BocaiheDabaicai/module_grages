<script setup>
import {ref} from "vue";
import {tagsGroup} from "../../../utils/tags";

const form = ref({
  title: '',
  type: '',
  status: '',
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
    value: 0,
    label: '问卷',
  },
  {
    value: 1,
    label: '试卷',
  },
]
const optionsStatus = [
  {
    value: 0,
    label: '保存',
  },
  {
    value: 1,
    label: '发布',
  },
  {
    value: 2,
    label: '结束',
  },
  {
    value: 3,
    label: '撤销',
  },
]


const tagsRef = ref(false)

let currentPage = ref(1)
let pageSize = ref(20)

const tableData = [
  {
    title: '消防安全试卷一',
    type: 1,
    totalPoint: 100,
    creator: '管理员admin',
    createTime: '2025-03-22',
    status: 1,
  },
  {
    title: '健康知识问答',
    type: 0,
    totalPoint: 20,
    creator: '管理员admin',
    createTime: '2025-05-02',
    status: 2,
  },
  {
    title: '财务知识试卷二',
    type: 1,
    totalPoint: 100,
    creator: '管理员admin',
    createTime: '2025-09-19',
    status: 3,
  },
  {
    title: '生产知识普及问卷',
    type: 0,
    totalPoint: 60,
    creator: '管理员admin',
    createTime: '2025-11-21',
    status: 0,
  },
  {
    title: '健康知识问答二',
    type: 0,
    totalPoint: 20,
    creator: '管理员admin',
    createTime: '2025-12-21',
    status: 1,
  },
]

const convertType = (value) => {
  return options.find(option => option.value === value).label
}

const convertStatus = (value) => {
  return optionsStatus.find(option => option.value === value).label
}

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
      <el-col :span="4">
        <el-input placeholder="请输入试卷标题" v-model="form.title" clearable/>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="请输入试卷类型" v-model="form.type" clearable>
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="请输入试卷状态" v-model="form.status" clearable>
          <el-option
              v-for="item in optionsStatus"
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
      <el-table-column prop="title" label="试卷标题" width="200"/>
      <el-table-column prop="type" label="试卷类型">
        <template #default="scope">
          {{ convertType(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column prop="totalPoint" label="试卷总分"/>
      <el-table-column prop="creator" label="创建人"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="status" label="试卷状态">
        <template #default="scope">
          {{ convertStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column label="可选操作" min-width="140">
        <template #default="scope">
          <div>
            <el-button style="margin: 0;padding: 0 0.75rem;" type="primary" text>结束</el-button>
            <el-button style="margin: 0;padding: 0 0.75rem;" type="info" text>撤销</el-button>
            <el-button style="margin: 0;padding: 0 0.75rem;" type="success" text>答题情况</el-button>
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
      <el-tag v-for="tag in form.tags" :key="tag.name" closable :type="tag.type" style="margin-right: 0.35rem"
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
