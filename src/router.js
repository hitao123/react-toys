import VideoPlayer from './containers/Player/VideoPlayer';
import MusicPlayer from './containers/Player/MusicPlayer';
import Home from './containers/Home';
import Theme from './containers/Theme';
import WipeIt from './containers/WipeIt';

export default [
    {
        name: '主页',
        path: '/',
        component: Home
    },
    {
        name: 'video-player',
        path: '/video-player',
        component: VideoPlayer
    },
    {
        name: 'music-player',
        path: '/music-player',
        component: MusicPlayer
    },
    {
        name: '主题切换',
        path: '/theme',
        component: Theme
    },
    {
        name: '擦一擦',
        path: '/wipe-it',
        component: WipeIt
    }
];
