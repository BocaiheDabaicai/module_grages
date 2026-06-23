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
