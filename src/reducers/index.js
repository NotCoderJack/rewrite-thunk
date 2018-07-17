const defaultState = {
    isLoading: false,
    count: 0
}

const reducer = (state = defaultState, action) => {
    console.log('~~~~~~~~~~~~~action in reducer~~~~~~~~~~~~~~');
    switch(action.type) {
        case 'REQUEST_LOAD':
            return {
                ...state,
                isLoading: true
            }
        case 'RECEIVE_LOAD':
            return {
                ...state,
                ...action.payload,
                count: state.count + 1,
                isLoading: false
            }
        default: return state;
    }
}
export default reducer;