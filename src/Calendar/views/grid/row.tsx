import React from 'react';
import {Row} from 'antd';
import WeekList from '../../models/WeekList';

class TimeRow extends React.Component {
    timecode: number;
    weeklist?: WeekList;

    constructor(props: any) {
        super(props);
        this.timecode = props.timecode;
        this.weeklist = props.weeklist;
    }

    render() {
        return (
            <tr>

            </tr>
        );
    }
}

export default {};