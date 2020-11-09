import keymirror from 'keymirror';
import topic from './containers/Blog/ActionTypes';

export const combineActionTypes = actionTypeList => {
    const actionTypeMap = {};
    for (const item of actionTypeList) {
        const keys = Object.keys(item);
        for (const key of keys) {
            if (actionTypeMap[key] !== undefined) {
                throw new Error(`${key} is repeated! please name actionType by module name`);
            }
            actionTypeMap[key] = null;
        }
    }
    return actionTypeMap;
};

const actionTypeList = [
    topic
];

export default keymirror(combineActionTypes(actionTypeList));