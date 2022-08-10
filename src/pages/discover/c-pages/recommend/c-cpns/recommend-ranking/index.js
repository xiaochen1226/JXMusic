import React, { memo, useEffect } from 'react'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'

import JXThemeHeaderRCM from '@/components/theme-header-rcm'
import TopRankingWrapper from '@/components/top-ranking'

import {RankingWrapper} from './style'
import {getTopListAction} from '../../store/actionCreators'

export default memo(function JXRecommendRanking() {
  const dispatch = useDispatch()
  const {upRanking,newRanking,originRanking} = useSelector(state => ({
    upRanking: state.getIn(["recommend","upRanking"]),
    newRanking: state.getIn(["recommend","newRanking"]),
    originRanking: state.getIn(["recommend","originRanking"]),
  }),shallowEqual)

  useEffect(()=>{
    dispatch(getTopListAction(0))
    dispatch(getTopListAction(1))
    dispatch(getTopListAction(2))
  },[dispatch])

  return (
    <RankingWrapper>
      <JXThemeHeaderRCM title="榜单" />
      <div className="tops">
        <TopRankingWrapper info={upRanking} />
        <TopRankingWrapper info={newRanking} />
        <TopRankingWrapper info={originRanking} />
      </div>
    </RankingWrapper>
  )
})
