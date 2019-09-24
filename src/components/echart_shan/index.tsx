import React, { Component } from 'react';
import styles from './index.less'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
interface Props {
  name: any,
  list: any,
  colors: any
}
export default class Echart_Shan extends Component<Props>{
  componentDidMount() {

    const { list, name, colors } = this.props
    // console.log(this.props,'list')
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      tooltip: {},
      textStyle: {
        fontFamily: 'PingFang-SC-Regular',// 全局字体
      },
      grid: {//干掉所有的坐标轴
        show: true,
        borderWidth: 0,
      },
      xAxis: { //更改x轴
        type: 'category',
        data: this.props.name,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#999999',  //更改坐标轴文字颜色
            fontSize: 21,
            padding: 10
          }
        },
        axisTick: {
          show: false
        },
      },
      yAxis: {//更改y轴
        name: '(个数)           ', // 空格必须保存
        nameTextStyle: {
          fontSize: 20,
          padding: 14
        },
        nameRotate: 0,
        fontSize: 21,
        textStyle: {
          color: '#999999',  //更改坐标轴文字颜色
          fontSize: 21,

        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#999999',  //更改坐标轴文字颜色
            fontSize: 21,
            align: 'right'
          }
        },
        type: 'value',
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999999'
          }
        }
      },
      series: [{
        name: '销量',
        type: 'bar',
        barWidth: '40',
        data: this.props.list,
        label: {
          normal: { // 开启图顶部对应的数据
            show: true,
            position: 'top',
            color: '#333333',
            fontSize: 19
          }
        },
        itemStyle: {
          normal: {// 设置不同背景色
            // color: this.props.colors
            color: function (params: any) {
              var colorList = colors
              return colorList[params.dataIndex]
            }
          }
        }
      }]
    });
  }

  render() {
    return (
      <div id="main" style={{ height: '400px', width: '100%', display: 'flex', justifyContent: 'center' }}>{null}</div>
    )
  }
}
