import React, { Component, useEffect, useState, useReducer } from 'react';
import { InputItem, List, Flex, ImagePicker, Toast } from 'antd-mobile';
import upload from '@/services/oss';
import styles from './index.less'
/* 
  监听state得时候 propImage可能拿不到值??? 但是反过来就可以取到值???
*/
interface params {
  showFiles: Array<any>,       //前台显示图片
  propFiles: Array<any>,       //后台所需图片格式参数
  onChange: (data: Array<string>, data2: Array<string>) => void,       //改变事件
  length: Number,                 //最多显示几个 
}

const UploadImage = (params: params) => {
  const { showFiles, propFiles, length } = params                             //dva里面缓存的旧数据
  const [state, setState] = useState(showFiles)                       //用于给图片显示
  const [propImage, setProp] = useState(propFiles)                    //用于传递给后台接口
  const [ update ,setUpdate ] = useState('')

  useEffect(() => {                                                   //检测有无缓存的数据更新
    params.onChange(state, propImage)
  }, [update])

  const filterData = (data: Array<any>, index: number | string) => {
    return data.filter((item, _) => _ != index)
  }

  const uploadImageData = (files: Array<any>, operationType: string, index: number | string) => {
    switch (operationType) {
      case 'add':
        upload(files[files.length - 1].url).then(res => {
          Toast.hide();
          if (res.status === 'ok') {
            setState([...state, { url: 'http://oss.tdianyi.com/' + res.data.path }])
            setProp([...propImage, res.data.path])
            setUpdate(res.data.path)
          } else {
            Toast.fail('图片上传失败', 2);
          }
        });
        break;
      case 'remove':
        params.onChange(filterData(state, index), filterData(propImage, index))
        setState(filterData(state, index))
        setProp(filterData(propImage, index))
        break;
    }

  }

  /* 
    使用了dva 想在model里面删除数组中对应数据,但是没有及时跟新
  */
  return (
    <div className={styles.upload_image_ql}>
      <div className={styles.cover_img}>
        <ImagePicker
          className={styles.upload_img}
          multiple={false}
          length={3}
          files={state}
          onChange={uploadImageData}
          selectable={state.length >= length ? false : true}//最多显示几个  
        />
      </div>
    </div>
  )
}

export default UploadImage