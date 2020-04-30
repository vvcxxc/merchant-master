import request from '@/services/request'

export const getGiftList = (number: any) => {
  return request({
    url: 'api/gift/getMatterGift',
    method: 'get',
    data: {
      init_repertory_num: number
    }
  })
}
