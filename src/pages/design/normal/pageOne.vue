<script setup>
import {
  Delete,
  Plus,
} from '@element-plus/icons-vue'
import { ref, computed, watch } from "vue"
import { Container, Draggable } from "vue3-smooth-dnd"
import 'element-plus/dist/index.css'
import { createElementStructure } from "../../../utils/createElementStructure"
import { componentMapAnalyzeReal } from "../../../utils/elementComponentsMap"
import { generateWholeCode } from "../../../utils/vueCodeGenerator"
import { ElMessage } from "element-plus"

const form = ref({
  activeName: 'first',
  designTree: null,
  selectedKey: null,
  containerList: [
    { title: "el-row", type: "el-row", defaultProps: {} },
    { title: "el-col", type: "el-col", defaultProps: { span: 12 } },
    { title: "el-card", type: "el-card", defaultProps: {} },
    { title: "el-form", type: "el-form", defaultProps: {} },
    { title: "el-tabs", type: "el-tabs", defaultProps: {} },
  ],
  componentList: [
    { title: "el-input", type: "el-input", defaultProps: { placeholder: "请输入", clearable: true } },
    { title: "el-button", type: "el-button", defaultProps: { type: "primary" }, defaultSlots: "按钮" },
    { title: "el-select", type: "el-select", defaultProps: { placeholder: "请选择", clearable: true } },
    { title: "el-checkbox", type: "el-checkbox", defaultProps: {}, defaultSlots: "选项" },
    { title: "el-switch", type: "el-switch", defaultProps: {} },
    { title: "el-date-picker", type: "el-date-picker", defaultProps: { placeholder: "请选择日期", type: "date" } },
    { title: "el-tag", type: "el-tag", defaultProps: {}, defaultSlots: "标签" },
    { title: "el-table", type: "el-table", defaultProps: { border: true, stripe: true } },
    { title: "el-pagination", type: "el-pagination", defaultProps: { total: 100, layout: "prev, pager, next" } },
    { title: "el-radio", type: "el-radio", defaultProps: {}, defaultSlots: "单选项" },
    { title: "el-rate", type: "el-rate", defaultProps: {} },
    { title: "el-slider", type: "el-slider", defaultProps: {} },
    { title: "el-link", type: "el-link", defaultProps: { type: "primary" }, defaultSlots: "链接" },
    { title: "el-text", type: "el-text", defaultProps: {}, defaultSlots: "文本内容" },
  ],
})

const containerTypes = ["el-row", "el-col", "el-card", "el-form", "el-tabs", "el-tab-pane", "el-form-item"]

/* ---- tree helpers ---- */
function findNode(tree, key) {
  if (!tree) return null
  if (tree.key === key) return tree
  if (Array.isArray(tree.slots)) {
    for (const child of tree.slots) {
      const found = findNode(child, key)
      if (found) return found
    }
  }
  return null
}

function removeNode(tree, key) {
  if (!tree) return null
  if (tree.key === key) return null
  if (Array.isArray(tree.slots)) {
    const filtered = tree.slots.filter(child => child.key !== key)
    if (filtered.length !== tree.slots.length) {
      tree.slots = filtered
      return tree
    }
    for (const child of tree.slots) {
      removeNode(child, key)
    }
  }
  return tree
}

function addChildToNode(tree, parentKey, child) {
  if (!tree) return
  const parent = findNode(tree, parentKey)
  if (!parent) return
  if (!Array.isArray(parent.slots)) {
    parent.slots = typeof parent.slots === 'string' && parent.slots ? [parent.slots] : []
  }
  parent.slots.push(child)
}

/* ---- flatten tree for display ---- */
const flattenedTree = computed(() => {
  const result = []
  function walk(node, depth) {
    if (!node) return
    result.push({ node, depth, key: node.key })
    if (Array.isArray(node.slots)) {
      for (const child of node.slots) {
        if (typeof child === 'object' && child.components) {
          walk(child, depth + 1)
        }
      }
    }
  }
  walk(form.value.designTree, 0)
  return result
})

/* ---- selected node ---- */
const selectedNode = computed(() => {
  if (!form.value.selectedKey || !form.value.designTree) return null
  return findNode(form.value.designTree, form.value.selectedKey)
})

const isContainerNode = computed(() => {
  if (!selectedNode.value) return false
  return containerTypes.includes(selectedNode.value.components)
})

