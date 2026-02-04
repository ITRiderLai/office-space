/**
 * 页面自适应缩放工具
 * 基于 rem 单位实现等比缩放
 * 
 * 使用说明：
 * 1. 设计稿宽度默认为 1920px
 * 2. 根元素 font-size = 100px (设计稿 1920px / 100 = 1rem)
 * 3. 在样式中使用 rem 单位：设计稿尺寸 / 100 = rem 值
 *    例如：设计稿 68px = 0.68rem，设计稿 200px = 2rem
 */

export interface FlexibleOptions {
  /** 设计稿宽度，默认 1920px */
  designWidth?: number
  /** 最大宽度限制，默认 2560px */
  maxWidth?: number
  /** 最小宽度限制，默认 1280px */
  minWidth?: number
  /** 是否启用防抖，默认 true */
  enableDebounce?: boolean
  /** 防抖延迟时间（毫秒），默认 100ms */
  debounceDelay?: number
}

class Flexible {
  private options: Required<FlexibleOptions>
  private resizeTimer: number | null = null

  constructor(options: FlexibleOptions = {}) {
    this.options = {
      designWidth: options.designWidth || 1920,
      maxWidth: options.maxWidth || 2560,
      minWidth: options.minWidth || 1280,
      enableDebounce: options.enableDebounce !== false,
      debounceDelay: options.debounceDelay || 100
    }
  }

  /**
   * 设置根元素 font-size
   */
  private setRootFontSize = (): void => {
    let clientWidth = document.documentElement.clientWidth || window.innerWidth

    // 限制最大最小宽度
    clientWidth = Math.max(
      this.options.minWidth,
      Math.min(this.options.maxWidth, clientWidth)
    )

    // 计算 font-size
    // 设计稿 1920px = 100px (基准值)
    // 实际宽度 / 设计稿宽度 * 100 = 当前 font-size
    const fontSize = (clientWidth / this.options.designWidth) * 100

    // 设置根元素字体大小
    document.documentElement.style.fontSize = fontSize + 'px'

    // 同时设置 CSS 变量，方便在 CSS 中使用
    document.documentElement.style.setProperty('--design-width', this.options.designWidth + 'px')
    document.documentElement.style.setProperty('--current-width', clientWidth + 'px')
    document.documentElement.style.setProperty('--scale-ratio', String(clientWidth / this.options.designWidth))
    document.documentElement.style.setProperty('--base-font-size', fontSize + 'px')

    // 触发自定义事件，通知页面尺寸已更新
    window.dispatchEvent(new CustomEvent('flexibleUpdate', {
      detail: {
        fontSize,
        clientWidth,
        scale: clientWidth / this.options.designWidth
      }
    }))
  }

  /**
   * 处理窗口大小变化
   */
  private handleResize = (): void => {
    if (this.options.enableDebounce) {
      // 使用防抖优化性能
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer)
      }
      this.resizeTimer = window.setTimeout(() => {
        this.setRootFontSize()
      }, this.options.debounceDelay)
    } else {
      this.setRootFontSize()
    }
  }

  /**
   * 初始化
   */
  public init(): void {
    // 初始设置
    this.setRootFontSize()

    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize)

    // 监听屏幕方向变化（移动端）
    window.addEventListener('orientationchange', this.handleResize)

    // 监听 DOM 内容加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.setRootFontSize)
    }

    console.log('[Flexible] 初始化完成', {
      designWidth: this.options.designWidth,
      maxWidth: this.options.maxWidth,
      minWidth: this.options.minWidth
    })
  }

  /**
   * 销毁，移除事件监听
   */
  public destroy(): void {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('orientationchange', this.handleResize)
    document.removeEventListener('DOMContentLoaded', this.setRootFontSize)
    
    // 重置 font-size
    document.documentElement.style.fontSize = ''
    
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = null
    }

    console.log('[Flexible] 已销毁')
  }

  /**
   * 手动触发更新
   */
  public update(): void {
    this.setRootFontSize()
  }

  /**
   * 获取当前配置
   */
  public getOptions(): Required<FlexibleOptions> {
    return { ...this.options }
  }

  /**
   * 更新配置
   */
  public setOptions(options: Partial<FlexibleOptions>): void {
    this.options = { ...this.options, ...options }
    this.setRootFontSize()
  }
}

// 导出单例
let flexibleInstance: Flexible | null = null

/**
 * 初始化自适应缩放
 */
export function initFlexible(options?: FlexibleOptions): Flexible {
  if (!flexibleInstance) {
    flexibleInstance = new Flexible(options)
    flexibleInstance.init()
  }
  return flexibleInstance
}

/**
 * 获取 Flexible 实例
 */
export function getFlexible(): Flexible | null {
  return flexibleInstance
}

/**
 * 销毁自适应缩放
 */
export function destroyFlexible(): void {
  if (flexibleInstance) {
    flexibleInstance.destroy()
    flexibleInstance = null
  }
}

/**
 * px 转 rem 的辅助函数（用于 JS 中）
 * @param px 像素值
 * @returns rem 字符串
 */
export function pxToRem(px: number): string {
  return (px / 100) + 'rem'
}

/**
 * rem 转 px 的辅助函数（用于 JS 中）
 * @param rem rem 值
 * @returns px 数值
 */
export function remToPx(rem: number): number {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  return rem * fontSize
}

export default Flexible
