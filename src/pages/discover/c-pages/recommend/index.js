import React, { memo } from 'react'
import {RecommendWrapper,Content,RecommendLeft,RecommendRight} from './style'
import JXTopBanner from './c-cpns/top-banner'
import JXHotRecommend from './c-cpns/hot-recommend'
import JXNewAlbum from './c-cpns/new-album'
import JXRecommendRanking from './c-cpns/recommend-ranking'
import JXHotAnchor from './c-cpns/hot-anchor'
import JXSettleSinger from './c-cpns/settle-singer'
import JXUserLogin from './c-cpns/user-login'

function JXRecommend() {
  

  return (
    <RecommendWrapper>
      <JXTopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <JXHotRecommend />
          <JXNewAlbum />
          <JXRecommendRanking />
        </RecommendLeft>

        <RecommendRight>
          <JXUserLogin />
          <JXSettleSinger />
          <JXHotAnchor />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}

export default memo(JXRecommend)
