import React, { memo,useCallback,useEffect,useRef, useState } from 'react'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'
// import {connect} from 'react-redux'

import { Carousel } from 'antd';
import {BannerWrapper,BannerLeft,BannerRight,BannerControl} from './style'

import {getTopBannerAction} from '../../store/actionCreators'

export default memo(function JXTopBanner() {
    const [currentIndex,setCurrentIndex] = useState(0)
  // const {getBanners,topBanners} = props

  // 组件和redux关联：获取数据和进行操作
  const dispatch = useDispatch()
  const {topBanners} = useSelector(state=>({
    // topBanners: state.get('recommend').get('topBanners')
    topBanners: state.getIn(['recommend','topBanners'])
  }),shallowEqual)
  // shallowEqual对没有使用到store里面的state进行优化，防止页面渲染

  //其他的hooks
  const bannerRef = useRef()

  useEffect(()=>{
    dispatch(getTopBannerAction())
  },[dispatch])

  const bannerChange = useCallback((from,to)=>{
    setCurrentIndex(to)
  },[])

  // 其他业务逻辑
  const bgImage = topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + "?imageView&blur=40x20")

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
          <BannerLeft>
            <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerChange}>
                {
                    topBanners.map((item,index) => {
                        return (
                            <div className="banner-item" key={item.imageUrl}>
                                <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                            </div>
                        )
                    })
                }
            </Carousel>
          </BannerLeft>

          <BannerRight></BannerRight>

          <BannerControl>
              <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
              <button className="btn right" onClick={e => bannerRef.current.next()}></button>
          </BannerControl>
      </div>
    </BannerWrapper>
  )
})

// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners
// })

// const mapDispatchToProps = dispatch => ({
//   getBanners: () => {
//     dispatch(getTopBannerAction())
//   }
// })

// export default connect(mapStateToProps,mapDispatchToProps)(memo(JXTopBanner))