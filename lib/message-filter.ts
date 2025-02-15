// 简单的内存缓存实现
const ipRequestCache = new Map<string, number[]>();

export class MessageFilter {
  // IP频率限制: 每IP每分钟最多3条留言
  static readonly RATE_LIMIT_PER_MINUTE = 3;
  // IP频率限制: 每IP每天最多20条留言
  static readonly RATE_LIMIT_PER_DAY = 20;
  
  // 敏感词列表
  private static readonly SENSITIVE_WORDS = [
    '广告', '推广', '优惠', '促销', '赌博', '博彩',
    'http://', 'https://', 'www.', '.com', '.cn', '.net',
    '联系电话', 'QQ', '微信', 'VX', '威信'
  ];

  // 检查IP频率限制
  static checkRateLimit(ip: string): { allowed: boolean; message?: string } {
    const now = Date.now();
    const minute = 60 * 1000;
    const day = 24 * 60 * minute;

    // 获取或初始化IP的请求记录
    const requests = ipRequestCache.get(ip) || [];
    
    // 清理过期记录
    const validRequests = requests.filter(time => now - time < day);
    
    // 检查每分钟限制
    const recentRequests = validRequests.filter(time => now - time < minute);
    if (recentRequests.length >= this.RATE_LIMIT_PER_MINUTE) {
      return {
        allowed: false,
        message: "留言太频繁,请稍后再试"
      };
    }

    // 检查每天限制
    if (validRequests.length >= this.RATE_LIMIT_PER_DAY) {
      return {
        allowed: false,
        message: "今日留言次数已达上限"
      };
    }

    // 更新请求记录
    validRequests.push(now);
    ipRequestCache.set(ip, validRequests);

    return { allowed: true };
  }

  // 检查敏感词
  static checkContent(content: string): { safe: boolean; words?: string[] } {
    const foundWords = this.SENSITIVE_WORDS.filter(word => 
      content.toLowerCase().includes(word.toLowerCase())
    );

    return {
      safe: foundWords.length === 0,
      words: foundWords.length > 0 ? foundWords : undefined
    };
  }

  // 简单的垃圾留言检测
  static isSpam(content: string): boolean {
    // 重复字符检测
    const repeatedChars = /(.)\1{4,}/;
    if (repeatedChars.test(content)) {
      return true;
    }

    // 重复词组检测
    const words = content.split(/\s+/);
    const uniqueWords = new Set(words);
    if (words.length > 10 && uniqueWords.size < words.length * 0.5) {
      return true;
    }

    return false;
  }
} 