/* ---- editing props ---- */
const editingProps = ref({})
const editingText = ref('')

function selectNode(key) {
  form.value.selectedKey = key
  const node = findNode(form.value.designTree, key)
  if (node) {
    editingProps.value = { ...node.props }
    editingText.value = typeof node.slots === 'string' ? node.slots : ''
  }
}

function applyProps() {
  if (!selectedNode.value) return
  selectedNode.value.props = { ...editingProps.value }
  if (typeof selectedNode.value.slots === 'string') {
    selectedNode.value.slots = editingText.value
  } else if (!Array.isArray(selectedNode.value.slots) && editingText.value) {
    selectedNode.value.slots = editingText.value
  }
}

function onPropChange(key, value) {
  editingProps.value = { ...editingProps.value, [key]: value }
  applyProps()
}

function onTextChange(value) {
  editingText.value = value
  if (selectedNode.value && typeof selectedNode.value.slots === 'string') {
    selectedNode.value.slots = value
  } else if (selectedNode.value && !Array.isArray(selectedNode.value.slots)) {
    selectedNode.value.slots = value
  }
}

/* ---- actions ---- */
function addContainerItem() {
  form.value.containerList.push({
    title: "新容器",
    type: "el-row",
    defaultProps: {}
  })
}

function removeContainerItem(index) {
  form.value.containerList.splice(index, 1)
}

function addComponentItem() {
  form.value.componentList.push({
    title: "新组件",
    type: "el-input",
    defaultProps: { placeholder: "请输入" }
  })
}

function removeComponentItem(index) {
  form.value.componentList.splice(index, 1)
}

function addToDesign(item) {
  const isContainer = containerTypes.includes(item.type)
  const child = createElementStructure(
    item.type,
    { ...(item.defaultProps || {}) },
    {},
    isContainer ? [] : (item.defaultSlots || ''),
    ''
  )

  if (!form.value.designTree) {
    form.value.designTree = child
    form.value.selectedKey = child.key
    selectNode(child.key)
  } else if (form.value.selectedKey && isContainerNode.value) {
    addChildToNode(form.value.designTree, form.value.selectedKey, child)
    form.value.selectedKey = child.key
    selectNode(child.key)
  } else if (isContainerNode.value) {
    addChildToNode(form.value.designTree, selectedNode.value.key, child)
    form.value.selectedKey = child.key
    selectNode(child.key)
  } else {
    ElMessage.warning('请先选择一个容器节点，再添加子组件')
  }
}

function addChildToSelected() {
  if (!form.value.selectedKey || !isContainerNode.value) {
    ElMessage.warning('请先选择一个容器节点')
    return
  }
  const item = form.value.componentList[0]
  if (!item) return
  const child = createElementStructure(
    item.type,
    { ...(item.defaultProps || {}) },
    {},
    item.defaultSlots || '',
    ''
  )
  addChildToNode(form.value.designTree, form.value.selectedKey, child)
}

function deleteSelectedNode() {
  if (!form.value.selectedKey || !form.value.designTree) return
  if (form.value.designTree.key === form.value.selectedKey) {
    form.value.designTree = null
    form.value.selectedKey = null
    editingProps.value = {}
    editingText.value = ''
    return
  }
  form.value.designTree = removeNode(form.value.designTree, form.value.selectedKey)
  form.value.selectedKey = null
  editingProps.value = {}
  editingText.value = ''
}

function clearDesign() {
  form.value.designTree = null
  form.value.selectedKey = null
  editingProps.value = {}
  editingText.value = ''
}

/* ---- drag handlers ---- */
const onDropContainerItem = (result) => {
  const temp = form.value.containerList[result.removedIndex]
  form.value.containerList.splice(result.removedIndex, 1)
  form.value.containerList.splice(result.addedIndex, 0, temp)
}

const onDropComponentItem = (result) => {
  const temp = form.value.componentList[result.removedIndex]
  form.value.componentList.splice(result.removedIndex, 1)
  form.value.componentList.splice(result.addedIndex, 0, temp)
}

/* ---- tab 2: preview ---- */
const previewComponent = computed(() => {
  if (!form.value.designTree) return null
  return componentMapAnalyzeReal(form.value.designTree)
})

/* ---- tab 3: code ---- */
const generatedCode = computed(() => {
  if (!form.value.designTree) return '// 暂无设计内容'
  return generateWholeCode(form.value.designTree)
})

