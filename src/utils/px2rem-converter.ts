/**
 * px 转 rem 转换工具
 * 用于批量转换样式文件中的 px 单位为 rem
 * 
 * 使用方法：
 * node scripts/px2rem.js <文件路径>
 * 
 * 或在代码中使用：
 * import { convertPxToRem } from '@/utils/px2rem-converter'
 */

/**
 * px 转 rem（基于设计稿 1920px）
 * @param px 像素值
 * @param base 基准值，默认 100
 * @returns rem 字符串
 */
export function px2rem(px: number, base = 100): string {
  return (px / base).toFixed(2) + 'rem'
}

/**
 * 转换 CSS 字符串中的 px 为 rem
 * @param cssString CSS 字符串
 * @param base 基准值，默认 100
 * @returns 转换后的 CSS 字符串
 */
export function convertPxToRem(cssString: string, base = 100): string {
  // 匹配数字+px的模式，但排除注释和特殊情况
  return cssString.replace(/(\d+(?:\.\d+)?)px/g, (match, pxValue) => {
    const value = parseFloat(pxValue)
    
    // 保留 0px, 1px 等边框常用值
    if (value === 0 || value === 1) {
      return match
    }
    
    // 转换为 rem
    const remValue = (value / base).toFixed(4).replace(/\.?0+$/, '')
    return `px2rem(${pxValue})`
  })
}

/**
 * 转换整个样式块
 * @param styleBlock 样式代码块
 * @returns 转换后的样式块
 */
export function convertStyleBlock(styleBlock: string): string {
  // 跳过已经使用 px2rem 的行
  const lines = styleBlock.split('\n')
  const convertedLines = lines.map(line => {
    // 如果已经包含 px2rem，跳过
    if (line.includes('px2rem(') || line.includes('vw(') || line.includes('vh(')) {
      return line
    }
    
    // 如果是注释，跳过
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      return line
    }
    
    // 转换该行
    return convertPxToRem(line)
  })
  
  return convertedLines.join('\n')
}

/**
 * 生成 px 到 rem 的对照表
 * @param maxPx 最大 px 值
 * @param step 步长
 * @param base 基准值
 */
export function generateRemTable(maxPx = 1000, step = 10, base = 100): void {
  console.log('px -> rem 对照表（基准值: ' + base + 'px）')
  console.log('━'.repeat(40))
  console.log('px\t\trem')
  console.log('━'.repeat(40))
  
  for (let px = 0; px <= maxPx; px += step) {
    const rem = (px / base).toFixed(2)
    console.log(`${px}px\t\t${rem}rem`)
  }
  
  console.log('━'.repeat(40))
}

/**
 * 常用尺寸快速转换
 */
export const commonSizes = {
  // 字体大小
  fonts: {
    12: '0.12rem',
    14: '0.14rem',
    16: '0.16rem',
    18: '0.18rem',
    20: '0.2rem',
    22: '0.22rem',
    24: '0.24rem',
    26: '0.26rem',
    28: '0.28rem',
    30: '0.3rem',
    32: '0.32rem',
    36: '0.36rem',
    48: '0.48rem'
  },
  
  // 间距
  spacings: {
    4: '0.04rem',
    8: '0.08rem',
    10: '0.1rem',
    12: '0.12rem',
    16: '0.16rem',
    20: '0.2rem',
    24: '0.24rem',
    32: '0.32rem',
    40: '0.4rem',
    48: '0.48rem',
    64: '0.64rem'
  },
  
  // 宽度
  widths: {
    240: '2.4rem',
    320: '3.2rem',
    400: '4rem',
    480: '4.8rem',
    600: '6rem',
    800: '8rem',
    1000: '10rem',
    1200: '12rem',
    1600: '16rem'
  }
}

/**
 * 打印常用尺寸对照表
 */
export function printCommonSizes(): void {
  console.log('\n📏 常用字体大小')
  console.log('━'.repeat(30))
  Object.entries(commonSizes.fonts).forEach(([px, rem]) => {
    console.log(`${px}px = ${rem}`)
  })
  
  console.log('\n📐 常用间距')
  console.log('━'.repeat(30))
  Object.entries(commonSizes.spacings).forEach(([px, rem]) => {
    console.log(`${px}px = ${rem}`)
  })
  
  console.log('\n📊 常用宽度')
  console.log('━'.repeat(30))
  Object.entries(commonSizes.widths).forEach(([px, rem]) => {
    console.log(`${px}px = ${rem}`)
  })
}

export default {
  px2rem,
  convertPxToRem,
  convertStyleBlock,
  generateRemTable,
  printCommonSizes,
  commonSizes
}
