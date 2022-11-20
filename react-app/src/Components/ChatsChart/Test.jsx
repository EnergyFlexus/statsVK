import React from 'react';
import ChatsChart from './ChatsChart';

const _test = [{
	week: [1,2,3,4],
	month: [6,4,3,2],
	year: [1,5,7,4],
    wdata: [254,123,11,55],
    mdata: [532523,436436,124214],
    ydata: [43643643643,43646346,1412341]
}]

function test() {
    return (
        <div>
            {_test.map((item) => <ChatsChart attr = {item}></ChatsChart>)}
        </div>
    );
}

export default test;