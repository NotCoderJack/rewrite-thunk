function compose(...funcs) {
    console.info('###### compose function #######');
    console.dir(funcs);

    if (funcs.length === 0) return arg => arg;
    if (funcs.length === 1) return funcs[0];

    return funcs.reduce( (a, b) => (...args) => a(b(...args)));
}

export const applyMiddleware = function applyMiddleware(...middlewares) {
    console.info('@@@@@@ applyMiddleware start @@@@@@');
    return function applyFunction(createStore)  {
        return function(reducer, preloadedState, enhancer) {
            const store = createStore(reducer, preloadedState, enhancer);
            let dispatch = store.dispatch;
            let chain = [];
            const middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
            }

            chain = middlewares.map(md => {
                console.log('&&&&&&&&&  middleware  &&&&&&');
                console.dir(md);
                const middlewareReturn = md(middlewareAPI);
                console.log('%%%%%%%%% middleware returne with API %%%%%%%');
                console.dir(middlewareReturn);
                return middlewareReturn;
            })
            console.log('**** chain: *****', chain);

            let composedFunc = compose(...chain);
            console.dir(composedFunc);

            dispatch = composedFunc(store.dispatch);
            console.info('~~~~~~~~~~~~ new dispatch after compose ~~~~~~~~~~~');
            console.dir(dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}

export function createThunkMiddleware(extraArgument) {
    return function thunkFunction({ dispatch, getState }) {
        return function nextFunction(next) {
            console.log('--------- in next function ----------');
            console.dir(next);
            return function actionFunction(action) {
                console.log('========== action returned from thunk =======')
                console.dir(action);
                if (typeof action === 'function') {
                    console.log('+++++++++++ action is function +++++++++++');
                    return action(dispatch, getState, extraArgument);
                }

                console.log('!!!!!!!!!!!! dispatch plain object action !!!!!!!!');
                console.dir(next);
                // original dispatch
                return next(action);
            }
        }
    }
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;