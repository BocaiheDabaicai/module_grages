<script setup>
import {
  Menu as IconMenu,
  Delete,
  Search,
} from '@element-plus/icons-vue'
import {defineAsyncComponent, ref, resolveComponent} from "vue";
import {Container, Draggable} from "vue3-smooth-dnd";
import 'element-plus/dist/index.css'
import {createElementStructure} from "../../../utils/createElementStructure";
import {
  componentMap,
  componentMapAnalyze,
  componentMapAnalyzeReal,
  componentMapFunc
} from "../../../utils/elementComponentsMap";
import {generateVueSFC, generateWholeCode} from "../../../utils/vueCodeGenerator";

const form = ref({
  activeName: 'first',
  containerList: [
    {
      "title": "横向容器1",
    },
    {
      "title": "纵向容器1",
    },
    {
      "title": "横向容器2",
    },
    {
      "title": "纵向容器2",
    }
  ],
  componentList: [
    {
      "title": "选择器",
    },
    {
      "title": "选择器",
    },
    {
      "title": "选择器",
    },
    {
      "title": "输入框",
    },
    {
      "title": "按钮",
    },
    {
      "title": "勾选框",
    },
    {
      "title": "表格",
    },
    {
      "title": "分页器",
    }
  ]
})

const onDropContainerItem = (result) => {
  // 移动元素
  // console.log(result)
  let temp = form.value.containerList[result.removedIndex]
  form.value.containerList.splice(result.removedIndex, 1)
  form.value.containerList.splice(result.addedIndex, 0, temp)  // deleteCount 表示要删除元素的数量

}

const onDropComponentItem = (result) => {
  // 移动元素
  // console.log(result)
  let temp = form.value.componentList[result.removedIndex]
  form.value.componentList.splice(result.removedIndex, 1)
  form.value.componentList.splice(result.addedIndex, 0, temp)  // deleteCount 表示要删除元素的数量

}

let test1 = createElementStructure(
    'el-input',
    {
      placeholder: '测试代码',
      type: 'text',
      clearable: true,
      style: {fontSize: '2rem'},
    },
    {
      click: function onClick2 () {
        console.log('test')
      },
    },
    '',
    'asdas',
    'scss'
)

let test2 = createElementStructure(
    'el-button',
    {
      type: 'primary',
      size: 'large'
    },
    {
      click: function onClick () {
        console.log('test')
      },
      update: function onUpdate () {
        console.log('update test')
      }
    },
    '这是一段测试内容',
)

let test4 = createElementStructure(
    'el-col',
    {
      span: 8,
    },
    {},
    'asdas'
)

let test5 = createElementStructure(
    'el-col',
    {
      span: 8,
    },
    {},
    '123127665'
)

let test3 = createElementStructure(
    'el-row',
    {
      gutter: 10,
      style: {width: '100%'},
    },
    {
      click:function onChange1 (){
        console.log('click!!')
      }
    },
    ['这是一段测试内容', test4, test1, test2, test5],
)

// console.log(test3)
// console.log(test1)
// console.log(test2)
// console.log(test3)
console.log(generateWholeCode(test3))

</script>

<template>
  <div class="main">
    <el-tabs
        v-model="form.activeName"
        type="card"
        class="demo-tabs"
        @tab-click=""
    >
      <el-tab-pane label="界面设计" name="first"></el-tab-pane>
      <el-tab-pane label="界面预览" name="second"></el-tab-pane>
      <el-tab-pane label="界面代码" name="third"></el-tab-pane>
      <el-tab-pane label="Json设计" name="fourth"></el-tab-pane>
    </el-tabs>

    <el-row v-if="form.activeName === 'first'" :gutter="10">
      <el-col :span="4">
        <h5 class="mb-2">容器列表</h5>
        <Container @drop="onDropContainerItem" style="max-height: 50rem;overflow-y: scroll">
          <Draggable v-for="item in form.containerList" :key="item">
            <div class="question-list">
              <div style="width: 15rem;margin-right: 0.5rem;word-break: break-all">{{ item.title }}</div>
              <el-button style="width: 5rem;text-align: center" :icon="Delete" type="danger" text @click=""/>
            </div>
          </Draggable>
        </Container>
        <el-button type="success" style="width: 100%;margin-top: 0.5rem;">添加容器</el-button>
      </el-col>
      <el-col :span="4">
        <h5 class="mb-2">组件列表</h5>
        <Container @drop="onDropComponentItem" style="max-height: 50rem;overflow-y: scroll">
          <Draggable v-for="item in form.componentList" :key="item">
            <div class="question-list">
              <div style="width: 15rem;margin-right: 0.5rem;word-break: break-all">{{ item.title }}</div>
              <el-button style="width: 5rem;text-align: center" :icon="Delete" type="danger" text @click=""/>
            </div>
          </Draggable>
        </Container>
        <el-button type="success" style="width: 100%;margin-top: 0.5rem;">添加组件</el-button>
      </el-col>
      <el-col :span="16">
        <h5 class="mb-2">面板配置</h5>
        <el-menu
            default-active="2"
            @open=""
            @close=""
            style="max-height: 50rem;overflow-y: scroll"
        >
          <el-menu-item index="1">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 1</div>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator Twoassssssssssssssssssssssssssssss</div>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 3</div>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 4</div>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 4</div>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 4</div>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 4</div>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 4</div>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 4</div>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 4</div>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 4</div>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 4</div>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <div class="menu-item">Navigator 4</div>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row v-if="form.activeName === 'second'" :gutter="10">
      预览界面
      <component :is="componentMapAnalyzeReal(test1)"/>

      <component :is="componentMapAnalyzeReal(test2)"/>

      <component :is="componentMapAnalyzeReal(test3)"/>
    </el-row>
    <el-row v-if="form.activeName === 'third'" :gutter="10">
      界面代码
      <div class="code-area">
        <pre>{{ generateWholeCode(test3) }}</pre>
      </div>
    </el-row>
    <el-row v-if="form.activeName === 'fourth'" :gutter="10">
      Json设计
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 80vw;
  word-break: break-all;

  .menu-item {
    width: 100%;
    word-break: break-word !important;
    white-space: normal !important;
    line-height: 1rem;
  }

  .question-list {
    display: flex;
    align-items: center;
    background: #f4f4f5;
    padding: 0.55rem;
    margin-top: 0.25rem;
    border-radius: 0.25rem;
  }

  .code-area {
    background-color: #FAFAFA;
    width: 100%;
    padding: 1.25rem;
    margin: 1.25rem;
    font-size: 0.75rem;
  }
}
</style>
