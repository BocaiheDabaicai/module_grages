---
aside: false
---
# 高级条件筛选模板

该模板集成了筛选条件、分页、表格的组件，以及适配了标准的页面样式。  
主要包括：输入框、选择框、标签选择框、分页器、表格、表格可选项、模态框以及一系列标准响应函数  
主要内容如下：

<script setup>
import ConditionTemplate from '../../../src/pages/system/advanced/conditionTemplate.vue';
import Details from '../../../src/pages/system/modal/details.vue';
import CheckDetails from '../../../src/pages/system/modal/checkDetails.vue'
</script>

<ConditionTemplate/>

::: details 代码如下
```vue
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

```
:::

补充：  
`tagsGroup`变量的属性值： 
```js
const tagsGroup = [
    { name: '业务1', type: 'primary' },
    { name: '业务2', type: 'success' },
    { name: '业务3', type: 'info' },
    { name: '业务4', type: 'warning' },
    { name: '业务5', type: 'danger' },
]
```

---
#### 答题详情页面  

<Details/>

::: details 代码如下
```vue
<script setup>
//答题人【答题标识】、提交时间、当前分值、是否批阅【0 - 未批阅、1 - 部分批阅、2 - 全部批阅】
const tableData = [
  {
    responsePerson: 'test1',
    submitTime: '2025-03-11',
    currentPoint: 24,
    isRead: 0,
  },
  {
    responsePerson: 'test2',
    submitTime: '2025-03-12',
    currentPoint: 31,
    isRead: 1,
  },
  {
    responsePerson: 'test3',
    submitTime: '2025-04-11',
    currentPoint: 32,
    isRead: 2,
  },
  {
    responsePerson: 'test1',
    submitTime: '2025-04-12',
    currentPoint: 39,
    isRead: 2,
  },
]
const options = [
  {
    value: 0,
    label: '未批阅',
  },
  {
    value: 1,
    label: '部分批阅',
  },
  {
    value: 2,
    label: '全部批阅',
  },
]


const convertIsRead = (value) => {
  return options.find(option => option.value === value).label
}
</script>

<template>
  <div class="main">
    <h4 style="margin: 0.5rem 0">试卷基本情况</h4>
    <el-descriptions title="" column="2">
      <el-descriptions-item label="试卷标题" width="50%">财务知识试卷二</el-descriptions-item>
      <el-descriptions-item label="试卷类型" width="50%">试卷</el-descriptions-item>
      <el-descriptions-item label="试卷总分">200</el-descriptions-item>
      <el-descriptions-item label="答题总人数">67</el-descriptions-item>
      <el-descriptions-item label="试卷描述" span="2">So, I went to the library and I looked up Advances in Molten Salt
        Chemistry
        volume six because there's an article in there about the chemistry and electrochemistry of magnesium production.
        所以我去了趟图书馆，查阅了,第六版的《高级熔融态盐化学》,因为那里面有一篇关于生产镁的,化学和电化学的文章。 固态化学导论课程节选
        : 麻省理工公开课
      </el-descriptions-item>
    </el-descriptions>
    <h4 style="margin: 0.5rem 0">答题人列表</h4>
    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column prop="responsePerson" label="答题人"/>
      <el-table-column prop="submitTime" label="提交时间"/>
      <el-table-column prop="currentPoint" label="当前分值"/>
      <el-table-column prop="isRead" label="是否批阅">
        <template #default="scope">
          {{ convertIsRead(scope.row.isRead) }}
        </template>
      </el-table-column>
      <el-table-column label="可选操作" min-width="80">
        <template #default="scope">
          <div>
            <el-button style="margin: 0;padding: 0 0.75rem;" type="primary" text>查看</el-button>
            <el-button style="margin: 0;padding: 0 0.75rem;" type="success" text>批阅</el-button>
            <el-button style="margin: 0;padding: 0 0.75rem;" type="danger" text>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
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
#### 答题查看页面  

<CheckDetails/>

::: details 代码如下
```vue
<script setup>

import {ref} from "vue";

