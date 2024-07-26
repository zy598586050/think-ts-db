// 首字母大写
export const firstToUpper = (str: string) => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}