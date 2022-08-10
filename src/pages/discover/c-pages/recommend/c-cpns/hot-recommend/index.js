import React, { memo, useEffect } from 'react'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'

import JXThemeHeaderRCM from '@/components/theme-header-rcm'
import JXSongsCover from '@/components/songs-cover'

import {HotRecommendWrapper} from './style'
import {getHotRecommendAction} from '../../store/actionCreators'
import {HOT_RECOMMEND_LIMIT} from '@/common/contants'

export default memo(function JXHotRecommend() {

  const dispatch = useDispatch()
  const {hotRecommends} = useSelector(state => ({
    hotRecommends: state.getIn(["recommend","hotRecommends"])
  }),shallowEqual)

  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
  },[dispatch])

  return (
    <HotRecommendWrapper>
      <JXThemeHeaderRCM title="热门推荐" keywords={["华语","流行","民谣","摇滚","电子"]} />
      <div className="recommend-list">
        {
          hotRecommends.map((item,index)=>{
            return  <JXSongsCover key={item.id} info={item}></JXSongsCover>
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})
