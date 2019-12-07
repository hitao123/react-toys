/**
 *  @param {Object} API api 名称
 */
export default (API) => {
    if (typeof API !== 'object') { throw Error('API value must be object'); }

    return Object.keys(API)
            .reduce((key, value) => [...key, `${key}_REQUEST`, `${key}_SUCCESS`, `${key}_FAILURE`], []);
}