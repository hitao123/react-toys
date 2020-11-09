import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/home.css';

const Home = () => {

    // const goToBlog = () => {

    // };

    return (
        <div className="home">
            <div className="item">
                <Link to="/">主页</Link>
            </div>
            <div className="item">
                <Link to="/video-player">video-player</Link>
            </div>
            <div className="item">
                <Link to="/music-player">music-player</Link>
            </div>
            {/* <div className="item">
                <div onClick={goToBlog}>Blog</div>
            </div> */}
            <div className="item">
                <Link to="/context">context</Link>
            </div>
        </div>
    )
}

export default Home;
