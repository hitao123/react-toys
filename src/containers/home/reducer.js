import ActionTypes from '../../actionTypes';

export default function posts(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case ActionTypes.TOPIC_DATA_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ActionTypes.TOPIC_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items
      });
    case ActionTypes.TOPIC_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        items: []
      });
    default:
      return state;
  }
}
