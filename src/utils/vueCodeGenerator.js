// utils/vueCodeGenerator.js
/**
 * 增强版 Vue 代码生成器
 * 将动态组件配置逆向生成格式良好的 Vue 单文件组件 (SFC) 代码
 */

/**
 * 生成 Vue 单文件组件代码
 * @param {Object} options 生成选项
 * @param {String} options.componentName 组件标签名，如 'ElButton'
 * @param {Object} options.props 组件属性对象
 * @param {Object} options.events 组件事件处理函数映射对象，键为事件名，值为函数字符串或函数名
 * @param {any} options.modelValue 当前 v-model 绑定的值
 * @param {String|Array} options.slots 插槽内容，字符串或VNode数组的描述
 * @param {String} options.importPath 组件导入路径，默认 'element-plus'
 * @param {Boolean} options.useTypeScript 是否生成 TypeScript 代码
 * @param {String} options.styleLang 样式语言，如 'scss', 'less'，默认 'css'
 * @returns {String} 格式化的 Vue SFC 代码字符串
 */
export function generateVueSFC({
                                   componentName,
                                   props = {},
                                   events = {},
                                   modelValue = undefined,
                                   slots = '',
                                   importPath = 'element-plus',
                                   useTypeScript = false,
                                   styleLang = 'css'
                               }) {
    const vModelComponents = ['ElInput', 'ElSelect', 'ElCheckbox', 'ElRadio', 'ElSwitch', 'ElSlider'];

    // 1. 处理组件名：转换 PascalCase 用于导入，kebab-case 用于模板
    const importName = componentName.startsWith('El') ? componentName : `El${componentName}`;
    const templateName = componentName; // Element Plus 组件在模板中通常直接使用注册名

    // 2. 处理 Props：智能生成绑定字符串
    const propsEntries = Object.entries(props);
    const propsBindings = propsEntries.map(([key, value]) => {
        const valueType = typeof value;

        if (valueType === 'boolean') {
            // 布尔值：如果为 true 则只写属性名，false 则不渲染
            return value ? key : '';
        } else if (valueType === 'string') {
            // 字符串：检查是否为变量或静态值
            const isVariable = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(value) && !value.includes(' ');
            return isVariable ? `:${key}="${value}"` : `${key}="${value}"`;
        } else {
            // 数字、对象、数组等：使用动态绑定
            return `:${key}="${JSON.stringify(value)}"`;
        }
    }).filter(Boolean).join(' ');

    // 3. 处理 v-model (支持自定义 prop/event 名)
    let modelBinding = '';
    if (modelValue !== undefined) {
        // 检测是否为支持 v-model 的常见 Element Plus 组件

        const useVModelDirective = vModelComponents.includes(importName);

        if (useVModelDirective) {
            // 使用 v-model 指令（更简洁）
            modelBinding = `v-model="modelValue"`;
        } else {
            // 回退到手动绑定 :modelValue 和 @update:modelValue
            modelBinding = `:modelValue="modelValue" @update:modelValue="handleModelUpdate"`;
        }
    }

    // 4. 处理事件
    const eventsEntries = Object.entries(events);
    const eventHandlers = eventsEntries.map(([event, handler]) => {
        const handlerName = typeof handler === 'function' ? handler.name : handler;
        return `@${event}="${handlerName}"`;
    }).join(' ');

    // 5. 处理插槽
    let slotContent = '';
    if (slots) {
        if (typeof slots === 'string') {
            slotContent = slots;
        } else if (Array.isArray(slots)) {
            // 简化处理：假设数组内都是文本或简单配置
            slotContent = slots.map(slot => {
                if (typeof slot === 'string') return slot;
                if (slot.name && slot.content) {
                    return `<template #${slot.name}>${slot.content}</template>`;
                }
                return '';
            }).join('');
        }
    }

    // 6. 构建模板部分
    const template = `
<template>
  <div class="generated-component">
    <${templateName}
      ${[modelBinding, propsBindings, eventHandlers].filter(Boolean).join(' ')}
    >
      ${slotContent}
    </${templateName}>
  </div>
</template>`;

    // 7. 构建脚本部分
    const scriptLang = useTypeScript ? 'ts' : 'js';
    const scriptSetup = useTypeScript ? 'setup lang="ts"' : 'setup';

    const modelValueType = useTypeScript ?
        `const modelValue = ref<${typeof modelValue}(${JSON.stringify(modelValue)})` :
        `const modelValue = ref(${JSON.stringify(modelValue)})`;

    const imports = [`import { ${importName} } from '${importPath}'`];
    if (modelValue !== undefined || eventsEntries.length > 0) {
        imports.push("import { ref } from 'vue'");
    }

    const eventHandlerFunctions = eventsEntries.map(([event, handler]) => {
        const handlerName = typeof handler === 'function' ? handler.name : handler;
        const handlerBody = typeof handler === 'function' ?
            `// ${handler.toString().replace(/\n/g, '\n  // ')}` :
            `console.log('${event} 事件被触发')`;

        return `
const ${handlerName} = () => {
  ${handlerBody}
}`;
    }).join('');

    const modelUpdateHandler = modelValue !== undefined && !vModelComponents.includes(importName) ? `
const handleModelUpdate = (newValue) => {
  modelValue.value = newValue
  console.log('模型值更新:', newValue)
}` : '';

    const script = `
<script ${scriptSetup}>
${imports.join('\n')}

${modelValue !== undefined ? modelValueType + ';\n' : ''}
${eventHandlerFunctions}
${modelUpdateHandler}
</script>`;

    // 8. 构建样式部分
    const style = `
<style ${styleLang && styleLang !== 'css' ? `lang="${styleLang}"` : ''} scoped>
.generated-component {
  /* 生成的组件容器样式 */
  margin: 1em 0;
}
</style>`;

    // 9. 返回完整的 SFC 代码
    return `${template.trim()}\n\n${script.trim()}\n\n${style.trim()}`;
}

