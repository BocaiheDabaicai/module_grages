# 低代码平台


低代码平台是本项目的核心创新模块，旨在通过可视化的拖拽和配置方式，让开发者无需手写代码即可快速构建前端界面。

## 平台架构

平台围绕组件结构树（`createElementStructure`）运作，每个组件以统一的 JSON 结构表达，包含组件名、属性、事件、插槽内容及样式语言等完整信息。该结构既能驱动真实组件渲染，也能逆向生成 Vue SFC 源码，实现设计 ↔ 代码的双向闭环。

## 四大核心面板

1. **界面设计**：三栏布局，左侧为容器模板库（`el-row`、`el-card`、`el-form` 等），中间为组件模板库（`el-input`、`el-button`、`el-select`、`el-table`、`el-pagination` 等 14 种常用组件），右侧为树形设计画布。选中任意节点后，底部属性编辑器根据组件类型动态展示对应配置项，修改即时生效。

2. **界面预览**：基于 `componentMapAnalyzeReal` 将设计树实时渲染为可交互的 Element Plus 组件，所见即所得。

3. **界面代码**：基于 `generateWholeCode` 将设计树逆向生成为格式化 Vue 单文件组件（SFC）代码，可直接复制到项目中使用。

4. **Json 设计**：提供设计树的 JSON 源码视图，支持直接编辑 JSON 来批量修改组件结构，应用后同步更新预览和代码。

## 技术实现

- **组件映射**（`elementComponentsMap.js`）：将组件结构对象动态解析为 Vue 虚拟节点，支持嵌套子组件的递归渲染，解决了虚拟结点反复刷新和响应值不更新的问题。
- **代码生成器**（`vueCodeGenerator.js`）：将组件树逆向还原为 Vue SFC 代码，包含 `template`、`script setup`、`style` 三部分，支持 TypeScript 和 SCSS/Less 等样式语言。
- **拖拽排序**：使用 `vue3-smooth-dnd` 实现容器与组件模板的拖拽排序，便于快速调整工作区布局。
