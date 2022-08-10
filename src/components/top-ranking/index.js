import React, { memo } from 'react'
import {useDispatch} from 'react-redux'

import {getSizeImage} from '@/utils/format-utils'
import {getSongDetailAction} from '@/pages/player/store/actionCreators'

import {TopRankingWrapper} from './style'

export default memo(function JXTopRanking(props) {
  const {info} = props

  const dispatch = useDispatch()

  const playMusic = (item) => {
    dispatch(getSongDetailAction(item.id))
  }

  return (
    <TopRankingWrapper>
      <div className="header">
          <div className="image">
              <img src={getSizeImage(info?.coverImgUrl,80)} alt="" />
              <a href='todo'> </a>
          </div>
          <div className="info">
            <a href="asd">{info?.name}</a>
            <div>
              <button className="btn play sprite_02"></button>
              <button className="btn favor sprite_02"></button>
            </div>
          </div>
      </div>
      <div className="list">
        {
          info.tracks?.slice(0,10).map((item,index)=>{
            return (
              <div key={item.name} className="list-item">
                <div className="rank">{index+1}</div>
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="operate">
                    <button className="btn sprite_02 play" onClick={e => playMusic(item)}></button>
                    <button className="btn sprite_icon2 addto"></button>
                    <button className="btn sprite_02 favor"></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="footer">
        <a href='todo'>查看全部 &gt;</a>
      </div>
    </TopRankingWrapper>
  )
})
