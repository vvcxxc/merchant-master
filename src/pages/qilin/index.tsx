import React, { Component } from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import styles from './index.less'
import CloudSpeakers from './component/cloud_speakers'
export default class qlPage extends Component {

  state = {
    data: ['1','2','3'],
    slideIndex: 0,
    imgHeight:'auto'
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 10000);
  }

  beforeChangeData = (form,to) => {
    console.log('得到的',form,to);
    
  }

  render() {
    return (
      <div id={styles.qilin} >
        <div style={{
          background: 'rgba(255,231,225,1)',
          
        }}>
          音箱配送中，
          <span>查看物流</span>
        </div>
        <WingBlank>
          <Carousel className="space-carousel"
            frameOverflow="visible"
            dots={false}
            // cellSpacing={10}
            slideWidth={0.8}
            autoplay
            infinite
            cellSpacing={40}
            selectedIndex={0}//当前索引
            swipeSpeed={22}
            autoplayInterval={50000000}
            beforeChange={this.beforeChangeData.bind(this)}
            afterChange={index => this.setState({ slideIndex: index })}
          >
            {this.state.data.map((val, index) => (
              <div key={val} style={{
                  display: 'block',
                  position: 'relative',
                top: this.state.slideIndex === index ? 0 : 70,
                marginRight: this.state.slideIndex === index ? '100px' : '0px',
                }}>
                <CloudSpeakers height={this.state.slideIndex === index ? true : false}></CloudSpeakers>
              </div>
            ))}
          </Carousel>
        </WingBlank>
      </div>
    )
  }
}