import fetch from '../../lib/fetch';
import actionTypes from '../../actionTypes';

function requestPosts() {
  return {
    type: actionTypes.TOPIC_DATA_REQUEST
  }
}

function receivePosts(res) {
  return {
    type: actionTypes.TOPIC_DATA_SUCCESS,
    items: res.data
  }
}

function requestPostsFail() {
  return {
    type: actionTypes.TOPIC_DATA_FAILURE,
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return fetch('/api/topics')
      .then(res => dispatch(receivePosts(res)))
      .catch(err => {
        dispatch(requestPostsFail())
      })
  }
}
