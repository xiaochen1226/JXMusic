import React, { memo } from 'react'

import {getCount,getSizeImage} from '@/utils/format-utils'

import {SongsCoverWrapper} from './style'

export default memo(function JXSongsCover(props) {
  const {info} = props

  return (
    <SongsCoverWrapper>
      <div className="cover-top">
          <img src={getSizeImage(info.picUrl,140)} alt="" />
          <div className="cover sprite_cover">
              <div className="info sprite_cover">
                  <span>
                    <i className='sprite_icon erji'></i>
                    {getCount(info.playCount)}
                  </span>
                  <i className="sprite_icon play"></i>
              </div>
          </div>
      </div>

      <div className={`cover-bottom${info.copywriter && " text-nowrap"}`}>
          {info.name}
      </div>
      <div className="cover-source">
        {info.copywriter && ("by "+info.copywriter)}
      </div>
    </SongsCoverWrapper>
  )
})
