import {getSongDetail,getLyric} from '@/services/player'
import * as actionTypes from './constants'
import {getRandomNumber} from '@/utils/math-utils'
import {parseLyric} from '@/utils/parse-lyric'

const changeCurrentSongAction = (currentsong) => ({
    type: actionTypes.CHANGE_CURRENT_SONG,
    currentSong: currentsong
})

const changePlayListAction = (playList) => ({
    type:actionTypes.CHANGE_PLAY_LIST,
    playList
})

const changeCurrentSongIndexAction = (index) => ({
    type:actionTypes.CHANGE_CURRENT_SONG_INDEX,
    index
})

const changeLyricsListAction = (lyricList) => ({
    type: actionTypes.CHANGE_LYRIC_LIST,
    lyricList
})
 
export const getSongDetailAction = (ids) => {
    return (dispatch,getState) => {
        // 1.根据id查找playlist中是否存在该歌曲
        const playList = getState().getIn(["player","playList"])
        const songIndex = playList.findIndex(song => song.id === ids)

        // 判断是否找到歌曲
        let song = null 
        if(songIndex!==-1){
            // 找到歌曲
            dispatch(changeCurrentSongIndexAction(songIndex))
            song = playList[songIndex]
            dispatch(changeCurrentSongAction(song))
            dispatch(getLyricAction(song.id))
        }else{
            // 没有找到歌曲
            getSongDetail(ids).then(res => {
                song = res.songs && res.songs[0]
                if(!song) return
                // 将最新请求到的歌曲添加到播放列表中
                const newPlayList = [...playList]
                newPlayList.push(song)

                // 更新redux中的值
                dispatch(changePlayListAction(newPlayList))
                dispatch(changeCurrentSongAction(newPlayList.length - 1))
                dispatch(changeCurrentSongAction(song))

                dispatch(getLyricAction(song.id))
            })
        }
    }
}

export const changeSequenceAction = (sequence) => ({
    type: actionTypes.CHANGE_SEQUENCE,
    sequence
})

export const changeCurrentSong = (tag) => {
    return (dispatch,getState) => {
        const playList = getState().getIn(["player","playList"])
        const sequence = getState().getIn(["player","sequence"])
        let currentSongIndex = getState().getIn(["player","currentSongIndex"])

        switch(sequence){
            case 1: //随机播放
                let randomIndex = getRandomNumber(playList.length)
                while(randomIndex === currentSongIndex){
                    randomIndex = getRandomNumber(playList.length)
                }
                currentSongIndex = randomIndex
                break
            default: //顺序播放
                currentSongIndex += tag
                if(currentSongIndex >= playList.length) currentSongIndex = 0
                if(currentSongIndex < 0 ) currentSongIndex = playList.length - 1
        }
        
        const currentSong = playList[currentSongIndex]
        dispatch(changeCurrentSongAction(currentSong))
        dispatch(changeCurrentSongIndexAction(currentSongIndex))

        dispatch(getLyricAction(currentSong.id))
    }
}

export const getLyricAction = (id) => {
  return dispatch => {
    getLyric(id).then(res => {
        const lyric = res.lrc.lyric
        const lyricList = parseLyric(lyric)
        dispatch(changeLyricsListAction(lyricList))
    })
  }
}

export const changeCurrentLyricIndexAction = (index) => ({
    type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
    index
})