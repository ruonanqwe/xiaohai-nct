// 检测是否为移动设备
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
}

// 检测是否打开了开发者工具
export function isDevToolsOpen(): boolean {
  const threshold = 160
  return (
    window.outerWidth - window.innerWidth > threshold ||
    window.outerHeight - window.innerHeight > threshold
  )
}

// 禁用特定键盘事件
export function disableKeyboardShortcuts(e: KeyboardEvent): boolean {
  // F12
  if (e.keyCode === 123) {
    e.preventDefault()
    return false
  }

  // Ctrl + Shift + I/J/C
  if (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) {
    e.preventDefault()
    return false
  }

  // Ctrl + U
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault()
    return false
  }

  return true
}

// 禁用右键菜单
export function disableContextMenu(e: MouseEvent): void {
  e.preventDefault()
}

// 检测页面可见性
export function handleVisibilityChange(): void {
  if (document.hidden) {
    // 页面不可见时的处理
    console.log('页面不可见')
  }
}

// 防止页面被嵌入iframe
export function preventFraming(): void {
  if (typeof window !== 'undefined' && window.top && window.self && window.top !== window.self) {
    window.top.location = window.self.location
  }
}

// 清除页面选择
export function clearSelection(): void {
  if (window.getSelection) {
    window.getSelection()?.removeAllRanges()
  }
}

// 禁用控制台
export function disableConsole(): void {
  const noop = (): void => undefined
  const methods = ['log', 'debug', 'info', 'warn', 'error', 'clear']
  
  methods.forEach(method => {
    console[method as keyof Console] = noop as any
  })
} 