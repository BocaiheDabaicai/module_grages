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
