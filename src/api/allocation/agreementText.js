import request from '@/utils/request'

// 入驻协议文本
export function agreementText(data) {
    return request({
      url: '/rich_text/settled',
      method: 'GET',
      data: data
    })
  }