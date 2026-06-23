import {defineAsyncComponent, h, ref, resolveComponent, defineComponent} from "vue";

// 方法已遗弃
export const componentMap = {
    'el-button': defineAsyncComponent(() => import('element-plus').then(mod => mod.ElButton)),
    'el-input': defineAsyncComponent(() => import('element-plus').then(mod => mod.ElInput)),
    'el-tag': defineAsyncComponent(() => import('element-plus').then(mod => mod.ElTag)),
    // ... 可以继续添加其他 Element Plus 组件
};
/*
* 完成组件名称重组
* 实现驼峰式组件表达
* */
export const componentMapFunc = function (component) {
    return component.split('-').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('')
}

/*
* 完成组件信息解构
* 生成对应的 element-vue 组件
* 生成虚拟结点
* */
export const componentMapAnalyze = function (componentObj) {
    // let component = resolveComponent(componentObj.components)
    let component = ''

    let input1 = ref(componentObj.modelValue)
    // console.log(component)

    const componentName = componentObj.components
    if (componentName.startsWith('el-')) {
        component = defineAsyncComponent(() =>
            import('element-plus').then(mod => mod[componentMapFunc(componentName)] || null))
    }

    // console.log(componentName)
    // console.log(component)
    // console.log(Object.keys(componentObj.event))

    if (componentName === 'el-input') {
        componentObj.event['update:modelValue'] = (value) => {
            input1.value = value
            console.log('Input value changed:', value)
        }
    }

    // console.log(componentObj)

    return h(
        component,
        {
            ...componentObj.props,
            modelValue: input1.value,
            // 处理事件
            ...Object.keys(componentObj.event).reduce((acc, key) => {
                acc[`on${key.charAt(0).toUpperCase()}${key.slice(1)}`] = componentObj.event[key]
                return acc
            }, {})
        },
        componentObj.slots
    )
}

/*
* 完成组件信息解构
* 生成对应的 element-vue 组件
* 生成真实结点
* 解决问题：
* 1. 虚拟结点不断刷新的问题
* 2. 响应值不更新的问题
* 3. 支持可三种选择的组件生成方式
*   （1） <component :is="componentMapAnalyzeReal(test1)"/>
*   （2） <component :is="comp1"/>
*   （3） <comp1/>
* 4. 解决子组件嵌套问题
* */
export const componentMapAnalyzeReal = function (componentObj) {
    // let component = resolveComponent(componentObj.components)
    let component = ''

    const componentName = componentObj.components
    if (componentName.startsWith('el-')) {
        component = defineAsyncComponent(() =>
            import('element-plus').then(mod => mod[componentMapFunc(componentName)] || null))
    }

    return defineComponent({
        name: `Dynamic${componentMapFunc(componentName)}`,
        setup() {
            const modelValue = ref(componentObj.modelValue)

            const handleUpdateModelValue = (value) => {
                modelValue.value = value
                // console.log('值更新:', value)

                /*// 调用用户定义的事件
                if (componentObj.event['update:modelValue']) {
                    componentObj.event['update:modelValue'](value)
                }*/
            }

            const normalizeChildren = (children) => {
                // 如果是数组，递归处理每个子元素
                if (Array.isArray(children)) {
                    return children.map((child, index) => {
                        // 如果是字符串，直接返回
                        if (typeof child === 'string') {
                            return child
                        }

                        // 如果是组件配置对象，递归创建组件
                        if (child && typeof child === 'object' && child.components) {
                            const ChildComponent = componentMapAnalyzeReal(child)
                            return h(ChildComponent, {key: child.key || index})
                        }

                        // 其他情况返回 null
                        return null
                    }).filter(Boolean)
                }

                // 如果是字符串，直接返回
                if (typeof children === 'string') {
                    return children
                }

                return ''
            }

            return () => {
                componentObj.event['update:modelValue'] = handleUpdateModelValue
                const children = normalizeChildren(componentObj.slots);


                return h(
                    component,
                    {
                        key: componentObj.key,
                        ...componentObj.props,
                        modelValue: modelValue.value,
                        // 处理事件
                        ...Object.keys(componentObj.event).reduce((acc, key) => {
                            acc[`on${key.charAt(0).toUpperCase()}${key.slice(1)}`] = componentObj.event[key]
                            return acc
                        }, {})
                    },
                    () => children
                )
            }
        },
    })
}
