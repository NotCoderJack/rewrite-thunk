import React from 'react';
import { connect } from 'react-redux';
import { startLoad } from '../actions';

const mapStateToProps = (state = {}) => {
    console.log('~~~~~~~~state in mapStatetoPorps~~~~~~~\n');
    console.dir(state)
    return {...state}
}
export class Layout extends React.Component {
    render() {
        const { count, dispatch, isLoading } = this.props;
        console.log('@@@@@@@@@ dispath function in render of layout');
        console.dir(dispatch);

        return (
            <div>
                <h2>Understanding how redux-thunk works</h2>
                <h4>A small example to help you understand how redux-thunk handles async actions</h4>
                <div className="indicator">
                {(isLoading) && (
                    <span>loading...</span>
                )}
                </div>
                <button
                    children="Load Async Action"
                    className="st-btn st-btn-solid st-btn-success st-btn-sm"
                    onClick={() => dispatch(startLoad())}
                    disabled={(isLoading)}/>
                {' '}
                {(count !== 0) && (
                    <span ref="count">Number of times button clicked : {count}</span>
                )}
            </div>
        )
    }
}
export default connect(mapStateToProps)(Layout);