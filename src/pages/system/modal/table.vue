<script setup>

import {ref} from "vue";
import {tagsGroup} from "../../../utils/tags";

let modal = ref(false);

let value1 = ref("")
let value2 = ref("")
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

const tags = ref([
  {name: 'Tag 1', type: 'primary'},
  {name: 'Tag 2', type: 'success'},
  {name: 'Tag 3', type: 'info'},
  {name: 'Tag 4', type: 'warning'},
  {name: 'Tag 5', type: 'danger'},
])
const tagsRef = ref(false)

let currentPage = ref(1)
let pageSize = ref(20)

const tableData = [
  {
    title: '消防题1',
    tag: '消防类型',
    type: '选择题',
    score:2,
  },
  {
    title: '安全题2',
    tag: '安全类型',
    type: '多选题',
    score:2,
  },
  {
    title: '技术题3',
    tag: '技术类型',
    type: '填空题',
    score:2,
  },
  {
    title: '计算题4',
    tag: '财务类型',
    type: '选择题',
    score:2,
  },
]

const closeTag = (tag) => {
  // console.log(tag)
  tags.value.splice(tags.value.indexOf(tag), 1)
}
const chooseTag = (tag) => {
  // console.log(tag)
  tags.value.unshift(tag)
}

const select = () => {
  // console.log(tag)
  console.log(value1.value)
  console.log(value2.value)
}

const selectTableItem = (list) => {
  console.log(list)
}
</script>

<template>
  <div class="main">
    <el-button type="primary" @click="modal = !modal">手动选择题目</el-button>

    <el-dialog v-model="modal" title="表格筛选" width="50%">
      <div style="padding: 0.75rem">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-button type="primary" plain style="width: 100%;" @click="tagsRef = !tagsRef">选择题目标签</el-button>
          </el-col>
          <el-col :span="6">
            <el-select placeholder="请输入题目类型" v-model="value2" clearable>
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" style="width: 100%;" @click="select">查询</el-button>
          </el-col>
        </el-row>
        <div style="margin: 0.75rem 0;">
          题目标签：
          <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" style="margin-right: 0.35rem"
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

        <el-table :data="tableData" style="width: 100%" stripe border @select="selectTableItem" @select-all="selectTableItem">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="title" label="题目标题"/>
          <el-table-column prop="tag" label="题目标签">
            <template #default="scope">
              <el-tag type="primary">{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="题目类型" />
          <el-table-column label="默认分值">
            <template #default="scope">
              <el-input-number v-model="scope.row.score" :min="-1"/>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="margin: 0.75rem 0;" justify="end">
          <el-col :span="2"><el-button type="success" style="width: 100%" @click="modal = !modal">确认</el-button></el-col>
        </el-row>
      </div>
    </el-dialog>

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
