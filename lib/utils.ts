import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updateYearInText(text: string, fromYear: string, toYear: string): string {
  const regex = new RegExp(fromYear, 'g');
  return text.replace(regex, toYear);
}

export function updateDateRange(dateRange: string): string {
  return dateRange.replace(/2023年/g, '2025年');
}

export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN');
}

export function formatPercentageChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}% 较上月`;
}

export function getAvatarUrl(name: string) {
  const femaleIndicators = ['小姐', '女士', '娟', '芳', '花', '琴', '玲']
  const isFemale = femaleIndicators.some(indicator => name.includes(indicator))
  return `/avatars/${isFemale ? '02' : '01'}.png`
}