const activeName = ref("one")
const form = ref({
  title: '消防安全试卷一',
  tag: [
    {name: 'Tag 1', type: 'primary'},
    {name: 'Tag 2', type: 'success'},
    {name: 'Tag 3', type: 'info'},
    {name: 'Tag 4', type: 'warning'},
    {name: 'Tag 5', type: 'danger'},
  ],
  description: `也许他们只是不想问太多的问题，因为他们甚至没要求查看我们的证件就把房间租给了我们。Maybe they just didn't want to ask too many questions, because they rented us a room without even asking to see our papers.`,
  picture: [
    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  ],
  responseDetails: `我打电话来查看我的电脑状况。I'm calling to check on the status of my computer.23我们每时每刻都在查看邮箱。We check email at all hours of the day.`,
  point: 0,
  chooseList: [
    {
      content:'发生火灾时，以下哪种做法是正确的？',
      point: 2,
      rightAnswerObj: {
        answer:'选项A',
        explanation:'火灾时电梯可能断电停运，且电梯井易形成烟囱效应；返回房间和长时间躲藏均可能延误逃生时机。正确做法是用湿毛巾捂住口鼻防烟，弯腰低姿减少烟气吸入，沿疏散通道迅速撤离。'
      },
      questionList: [
        {
          label: '选项A',
          content: '乘坐电梯快速下楼'
        },
        {
          label: '选项B',
          content: '用湿毛巾捂住口鼻，弯腰低姿沿疏散通道撤离'
        },
        {
          label: '选项C',
          content: '立即返回房间收拾贵重物品'
        },
        {
          label: '选项D',
          content: '躲在卫生间等待救援'
        }
      ],
      responseObject: {
        label: '选项C',
        content: '立即返回房间收拾贵重物品'
      },
    },
    {
      content: '使用干粉灭火器扑救固体火灾时，应对准火焰的哪个部位喷射？',
      point: 2,
      rightAnswerObj: {
        answer:'选项B',
        explanation:'灭火时应对准火焰根部喷射，从燃烧源头部切断火势。若对准火焰上部或中部，灭火剂无法有效覆盖燃烧物表面，可能导致复燃。'
      },
      questionList: [
        {
          label: '选项A',
          content: '火焰上部'
        },
        {
          label: '选项B',
          content: '火焰中部'
        },
        {
          label: '选项C',
          content: '火焰根部'
        },
        {
          label: '选项D',
          content: '任意位置均可'
        }
      ],
      responseObject: {
        label: '选项B',
        content: '火焰中部'
      },
    },
    {
      content: '测试选择题3',
      point: 2,
      rightAnswerObj: {
        answer:'选项C',
        explanation:'测试测试测试测试测试测试'
      },
      questionList: [
        {
          label: '选项A',
          content: '测试测试测试测试测试测试'
        },
        {
          label: '选项B',
          content: '测试测试测试测试测试测试'
        },
        {
          label: '选项C',
          content: '测试测试测试测试测试测试'
        },
        {
          label: '选项D',
          content: '测试测试测试测试测试测试'
        }
      ],
      responseObject: {
        label: '选项A',
        content: '测试测试测试测试测试测试'
      },
    },
  ]
})

const compareAnswerColor = (value1, value2) => {
  return value1 === value2 ? '#67C23A' : '#F56C6C'
}

const getRightAnswer = () => {
  return form.value.chooseList.filter(item => item.rightAnswerObj.answer === item.responseObject.label).length
}

</script>

<template>
  <div class="main">
    <el-tabs
        v-model="activeName"
        type="card"
        @tab-click=""
    >
      <el-tab-pane label="选择题页" name="one">
        <el-form :model="form">
          <el-form-item label="题目标题" label-width="10%">
            <el-input readonly v-model="form.title"/>
          </el-form-item>
          <el-form-item label="题目标签" label-width="10%">
            <el-tag v-for="tag in form.tag" :key="tag" :type="tag.type" style="margin-right: 0.5rem;">{{ tag.name }}
            </el-tag>
          </el-form-item>
          <el-form-item label="题目描述" label-width="10%">
            <el-input readonly v-model="form.description" type="textarea" :autosize="{ minRows: 3 }"/>
          </el-form-item>
          <el-form-item label="图片" label-width="10%">
            <el-image
                style="width: 100px; height: 100px"
                :src="form.picture[0]"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="form.picture"
                show-progress
                fit="cover"
            />
            <div style="height: 100%;display: flex;align-items: end;padding: 0.25rem">共 {{ form.picture.length }}
              张图片
            </div>
          </el-form-item>
          <el-form-item label="答题内容" label-width="10%">
            <el-input readonly v-model="form.responseDetails" type="textarea" :autosize="{ minRows: 3 }"/>
          </el-form-item>
          <el-form-item label="分值" label-width="10%">
            <el-input-number readonly v-model="form.point"/>
          </el-form-item>
        </el-form>
        <div v-for="item in form.chooseList" :key="item">
          <div style="padding: 0.55rem 0;font-weight: bold">问题：{{ item.content }}</div>
          <div v-for="chooseObj in item.questionList" :key="chooseObj" style="display: flex;background-color: #F5F7FA;padding: 0.5rem;margin: 0.5rem">
            <div style="width: 10%">{{ chooseObj.label }}</div>
            <div style="width: 60%;word-break: break-all">{{ chooseObj.content }}</div>
          </div>
          <div style="margin-top: 1.25rem;">
            <div>
              答题人回答：<span :style="{color:compareAnswerColor(item.responseObject.label,item.rightAnswerObj.answer)}">{{ item.responseObject.label }}</span>
            </div>
            <div style="width: 70%;word-break:break-all;color: #909399">解释：{{item.rightAnswerObj.explanation}}</div>
          </div>
          <div style="display: flex;justify-content: space-between">
            <div style="padding: 0.25rem 0;">分值：{{ item.point }}</div>
            <div style="padding: 0.25rem 0;">正确选项：{{ item.rightAnswerObj.answer }}
            </div>
          </div>
          <el-divider/>
        </div>
        <h4 style="margin: 0.5rem 0">得分统计</h4>
        <div style="display: flex;justify-content: space-between;">
          <div>选对数: <span>{{ getRightAnswer() }}</span> 道</div>
          <div>选错数: <span>{{form.chooseList.length - getRightAnswer()}}</span> 道</div>
          <div>总得分: <span>{{ getRightAnswer() * 2 }}</span> 分</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="填空题页" name="two">
        - 题目标题、题目标签、题目描述、图片、答题内容、分值【试卷支持】
      </el-tab-pane>
      <el-tab-pane label="图片题页" name="three">
        - 题目标题、题目标签、题目描述

        - 显示上传的图片文件
      </el-tab-pane>
    </el-tabs>
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
#### 题目批阅页面  
