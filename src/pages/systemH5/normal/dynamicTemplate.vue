<script setup>
// 1 单选、2 多选、3 填空、4 图片上传
import {ref} from "vue";

const data = ref({
  "recordId": 0,
  "title": "关于研发项目的培训考试",
  "remark": "考试时间为30分钟",
  "type": 1,
  "showAnswerType": 0,
  "questionNum": 6,
  "totalScore": 100,
  "validStartTime": "2026-01-20T11:23:10.894+08:00",
  "validEndTime": "2026-01-20T11:23:10.894+08:00",
  "questionDataList": [
    {
      "questionId": 1,
      "orderIndex": 1,
      "title": "请输入您的名字：",
      "remark": "输入名字！",
      "type": 3,
      "fillingNum": 20,
      "picUrlList": null,
      "questionScore": 5,
      "answerList": null
    },
    {
      "questionId": 2,
      "orderIndex": 2,
      "title": "请输入您的部门：",
      "remark": "输入部门！",
      "type": 3,
      "fillingNum": 10,
      "picUrlList": [
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      ],
      "questionScore": 5,
      "answerList": null
    },
    {
      "questionId": 3,
      "orderIndex": 3,
      "title": "请选择以下哪个颜色是正确选项：",
      "remark": "备注说明！",
      "type": 2,
      "fillingNum": null,
      "picUrlList": [
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      ],
      "questionScore": 5,
      "answerList": [
        {
          "answerId": null,
          "content": "红色",
          "index": 0
        },
        {
          "answerId": null,
          "content": "黄色",
          "index": 1
        },
        {
          "answerId": null,
          "content": "橙色",
          "index": 2
        },
        {
          "answerId": null,
          "content": "紫色",
          "index": 3
        }
      ]
    },
    {
      "questionId": 4,
      "orderIndex": 4,
      "title": "请选择以下哪个不是歌界四大天王：",
      "remark": "",
      "type": 1,
      "fillingNum": null,
      "picUrlList": null,
      "questionScore": 5,
      "answerList": [
        {
          "answerId": null,
          "content": "张国荣",
          "index": 0
        },
        {
          "answerId": null,
          "content": "刘德华",
          "index": 1
        },
        {
          "answerId": null,
          "content": "刘少华",
          "index": 2
        },
        {
          "answerId": null,
          "content": "刘景涛",
          "index": 3
        }
      ]
    },
    {
      "questionId": 5,
      "orderIndex": 5,
      "title": "请填写你对公司建议?",
      "remark": "聆听您的声音.",
      "type": 3,
      "fillingNum": 500,
      "picUrlList": [
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      ],
      "questionScore": 5,
      "answerList": null
    },
    {
      "questionId": 6,
      "orderIndex": 6,
      "title": "请提交你的投诉问题?",
      "remark": "根据实际情况上传",
      "type": 4,
      "fillingNum": null,
      "picUrlList": [
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      ],
      "questionScore": 5,
      "answerList": null,
      "fileList": []
    }
  ]
})

const rowsCalculate = (charLength) => {
  switch (charLength) {
    case charLength > 20 && charLength <= 50:
      return 2;
    case charLength > 50 && charLength <= 200:
      return 3;
    default:
      return 5;
  }
}

</script>