/**
 * 快速生成常用 Element Plus 组件的代码
 * @param {String} componentType 组件类型，如 'button', 'input', 'select'
 * @param {Object} overrides 覆盖默认配置
 * @returns {String} Vue SFC 代码
 */
export function generateElementComponent(componentType, overrides = {}) {
    const defaults = {
        button: {
            componentName: 'ElButton',
            props: {type: 'primary', size: 'default'},
            slots: '按钮文本'
        },
        input: {
            componentName: 'ElInput',
            props: {placeholder: '请输入...', clearable: true},
            modelValue: ''
        },
        select: {
            componentName: 'ElSelect',
            props: {placeholder: '请选择'},
            slots: [
                {
                    name: 'default',
                    content: '<ElOption label="选项1" value="1" />\n      <ElOption label="选项2" value="2" />'
                }
            ],
            modelValue: ''
        },
        form: {
            componentName: 'ElForm',
            slots: `
    <ElFormItem label="用户名">
      <ElInput v-model="formData.username" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="submitForm">提交</ElButton>
    </ElFormItem>`,
            props: {model: 'formData', 'label-width': '100px'}
        }
    };

    const config = {...defaults[componentType], ...overrides};
    return generateVueSFC(config);
}

/**
 * 将生成的代码格式化为更易读的形式（可选）
 * 实际项目中可集成 Prettier
 */
export function formatGeneratedCode(code, indentSize = 2) {
    // 简单的格式化逻辑（实际项目建议使用 Prettier API）
    const lines = code.split('\n');
    let indentLevel = 0;

    const formattedLines = lines.map(line => {
        const trimmed = line.trim();

        // 减少缩进
        if (trimmed.startsWith('</')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }

        const indentedLine = ' '.repeat(indentLevel * indentSize) + trimmed;

        // 增加缩进
        if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
            indentLevel++;
        }

        return indentedLine;
    });

    return formattedLines.join('\n');
}

/*
* 实现组件代码逆编码过程
* 得到原始生成的组件代码
* */

export const generateWholeCode = function (elementStructure) {
    /*components, props = {}, event = {},
        slots = '', modelValue = '',
        useTypeScript = false, styleLang = 'css'*/
    console.log(elementStructure)

    let props = {...elementStructure.props}
    let events = {...elementStructure.event}
    let style = props.style
    delete props.style

    let styleKeys = Object.keys(style)
    // console.log(style)
    let styleResult = styleKeys.map(item => `${item}:${style[item]}`).join(';')
    let constructStyle = `style="${styleResult};"`

    let propsKeys = Object.keys(props)
    // console.log(props)
    let propsResult = propsKeys.map(item => `:${item}="${props[item]}"`).join(' ')

    let eventsKeys = Object.keys(events)
    // console.log(eventsKeys)
    let eventsResult = eventsKeys.map(item => `@${item}="${events[item].name}"`).join(' ')
    let eventsResultScript = eventsKeys.map(item => `${events[item]} `).join('\n')

    let slotsResult = generateChildWholeCode(elementStructure.slots)
    let childEventsResult = generateChildWholeCodeScript(elementStructure.slots)

    console.log(slotsResult)
    console.log(childEventsResult)

    const finalTemplate = `
    <script setup>
        ${eventsResultScript}
        ${childEventsResult}
    </script>
    <template>
        <${elementStructure.components} ${propsResult} ${eventsResult} ${constructStyle}>
            ${slotsResult}
        </${elementStructure.components}>
    </template>
    `

    console.log(finalTemplate)
    return finalTemplate
}

const generateChildWholeCode = (slots) => {
    console.log(slots)

    if (typeof slots === 'string')
        return slots;
    else {
        let slotsArray = slots.map(slot => {
            if (typeof slot === 'string')
                return slot
            else {
                let props = {...slot.props}
                let constructStyle = '';
                let eventsResult = '';
                if (props.style) {
                    let style = props.style
                    delete props.style

                    let styleKeys = Object.keys(style)
                    // console.log(style)
                    let styleResult = styleKeys.map(item => `${item}:${style[item]}`).join(';')
                    constructStyle = `style="${styleResult};"`
                }

                if(slot.event){
                    let events = {...slot.event}
                    let eventsKeys = Object.keys(events)
                    // console.log(eventsKeys)
                    eventsResult = eventsKeys.map(item => `@${item}="${events[item].name}"`).join(' ')
                }

                let propsKeys = Object.keys(props)
                // console.log(props)
                let propsResult = propsKeys.map(item => `:${item}="${props[item]}"`).join(' ')

                return `
            <${slot.components} ${propsResult} ${eventsResult} ${constructStyle}>
                ${slot.slots ? generateChildWholeCode(slot.slots) : ''}
            </${slot.components}>
        `
            }
        });

        // console.log(slotsArray.join('\n'))
        return slotsArray.join('');
    }
}

const generateChildWholeCodeScript = function (slots){
    // console.log(slots)
    if (slots.length <= 0)
        return null;
    else {
        let slotsArray = slots.map(slot => {
            if(typeof slot === 'string' || slot.event === undefined) return ;
            else {
                let eventsArray = Object.keys(slot.event)
                if (eventsArray.length === 0) {
                    return undefined;
                } else {
                    return eventsArray.map(item => `${slot.event[item]} `).join('\n')
                }
            }
        }).filter(Boolean)
        // console.log(slotsArray.join('\n'))
        return slotsArray.join('\n');
    }

}
