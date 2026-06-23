import {ElMessage} from "element-plus";
import {componentMapAnalyzeReal} from "./elementComponentsMap";
import {nanoid} from "nanoid";

export const createElementStructure = (components, props = {}, event = {},
                                       slots = '', modelValue = '',
                                       useTypeScript = false, styleLang = 'css') => {
    // console.log(components.slice(0,2) === 'el')
    // console.log(typeof props === 'object')

    // const modelValueRef = ref(modelValue)

    if (components.slice(0, 2) !== 'el') {
        ElMessage({
            type: 'warning',
            message: '组件命名错误，保证小写 el'
        })
    }
    if (typeof props !== 'object') {
        ElMessage({
            type: 'warning',
            message: 'props 必须是对象类型'
        })
    }
    if (typeof event !== 'object') {
        ElMessage({
            type: 'warning',
            message: 'event 必须是对象类型'
        })
    }

    return {
        key:nanoid(32),
        components,
        props,
        event,
        modelValue,
        slots,
        useTypeScript,
        styleLang
    }
};
