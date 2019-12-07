/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
// import {connect} from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from './actions';
import useSWR, {SWRConfig} from 'swr';
import fetch from '../../lib/fetch';

function Dashboard () {
    // https://github.com/zeit/swr#global-configuration weird can not act as example
    const { data, error } = useSWR('/api/topics', { refreshInterval: 0 }) // do not need refresh
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <div>
            <div>
                {
                    data.data.map((item, index) => {
                    return (
                        <h4 key={index}>
                            {index + '. '}
                            {item.title}
                        </h4>
                    )
                    })
                }
            </div>
        </div>
    )
}

const Articles = (props) => {
    // useParams useLocation useHistory  (remove withRouter inject match location history)
    let { id } = useParams();
    let location = useLocation();
    let history = useHistory();

    const items = useSelector(
        state => {
            return state.home && state.home.items
        }
    );
    
    const dispatch = useDispatch();

    // useEffect(() => {
    //     // props.fetchPosts();
    //     fetchPosts()(dispatch);
    // });

    return (
        <div>
            <SWRConfig 
                value={{
                    fetcher: fetch,
                    revalidateOnFocus: false
                }}
            >
                <Dashboard />
            </SWRConfig>
            <div>
                {
                    items.map((item, index) => {
                    return (
                        <h4 key={index}>
                            {index + '. '}
                            {item.title}
                        </h4>
                    )
                    })
                }
            </div>
            <div>{id}</div>
            <div>{JSON.stringify(location)}</div>
            <div>{JSON.stringify(history)}</div>
            <p>
                白日依山尽，黄河入海流。
                欲穷千里目，更上一层楼。
            </p>
        </div>
    )
}

// const mapStateToProps = state => {
//     return {
//         items: state.items
//     }
// }

// const mapDispatchToProps = {
//     fetchPosts
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Articles);
export default Articles;
