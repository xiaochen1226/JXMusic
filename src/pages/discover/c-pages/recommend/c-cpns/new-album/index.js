import React, { memo, useEffect,useRef } from 'react'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'

import { Carousel } from 'antd'
import JXThemeHeaderRCM from '@/components/theme-header-rcm'
import JXAlbumCover from '@/components/album-cover'

import {AlbumWrapper} from './style'
import {getNewAlbumAction} from '../../store/actionCreators'
import {NEW_ALBUM_LIMIT} from '@/common/contants'


export default memo(function JXNewAlbum() {

  const pageRef = useRef()
  const dispatch = useDispatch()
  const {newAlbums} = useSelector(state => ({
    newAlbums: state.getIn(["recommend","newAlbums"])
  }),shallowEqual)

  useEffect(()=>{
    dispatch(getNewAlbumAction(NEW_ALBUM_LIMIT))
  },[dispatch])

  return (
    <AlbumWrapper>
      <JXThemeHeaderRCM title="新碟上架" />
      <div className="content">
        <button className="arrow arrow-left sprite_02" onClick={e=>pageRef.current.prev()}></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {
              [0,1].map(item => {
                return (<div key={item} className="page">
                  {
                    newAlbums.slice(item*5,(item + 1) * 5).map(iten => {
                      return <JXAlbumCover key={iten.id} info={iten} size={100} width={118} bgp='-570px'></JXAlbumCover>
                    })
                  }
                </div>)
              })
            }
          </Carousel>
        </div>
        <button className="arrow arrow-right sprite_02" onClick={e=>pageRef.current.next()}></button>
      </div>
    </AlbumWrapper>
  )
})
