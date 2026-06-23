<template>
  <div class="demo-card">
      <h3>Element Plus 组件展示</h3>

      <!-- 测试各种 Element Plus 组件 -->
      <div style="margin: 20px 0;">
        <el-button type="primary" @click="handleClick">主要按钮</el-button>
        <el-button type="success" @click="visible = true">打开对话框</el-button>
        <el-button type="warning" @click="message">显示消息</el-button>
      </div>

      <!-- 图标展示 -->
      <div style="margin: 15px 0;">
        <el-icon size="20"><Edit /></el-icon>
        <el-icon size="20" color="#409EFF"><Search /></el-icon>
        <el-icon size="20" color="#67C23A"><Check /></el-icon>
      </div>

      <!-- 输入框 -->
      <el-input
          v-model="inputText"
          placeholder="请输入内容"
          style="width: 300px; margin-bottom: 15px;"
      />
      <div>您输入了：{{ inputText }}</div>

      <!-- 对话框 -->
      <el-dialog v-model="visible" title="提示" width="30%">
        <span>这是一个 Element Plus 对话框</span>
        <template #footer>
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="visible = false">确定</el-button>
        </template>
      </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Search, Check } from '@element-plus/icons-vue'


const inputText = ref('')
const visible = ref(false)


const handleClick = () => {
  ElMessage.success('按钮点击成功！')
}

const message = () => {
  ElMessage.warning('这是一个警告消息')
}
</script>

<style scoped>
.demo-card {
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  margin: 20px 0;
  background: #f8f9fa;
}
</style>
