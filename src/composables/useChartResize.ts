import { Ref } from 'vue'

export function useChartResize(chartRef: Ref<HTMLElement | undefined>) {
  const getFontSize = (baseSize: number) => {
    if (!chartRef.value) return baseSize
    const width = chartRef.value.clientWidth
    const scale = Math.min(Math.max(width / 400, 0.8), 1.2)
    return Math.round(baseSize * scale)
  }

  const getLineHeight = (baseHeight: number) => {
    if (!chartRef.value) return baseHeight
    const width = chartRef.value.clientWidth
    const scale = Math.min(Math.max(width / 400, 0.9), 1.1)
    return Math.round(baseHeight * scale)
  }

  return { getFontSize, getLineHeight }
}
