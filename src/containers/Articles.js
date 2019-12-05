/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import useSWR, {SWRConfig} from 'swr';

// function Dashboard () {
//     const { data: topics } = useSWR('/api/topics', { refreshInterval: 0 })
//     const { data: user } = useSWR('/api/user/alsotang', { refreshInterval: 0 })

//     return (
//         <div>
//             <div>{JSON.stringify(topics)}</div>
//             <div>{JSON.stringify(user)}</div>
//         </div>
//     )
// }

const Articles = () => {
    // useParams useLocation useHistory 将 withRouter 注入的 match location history 去除
    let { id } = useParams();
    let location = useLocation();
    let history = useHistory();

    return (
        <div>
            {/* <SWRConfig 
                value={{
                    fetcher: (...args) => fetch(...args).then(res => res.json()),
                    refreshInterval: 0
                }}
            >
                <Dashboard />
            </SWRConfig> */}
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

export default Articles;
