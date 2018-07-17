export const requestLoad = function requestLoad() {
    return {
        type: 'REQUEST_LOAD'
    }
}

export const receiveLoad = function receiveLoad(timestamp) {
    return {
        type: 'RECEIVE_LOAD',
        payload: {
            lastTimestamp: timestamp
        }
    }
}

export const startLoad = function startLoad() {
    console.log('++++++++++++++++startLoad function called ++++++++++++++\n');
    return function sideEffectFunction(dispatch, getState) {
        console.log('~~~~~~~~~~~~~~~dispatching requestLoad............\n', getState());
        dispatch(requestLoad());
        return loadApi()
            .then(timestamp => {
                console.log('~~~~~~~~~~~~dispatch receiveLoad.........\n');
                return dispatch(receiveLoad(timestamp));
            })
    }
}

function loadApi() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().getTime());
        }, 2000)
    })
}