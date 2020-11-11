import React from 'react'
import { Link } from 'react-router-dom';
import Routers from '../../router';
import '../../styles/home.css';

const Home = () => {

    return (
        <div className="home">
            {
                Routers.map((router, index) => {
                    return (
                        <div className="item" key={index}>
                        <Link to={router.path}>{router.name}</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;
