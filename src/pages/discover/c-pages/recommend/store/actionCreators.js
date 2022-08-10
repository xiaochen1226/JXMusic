import * as actionTypes from './constants'

import {getTopBanners,getHotRecommends,getNewAlbums,getTopList,getSongList} from '@/services/recommend'

const changeTopBannerAction = res => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners: res.banners
})

const changeHotRecommendAction = res => ({
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    hotRecommends: res.result
})

const changeNewAlbumAction = res => ({
    type: actionTypes.CHANGE_NEW_ALBUM,
    newAlbums: res.albums
})

const changeUpRankingAction = res => ({
    type: actionTypes.CHANGE_UP_RANKING,
    upRanking: res
})

const changeNewRankingAction = res => ({
    type: actionTypes.CHANGE_NEW_RANKING,
    newRanking: res
})

const changeOriginRankingAction = res => ({
    type: actionTypes.CHANGE_ORIGIN_RANKING,
    originRanking: res
})


export const getTopBannerAction = ()=>{
    return dispatch => {
        getTopBanners().then(res => {
            dispatch(changeTopBannerAction(res))
        })
    }
}

export const getHotRecommendAction = (limit) => {
    return dispatch => {
        getHotRecommends(limit).then(res => {
            dispatch(changeHotRecommendAction(res))
        })
    }
}

export const getNewAlbumAction = (limit) => {
    return dispatch => {
        getNewAlbums(limit).then(res=>{
            dispatch(changeNewAlbumAction(res))
        })
    }
}

export const getTopListAction = (id) => {
    return dispatch => {
        getTopList().then(res => {
            getSongList(res.list[id].id).then(result=>{
                switch(id){
                    case 0:
                        dispatch(changeUpRankingAction(result.playlist))
                        break;
                    case 1: 
                        dispatch(changeNewRankingAction(result.playlist))
                        break;
                    case 2:
                        dispatch(changeOriginRankingAction(result.playlist))
                        break;
                    default :
                }
            })
        })
    }
}