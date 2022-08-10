import React from "react"
import {Navigate} from 'react-router-dom'

const JXDiscover = React.lazy(() => import("@/pages/discover"))
const JXRecommend = React.lazy(() => import("@/pages/discover/c-pages/recommend"))
const JXRanking = React.lazy(() => import("@/pages/discover/c-pages/ranking"))
const JXSongs = React.lazy(() => import("@/pages/discover/c-pages/songs"))
const JXDjradio = React.lazy(() => import("@/pages/discover/c-pages/djradio"))
const JXArtist = React.lazy(() => import("@/pages/discover/c-pages/artist"))
const JXAlbum = React.lazy(() => import("@/pages/discover/c-pages/album"))
const JXPlayer = React.lazy(() => import("@/pages/player"))
const JXFriend = React.lazy(() => import("@/pages/friend"))
const JXMine = React.lazy(() => import("@/pages/mine"))

// import JXDiscover from '@/pages/discover'
// import JXMine from '@/pages/mine'
// import JXFriend from '@/pages/friend'
// import JXRecommend from '@/pages/discover/c-pages/recommend'
// import JXSongs from '@/pages/discover/c-pages/songs'
// import JXRanking from '@/pages/discover/c-pages/ranking'
// import JXDjradio from '@/pages/discover/c-pages/djradio'
// import JXArtist from '@/pages/discover/c-pages/artist'
// import JXAlbum from '@/pages/discover/c-pages/album'
// import JXPlayer from '@/pages/player'

const routes = [
    {
        path: '/',
        element: <Navigate to="/discover" />
    },
    {
        path: '/discover',
        element: <JXDiscover />,
        children: [
            {path: "/discover",element: <Navigate to="/discover/recommend" />},
            {path: 'recommend',element:<JXRecommend />},
            {path: 'songs',element:<JXSongs />},
            {path: 'ranking',element:<JXRanking />},
            {path: 'djradio',element:<JXDjradio />},
            {path: 'artist',element:<JXArtist />},
            {path: 'album',element:<JXAlbum />},
            {path: 'player',element:<JXPlayer />},
        ]
    },
    {
        path: '/mine',
        element: <JXMine />
    },
    {
        path: '/friend',
        element: <JXFriend />
    },
]

export default routes