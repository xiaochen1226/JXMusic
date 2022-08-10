import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'
import {NavLink} from 'react-router-dom'

import { Slider,message } from 'antd';
import {getSizeImage,formatDate,getPlaySong} from '@/utils/format-utils'

import {getSongDetailAction,changeSequenceAction,changeCurrentSong,changeCurrentLyricIndexAction} from '../store/actionCreators'
import {PlaybarWrapper,Control,PlayInfo,Operator} from './style'


export default memo(function JXAppPlayerBar() {
  const [currentTime,setCurrentTime] = useState(0)
  const [progress,setProgress] = useState(0)
  const [isChanging,setIsChanging] = useState(false)
  const [isPlaying,setIsPlaying] = useState(false)

  const dispatch = useDispatch()
  const {currentSong,sequence,lyricList,currentLyricIndex} = useSelector(state => ({
    currentSong: state.getIn(["player","currentSong"]),
    sequence: state.getIn(["player","sequence"]),
    lyricList: state.getIn(["player","lyricList"]),
    currentLyricIndex: state.getIn(["player","currentLyricIndex"])
  }),shallowEqual)

  const audioRef = useRef()
  useEffect(()=>{
    dispatch(getSongDetailAction(1964443044))
  },[dispatch])
  useEffect(()=>{
    audioRef.current.src = getPlaySong(currentSong.id)
    audioRef.current.play().then(res => {
      setIsPlaying(true)
    }).catch(err => {
      setIsPlaying(false)
    })
  },[currentSong])

  const picUrl = (currentSong.al && currentSong.al.picUrl) || ""
  const duration = currentSong.dt || 0
  const showDuration = formatDate(duration,'mm:ss')
  const showCurrentTime = formatDate(currentTime,'mm:ss')


  const playMusic = () => {
      isPlaying ? audioRef.current.pause() : audioRef.current.play()
      setIsPlaying(!isPlaying)
  }

  const timeUpdate = (e) => {
    if(!isChanging){
        setCurrentTime(e.target.currentTime * 1000)
        setProgress(currentTime / duration * 100)
    }

    let i = 0
    for(;i< lyricList.length;i++){
      let lyricItem = lyricList[i]
      if(e.target.currentTime * 1000 < lyricItem.time) {
        break;
      }
    }
    
    if(currentLyricIndex !== i-1){
      dispatch(changeCurrentLyricIndexAction(i-1))
      const content = lyricList[i-1] && lyricList[i-1].content
      if(content){
        message.open({
          key: 'lyric',
          content: content,
          duration: 0,
          className: 'lyric-class'
        })
      }
    }
  }

  const sliderChange = useCallback(value => {
    setIsChanging(true)
    setCurrentTime(value / 100 * duration)
    setProgress(value)
  },[duration])

  const sliderAfterChange = useCallback(value => {
    audioRef.current.currentTime = value / 100 * duration / 1000
    setCurrentTime(value / 100 * duration)
    setIsChanging(false)

    // if(!isPlaying){
    //     playMusic()
    // }
    //},[duration,isPlaying,playMusic])
  },[duration])

  const changeSequence = () => {
    let currentSequence = sequence + 1
    if(currentSequence > 2){
      currentSequence = 0
    }
    dispatch(changeSequenceAction(currentSequence))
  }

  const changeMusic = (tag) => {
    dispatch(changeCurrentSong(tag))
  }

  const handleMusicEnded = () => {
    if(sequence === 2) {
      // 单曲循环
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      dispatch(changeCurrentSong(1))
    }
  }

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
            <button className="sprite_player prev" onClick={e => changeMusic(-1)}></button>
            <button className="sprite_player play" onClick={e => playMusic()}></button>
            <button className="sprite_player next" onClick={e => changeMusic(1)}></button>
        </Control>
        <PlayInfo>
            <div className="image">
                <NavLink to="/discover/player">
                    <img src={getSizeImage(picUrl,35)} alt="" />
                </NavLink>
            </div>
            <div className="info">
                <div className="song">
                    <span className="song-name">{currentSong.name}</span>
                    <span className="singer-name">
                        {
                            currentSong.ar?.map((item,index)=>{
                                return (
                                    <span key={item.id}>
                                        <a href="asd">{item.name}</a>
                                        <span>{index !== currentSong.ar.length-1 ? "/" : ''}</span>
                                    </span>
                                )
                            })
                        }
                    </span>
                </div>
                <div className="progress">
                    <Slider defaultValue={0} value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} />
                    <div className="time">
                        <span className="now-time">{showCurrentTime}</span>
                        <span className='divider'>/</span>
                        <span className="duration">{showDuration}</span>
                    </div>
                </div>
            </div>
        </PlayInfo>
        <Operator sequence={sequence}>
            <div className="left">
                <button className="sprite_player btn favor"></button>
                <button className="sprite_player btn share"></button>
            </div>
            <div className="right">
                <button className="sprite_player btn volume"></button>
                <button className="sprite_player btn loop" onClick={e => changeSequence()}></button>
                <button className="sprite_player btn playlist"></button>
            </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={e => handleMusicEnded()}/>
    </PlaybarWrapper>
  )
})
