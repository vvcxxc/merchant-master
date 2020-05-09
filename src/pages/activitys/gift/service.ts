import request from '@/services/request'

export const getGiftList = (number: any, page: number) => {
  return request({
    url: 'api/gift/getMatterGift',
    method: 'get',
    params: {
      init_repertory_num: number,
      page
    }
  })
}