<template>
  <div>
    <el-row>
      <el-col :span="24"><h2 style="text-align: center">{{ data.title }}</h2></el-col>
      <el-col :span="24"><p style="margin: 0;color: #606266;font-size: 1rem">问题数量：{{ data.questionNum }}</p></el-col>
      <el-col :span="24"><p style="margin: 0;color: #909399;font-size: 0.75rem">是否显示答案：{{ data.showAnswerType  ? '显示':'不显示' }}</p></el-col>
      <el-col :span="24"><p style="margin: 0;color: #909399;font-size: 0.75rem">总分：{{ data.totalScore }}</p></el-col>
      <el-col :span="24"><p style="margin: 0;color: #909399;font-size: 0.75rem">卷类型：{{ data.type===1 ? '试卷' : '问卷' }}</p></el-col>
      <el-col :span="24"><p style="margin: 0;color: #909399;font-size: 0.75rem">开始时间：{{ data.validStartTime }}</p></el-col>
      <el-col :span="24"><p style="margin: 0;color: #909399;font-size: 0.75rem">截止时间：{{ data.validEndTime }}</p></el-col>
      <el-divider/>
    </el-row>
    <el-row style="padding: 0.75rem;margin-bottom: 0.15rem;">
      <template v-for="item in data.questionDataList" :key="item">
        <el-col v-if="item.type === 1" :span="24" style="margin-top: 0.75rem;margin-bottom: 1.5rem;">
          <p style="margin: 0.5rem 0;font-weight: bold">{{item.orderIndex}}. {{ item.title }}</p>
          <p style="margin: 0.5rem 0;color: #606266">问题分数：{{ item.questionScore }} 分</p>
          <p style="margin: 0.5rem 0;color: #606266">
            <template v-if="item.picUrlList">
              <el-image
                  v-for="pic in item.picUrlList"
                  :key="pic"
                  style="width: 25%;"
                  :src="pic"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[pic]"
                  show-progress
                  fit="cover"
              />
            </template>
          </p>
          <el-radio-group v-model="item.choose">
            <el-radio v-for="choice in item.answerList" :key="item" :value="choice.index">{{ choice.content }}</el-radio>
          </el-radio-group>
          <p style="margin: 0.5rem 0;color: #909399">{{ item.remark }}</p>
        </el-col>

        <el-col v-if="item.type === 2" :span="24" style="margin-top: 0.75rem;margin-bottom: 1.5rem;">
          <p style="margin: 0.5rem 0;font-weight: bold">{{item.orderIndex}}. {{ item.title }}</p>
          <p style="margin: 0.5rem 0;color: #606266">问题分数：{{ item.questionScore }} 分</p>
          <p style="margin: 0.5rem 0;color: #606266">
            <template v-if="item.picUrlList">
              <el-image
                  v-for="pic in item.picUrlList"
                  :key="pic"
                  style="width: 25%;"
                  :src="pic"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[pic]"
                  show-progress
                  fit="cover"
              />
            </template>
          </p>

          <el-checkbox-group v-model="item.chooseList">
            <el-checkbox v-for="choice in item.answerList" :key="item" :value="choice.index">{{ choice.content }}
            </el-checkbox>
          </el-checkbox-group>
          <p style="margin: 0.5rem 0;color: #909399">{{ item.remark }}</p>
        </el-col>

        <el-col v-if="item.type === 3" :span="24" style="margin-top: 0.75rem;margin-bottom: 1.5rem;">
          <p style="margin: 0.5rem 0;font-weight: bold">{{item.orderIndex}}. {{ item.title }}</p>
          <p style="margin: 0.5rem 0;color: #606266">问题分数：{{ item.questionScore }} 分</p>
          <p style="margin: 0.5rem 0;color: #606266">
            <template v-if="item.picUrlList">
              <el-image
                  v-for="pic in item.picUrlList"
                  :key="pic"
                  style="width: 25%;"
                  :src="pic"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[pic]"
                  show-progress
                  fit="cover"
              />
            </template>
          </p>
          <el-input v-model="item.input" :maxlength="item.fillingNum" show-word-limit
                    :type="item.fillingNum <= 20 ?'text':'textarea'"
                    :autosize="{minRows:rowsCalculate(item.fillingNum)}"
                    clearable
          />
          <p style="margin: 0.5rem 0;color: #909399">{{ item.remark }}</p>
        </el-col>

        <el-col v-if="item.type === 4" :span="24" style="margin-top: 0.75rem;margin-bottom: 1.5rem;">
          <p style="margin: 0.5rem 0;font-weight: bold">{{item.orderIndex}}. {{ item.title }}</p>
          <p style="margin: 0.5rem 0;color: #606266">问题分数：{{ item.questionScore }} 分</p>
          <p style="margin: 0.5rem 0;color: #606266">
            <template v-if="item.picUrlList">
              <el-image
                  v-for="pic in item.picUrlList"
                  :key="pic"
                  style="width: 25%;"
                  :src="pic"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[pic]"
                  show-progress
                  fit="cover"
              />
            </template>
          </p>

          <el-upload
              v-model:file-list="item.fileList"
              action="aUrl"
              :headers="{Authorization: 'Bearer testtest'  }"
              list-type="picture"
              :auto-upload="false"
          >
            <el-button type="primary">点击此处上传</el-button>
            <template #tip>
              <div>
                jpg/png 文件大小不要超过 500kb
              </div>
            </template>
          </el-upload>

          <p style="margin: 0.5rem 0;color: #909399">{{ item.remark }}</p>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.h5-style-detail {
  padding: 0.75rem;
  margin-bottom: 0.15rem;
  //border: 0.05rem solid #CDD0D6;
  //border-radius: 1rem;
}
</style>