/* ---- tab 4: json ---- */
const jsonText = ref('')
const jsonError = ref('')

function refreshJson() {
  if (!form.value.designTree) {
    jsonText.value = ''
    return
  }
  const replacer = (key, value) => {
    if (typeof value === 'function') return '[Function: ' + (value.name || 'anonymous') + ']'
    return value
  }
  jsonText.value = JSON.stringify(form.value.designTree, replacer, 2)
}

function applyJson() {
  try {
    const parsed = JSON.parse(jsonText.value)
    if (!parsed.components || !parsed.key) {
      jsonError.value = 'JSON 结构无效：缺少 components 或 key 字段'
      return
    }
    form.value.designTree = parsed
    form.value.selectedKey = null
    editingProps.value = {}
    editingText.value = ''
    jsonError.value = ''
    ElMessage.success('JSON 已应用')
  } catch (e) {
    jsonError.value = 'JSON 解析错误: ' + e.message
  }
}

function resetJson() {
  refreshJson()
  jsonError.value = ''
}

/* ---- watch tab change ---- */
watch(() => form.value.activeName, (name) => {
  if (name === 'fourth') refreshJson()
})

/* ---- component display name ---- */
function displayName(node) {
  if (!node || !node.components) return ''
  const props = node.props || {}
  const summaries = []
  if (props.placeholder) summaries.push(props.placeholder)
  if (props.type && props.type !== 'text') summaries.push(props.type)
  if (props.span) summaries.push('span:' + props.span)
  const summary = summaries.length ? ' (' + summaries.join(', ') + ')' : ''
  return node.components + summary
}
</script>

