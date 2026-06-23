<script setup>

import {ref} from "vue";
import {tagsGroup} from "../../../utils/tags";
import { Container, Draggable } from "vue3-smooth-dnd";
import {Plus} from "@element-plus/icons-vue";


const form = ref({
  title:'',
  type:'',
  description:'',
  totalCount:0,
  tags:[
    {name: 'Tag 1', type: 'primary'},
    {name: 'Tag 2', type: 'success'},
    {name: 'Tag 3', type: 'info'},
    {name: 'Tag 4', type: 'warning'},
    {name: 'Tag 5', type: 'danger'},
  ],
  chooseItemList:[],
  inputTag:false,
  fileList:[],
  dialogImageUrl:'',
  dialogVisible:false,
})

const tagsRef = ref(false)

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

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const addChooseItem = () => {
  form.value.chooseItemList.push({
    title:'',
    isTrue:false,
  })
}

const onDropItem = (result) => {
  // 移动元素
  // console.log(result)
  let temp = form.value.chooseItemList[result.removedIndex]
  form.value.chooseItemList.splice(result.removedIndex,1)
  form.value.chooseItemList.splice(result.addedIndex,0,temp)  // deleteCount 表示要删除元素的数量

}

const chooseTag = (tag) => {
  // console.log(tag)
  form.value.tags.unshift(tag)
}

const closeTag = (tag) => {
  // console.log(tag)
  form.value.tags.splice(form.value.tags.indexOf(tag), 1)
}

const handlePictureCardPreview = (file) => {
  console.log('触发图片显示')
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const test = () => {
  console.log(form.value.type)
  console.log(typeof form.value.type)
}
</script>

<template>
<div class="main">
  <el-form :model="form" label-width="auto" style="max-width: 70%">
    <el-form-item label="题目标题">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="题目类型">
      <el-select placeholder="请输入题目类型" v-model="form.type" clearable @change="test">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <div v-if="[1,2].includes(form.type)" style="width: 100%;">
        <div style="margin: 0.75rem 0;">
          <el-button type="success" :icon="Plus" circle @click="addChooseItem"/>
        </div>
        <Container @drop="onDropItem">
          <Draggable v-for="item in form.chooseItemList" :key="item">
            <el-row :gutter="10">
              <el-col :span="16"><el-input v-model="item.title" clearable/></el-col>
              <el-col :span="8"><el-checkbox v-model="item.isTrue" label="正确答案标识" /></el-col>
            </el-row>
          </Draggable>
        </Container>
      </div>
      <div v-else-if="form.type === 3">
        <div style="margin-top: 0.75rem">
          <el-checkbox v-model="form.inputTag" label="文本域" />
        </div>
      </div>
    </el-form-item>
    <el-form-item label="题目标签">
      <el-button type="primary" plain style="width: 100%;" @click="tagsRef = !tagsRef">选择题目标签</el-button>
      <div style="margin-top: 0.75rem;">
        已选中标签：
        <el-tag v-for="tag in form.tags" :key="tag.name" closable :type="tag.type" style="margin-right: 0.35rem"
                @close="closeTag(tag)">
          {{ tag.name }}
        </el-tag>
      </div>
    </el-form-item>
    <el-form-item label="题目描述">
      <el-input v-model="form.description" :autosize="{ minRows: 3 }" type="textarea"/>
    </el-form-item>
    <el-form-item label="题目相关图片">
      <div style="width: 100%">
        <el-upload
            v-model:file-list="form.fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture"
            :limit="3"
            :on-preview="handlePictureCardPreview"
            :auto-upload="false"
        >
          <el-button type="primary">添加图片</el-button>
          <template #tip>
            <div style="color: #F56C6C">
              限制上传3张图片
            </div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="">提交</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>

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

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</div>
</template>

<style scoped lang="scss">
.main{
  padding: 0.75rem;
}
</style>
