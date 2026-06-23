/**
 * 将扁平区域数据转换为树形结构
 * @param {Object} flatData 原始扁平数据对象，键为区域代码，值为对象（下级区域）或字符串（名称）
 * @param {string} parentCode 父级代码，默认 '86' 表示根级（中国）
 * @returns {Array} 树形结构数组
 */
export function buildTree(flatData, parentCode = '86') {
    // 获取当前父级下的直接子节点列表
    const currentLevel = flatData[parentCode];
    if (!currentLevel) return [];

    // 如果 currentLevel 是对象，则遍历其键值对；如果是字符串（即叶子节点名称），则返回空
    if (typeof currentLevel !== 'object') return [];

    // 将当前层级的键值对转换为数组
    const children = Object.entries(currentLevel).map(([code, name]) => ({
        label: name,
        value: code,
        children: buildTree(flatData, code) // 递归查找下一级
    }));

    return children;
}