<template>
  <div class="main">
    <el-tabs
        v-model="form.activeName"
        type="card"
        class="demo-tabs"
    >
      <el-tab-pane label="界面设计" name="first"></el-tab-pane>
      <el-tab-pane label="界面预览" name="second"></el-tab-pane>
      <el-tab-pane label="界面代码" name="third"></el-tab-pane>
      <el-tab-pane label="Json设计" name="fourth"></el-tab-pane>
    </el-tabs>

    <!-- Tab 1: 界面设计 -->
    <el-row v-if="form.activeName === 'first'" :gutter="10">
      <el-col :span="4">
        <h5 class="mb-2">容器列表</h5>
        <Container @drop="onDropContainerItem" style="max-height: 40rem;overflow-y: auto">
          <Draggable v-for="(item, index) in form.containerList" :key="index">
            <div class="question-list">
              <div class="item-title">{{ item.title }}</div>
              <el-button size="small" type="primary" :icon="Plus" circle @click="addToDesign(item)" />
              <el-button size="small" :icon="Delete" type="danger" circle text @click="removeContainerItem(index)" />
            </div>
          </Draggable>
        </Container>
        <el-button type="success" style="width: 100%;margin-top: 0.5rem" @click="addContainerItem">添加容器类型</el-button>
      </el-col>

      <el-col :span="4">
        <h5 class="mb-2">组件列表</h5>
        <Container @drop="onDropComponentItem" style="max-height: 40rem;overflow-y: auto">
          <Draggable v-for="(item, index) in form.componentList" :key="index">
            <div class="question-list">
              <div class="item-title">{{ item.title }}</div>
              <el-button size="small" type="primary" :icon="Plus" circle @click="addToDesign(item)" />
              <el-button size="small" :icon="Delete" type="danger" circle text @click="removeComponentItem(index)" />
            </div>
          </Draggable>
        </Container>
        <el-button type="success" style="width: 100%;margin-top: 0.5rem" @click="addComponentItem">添加组件类型</el-button>
      </el-col>

      <el-col :span="16">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem">
          <h5 class="mb-2" style="margin: 0">设计画布</h5>
          <el-button type="danger" size="small" text @click="clearDesign" v-if="form.designTree">清空全部</el-button>
        </div>

        <div class="canvas-area">
          <!-- Empty state -->
          <div v-if="!form.designTree" class="empty-canvas">
            <el-empty description="点击左侧容器或组件列表中的 + 按钮开始设计" />
          </div>

          <!-- Tree view -->
          <div v-else class="tree-view">
            <div
                v-for="item in flattenedTree"
                :key="item.key"
                class="tree-node"
                :class="{ selected: item.key === form.selectedKey }"
                :style="{ paddingLeft: (item.depth * 1.5 + 0.75) + 'rem' }"
                @click="selectNode(item.key)"
            >
              <span class="node-icon">
                {{ containerTypes.includes(item.node.components) ? '&#9638;' : '&#9642;' }}
              </span>
              <span class="node-name">{{ displayName(item.node) }}</span>
              <span class="node-actions">
                <el-button
                    v-if="containerTypes.includes(item.node.components)"
                    size="small"
                    type="primary"
                    text
                    :icon="Plus"
                    @click.stop="form.selectedKey = item.key; addChildToSelected()"
                    title="添加子组件"
                />
                <el-button
                    size="small"
                    type="danger"
                    text
                    :icon="Delete"
                    @click.stop="form.selectedKey = item.key; deleteSelectedNode()"
                    title="删除"
                />
              </span>
            </div>
          </div>
        </div>

        <!-- Property editor -->
        <div v-if="selectedNode" class="props-editor">
          <h5 style="margin-top: 0; margin-bottom: 0.75rem; border-bottom: 1px solid #e4e7ed; padding-bottom: 0.5rem">
            属性编辑 — {{ selectedNode.components }}
          </h5>

          <!-- common text/content -->
          <div class="prop-row" v-if="typeof selectedNode.slots === 'string'">
            <label>文本内容</label>
            <el-input
                v-model="editingText"
                placeholder="输入文本内容"
                @input="onTextChange"
                clearable
            />
          </div>

          <!-- el-input -->
          <template v-if="selectedNode.components === 'el-input'">
            <div class="prop-row">
              <label>placeholder</label>
              <el-input v-model="editingProps.placeholder" @input="onPropChange('placeholder', editingProps.placeholder)" />
            </div>
            <div class="prop-row">
              <label>type</label>
              <el-select v-model="editingProps.type" @change="onPropChange('type', editingProps.type)">
                <el-option label="text" value="text" />
                <el-option label="textarea" value="textarea" />
                <el-option label="password" value="password" />
              </el-select>
            </div>
            <div class="prop-row">
              <label>clearable</label>
              <el-switch v-model="editingProps.clearable" @change="onPropChange('clearable', editingProps.clearable)" />
            </div>
            <div class="prop-row">
              <label>maxlength</label>
              <el-input-number v-model="editingProps.maxlength" @change="onPropChange('maxlength', editingProps.maxlength)" :min="0" />
            </div>
          </template>

          <!-- el-button -->
          <template v-if="selectedNode.components === 'el-button'">
            <div class="prop-row">
              <label>type</label>
              <el-select v-model="editingProps.type" @change="onPropChange('type', editingProps.type)">
                <el-option label="primary" value="primary" />
                <el-option label="success" value="success" />
                <el-option label="warning" value="warning" />
                <el-option label="danger" value="danger" />
                <el-option label="info" value="info" />
                <el-option label="default" value="" />
              </el-select>
            </div>
            <div class="prop-row">
              <label>size</label>
              <el-select v-model="editingProps.size" @change="onPropChange('size', editingProps.size)">
                <el-option label="large" value="large" />
                <el-option label="default" value="default" />
                <el-option label="small" value="small" />
              </el-select>
            </div>
            <div class="prop-row">
              <label>plain</label>
              <el-switch v-model="editingProps.plain" @change="onPropChange('plain', editingProps.plain)" />
            </div>
            <div class="prop-row">
              <label>round</label>
              <el-switch v-model="editingProps.round" @change="onPropChange('round', editingProps.round)" />
            </div>
          </template>

          <!-- el-select -->
          <template v-if="selectedNode.components === 'el-select'">
            <div class="prop-row">
              <label>placeholder</label>
              <el-input v-model="editingProps.placeholder" @input="onPropChange('placeholder', editingProps.placeholder)" />
            </div>
            <div class="prop-row">
              <label>clearable</label>
              <el-switch v-model="editingProps.clearable" @change="onPropChange('clearable', editingProps.clearable)" />
            </div>
          </template>

          <!-- el-row -->
          <template v-if="selectedNode.components === 'el-row'">
            <div class="prop-row">
              <label>gutter</label>
              <el-input-number v-model="editingProps.gutter" @change="onPropChange('gutter', editingProps.gutter)" :min="0" />
            </div>
            <div class="prop-row">
              <label>justify</label>
              <el-select v-model="editingProps.justify" @change="onPropChange('justify', editingProps.justify)">
                <el-option label="start" value="start" />
                <el-option label="center" value="center" />
                <el-option label="end" value="end" />
                <el-option label="space-between" value="space-between" />
                <el-option label="space-around" value="space-around" />
              </el-select>
            </div>
            <div class="prop-row">
              <label>align</label>
              <el-select v-model="editingProps.align" @change="onPropChange('align', editingProps.align)">
                <el-option label="top" value="top" />
                <el-option label="middle" value="middle" />
                <el-option label="bottom" value="bottom" />
              </el-select>
            </div>
          </template>

          <!-- el-col -->
          <template v-if="selectedNode.components === 'el-col'">
            <div class="prop-row">
              <label>span</label>
              <el-input-number v-model="editingProps.span" @change="onPropChange('span', editingProps.span)" :min="1" :max="24" />
            </div>
            <div class="prop-row">
              <label>offset</label>
              <el-input-number v-model="editingProps.offset" @change="onPropChange('offset', editingProps.offset)" :min="0" :max="24" />
            </div>
          </template>

          <!-- el-tag -->
          <template v-if="selectedNode.components === 'el-tag'">
            <div class="prop-row">
              <label>type</label>
              <el-select v-model="editingProps.type" @change="onPropChange('type', editingProps.type)">
                <el-option label="primary" value="primary" />
                <el-option label="success" value="success" />
                <el-option label="warning" value="warning" />
                <el-option label="danger" value="danger" />
                <el-option label="info" value="info" />
                <el-option label="default" value="" />
              </el-select>
            </div>
            <div class="prop-row">
              <label>closable</label>
              <el-switch v-model="editingProps.closable" @change="onPropChange('closable', editingProps.closable)" />
            </div>
          </template>

          <!-- el-date-picker -->
          <template v-if="selectedNode.components === 'el-date-picker'">
            <div class="prop-row">
              <label>type</label>
              <el-select v-model="editingProps.type" @change="onPropChange('type', editingProps.type)">
                <el-option label="date" value="date" />
                <el-option label="datetime" value="datetime" />
                <el-option label="daterange" value="daterange" />
                <el-option label="month" value="month" />
                <el-option label="year" value="year" />
              </el-select>
            </div>
            <div class="prop-row">
              <label>placeholder</label>
              <el-input v-model="editingProps.placeholder" @input="onPropChange('placeholder', editingProps.placeholder)" />
            </div>
          </template>

          <!-- el-switch -->
          <template v-if="selectedNode.components === 'el-switch'">
            <div class="prop-row">
              <label>active-text</label>
              <el-input v-model="editingProps.activeText" @input="onPropChange('activeText', editingProps.activeText)" />
            </div>
            <div class="prop-row">
              <label>inactive-text</label>
              <el-input v-model="editingProps.inactiveText" @input="onPropChange('inactiveText', editingProps.inactiveText)" />
            </div>
          </template>

          <!-- el-pagination -->
          <template v-if="selectedNode.components === 'el-pagination'">
            <div class="prop-row">
              <label>total</label>
              <el-input-number v-model="editingProps.total" @change="onPropChange('total', editingProps.total)" :min="0" />
            </div>
            <div class="prop-row">
              <label>layout</label>
              <el-input v-model="editingProps.layout" @input="onPropChange('layout', editingProps.layout)" />
            </div>
          </template>

          <!-- generic JSON props editor for types without specific editor -->
          <div class="prop-row" v-if="!['el-input','el-button','el-select','el-row','el-col','el-tag','el-date-picker','el-switch','el-pagination'].includes(selectedNode.components)">
            <label>Props (JSON)</label>
            <el-input
                type="textarea"
                :model-value="JSON.stringify(editingProps, null, 2)"
                @input="(val) => { try { editingProps = JSON.parse(val); applyProps(); } catch(e) {} }"
                :rows="6"
            />
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- Tab 2: 界面预览 -->
    <el-row v-if="form.activeName === 'second'" :gutter="10">
      <div v-if="!form.designTree" style="width: 100%; text-align: center; padding: 4rem 0; color: #909399">
        暂无设计内容，请先在「界面设计」中添加组件
      </div>
      <div v-else style="width: 100%; padding: 1.25rem">
        <component :is="previewComponent" />
      </div>
    </el-row>

    <!-- Tab 3: 界面代码 -->
    <el-row v-if="form.activeName === 'third'" :gutter="10">
      <div v-if="!form.designTree" style="width: 100%; text-align: center; padding: 4rem 0; color: #909399">
        暂无设计内容，请先在「界面设计」中添加组件
      </div>
      <div v-else class="code-area">
        <pre>{{ generatedCode }}</pre>
      </div>
    </el-row>

    <!-- Tab 4: Json 设计 -->
    <el-row v-if="form.activeName === 'fourth'" :gutter="10">
      <el-col :span="16">
        <h5 class="mb-2">JSON 设计数据</h5>
        <el-input
            type="textarea"
            v-model="jsonText"
            :rows="20"
            placeholder="JSON 数据..."
            style="font-family: monospace; font-size: 0.8rem"
        />
        <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem">
          <el-button type="primary" @click="applyJson">应用 JSON</el-button>
          <el-button @click="resetJson">重置</el-button>
        </div>
        <div v-if="jsonError" style="color: #f56c6c; margin-top: 0.5rem; font-size: 0.85rem">{{ jsonError }}</div>
      </el-col>
      <el-col :span="8">
        <h5 class="mb-2">使用说明</h5>
        <div class="json-help">
          <p>直接编辑左侧的 JSON 数据来修改设计树结构。</p>
          <p>每个节点需要包含：</p>
          <ul>
            <li><code>components</code> — 组件名（如 el-input）</li>
            <li><code>props</code> — 属性对象</li>
            <li><code>slots</code> — 字符串（文本）或数组（子组件）</li>
            <li><code>key</code> — 唯一标识</li>
          </ul>
          <p>点击「应用 JSON」后，预览和代码 Tab 会同步更新。</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 80vw;
  word-break: break-all;

  .mb-2 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .item-title {
    width: 10rem;
    margin-right: 0.5rem;
    word-break: break-all;
    font-size: 0.85rem;
  }

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
    padding: 0.4rem 0.55rem;
    margin-top: 0.25rem;
    border-radius: 0.25rem;
    gap: 0.25rem;
  }

  .canvas-area {
    min-height: 18rem;
    max-height: 28rem;
    overflow-y: auto;
    border: 1px solid #e4e7ed;
    border-radius: 0.25rem;
    padding: 0.5rem;
    background: #fafafa;
  }

  .empty-canvas {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 18rem;
  }

  .tree-view {
    .tree-node {
      display: flex;
      align-items: center;
      padding: 0.4rem 0.75rem;
      margin: 0.15rem 0;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background 0.15s;
      gap: 0.4rem;

      &:hover {
        background: #ecf5ff;
      }

      &.selected {
        background: #d9ecff;
        border-left: 3px solid #409eff;
      }

      .node-icon {
        font-size: 0.8rem;
        color: #909399;
        flex-shrink: 0;
      }

      .node-name {
        flex: 1;
        font-size: 0.85rem;
        font-family: monospace;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .node-actions {
        display: flex;
        gap: 0.15rem;
        flex-shrink: 0;
      }
    }
  }

  .props-editor {
    margin-top: 0.75rem;
    padding: 0.75rem;
    border: 1px solid #e4e7ed;
    border-radius: 0.25rem;
    background: #fff;

    .prop-row {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      gap: 0.75rem;

      label {
        width: 5.5rem;
        font-size: 0.85rem;
        color: #606266;
        flex-shrink: 0;
        text-align: right;
      }

      .el-input,
      .el-select,
      .el-input-number {
        flex: 1;
      }
    }
  }

  .code-area {
    background-color: #282c34;
    color: #abb2bf;
    width: 100%;
    padding: 1.25rem;
    margin: 1.25rem;
    font-size: 0.75rem;
    border-radius: 0.35rem;
    overflow-x: auto;

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-all;
      font-family: 'Fira Code', 'Consolas', monospace;
    }
  }

  .json-help {
    background: #f4f4f5;
    padding: 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.85rem;
    color: #606266;
    line-height: 1.6;

    ul {
      padding-left: 1.2rem;
    }

    code {
      background: #e4e7ed;
      padding: 0.1rem 0.3rem;
      border-radius: 0.15rem;
      font-size: 0.8rem;
    }
  }
}
</style>
