<script setup>
import {ref} from 'vue'
import {buildTree} from "../../../utils/area";
import regionData from "china-area-data";

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const chooseArea1 = () => {
  // 收集省份
  // console.log(regionData['86'][value1.value])
  value2.value = ''
  value3.value = ''
};
const chooseArea2 = () => {
  // 收集市区
  // console.log(regionData[value1.value][value2.value])
  value3.value = ''
};
const chooseArea3 = () => {
  // 收集地区
  // console.log(regionData[value2.value][value3.value])
};
</script>

<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-select v-model="value1" placeholder="请输入省份" style="width: 100%" @change="chooseArea1">
        <el-option
            v-for="item in buildTree(regionData,'86')"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select v-model="value2" placeholder="请输入市区" style="width: 100%" @change="chooseArea2">
        <el-option
            v-for="item in buildTree(regionData,value1)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select v-model="value3" placeholder="请输入地区" style="width: 100%" @change="chooseArea3">
        <el-option
            v-for="item in buildTree(regionData,value2)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-col>
  </el-row>
  <p style="margin: 0.5rem 0;color: #909399">Tips: 请点击输入框</p>
</template>

<style scoped lang="scss">

</style>
