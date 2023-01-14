import React from 'react';
import {Card, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';

// Pop-up imports
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import DayColumn from './DayColumn';
import WeekList from '../models/WeekList';
import EcamCourse from '../models/EcamCourse';

import './calendar.css';

/// Used to define which "props" type is used by "CalendarView"
/// Props are readonly
interface CalendarViewProps<T extends EcamCourse> {
    courses?: T[];
}

/// Used to define the state's variables
/// The state can be modified, with the "setState" method which triggers the render
interface CalendarViewState<T extends EcamCourse> {
    selectedCourse?: T;
}

/*
The Calendar class
The render() method return a table subdivised in 7 days (see "DayColumn.tsx"), plus 1 column used for each hour
*/
class CalendarView extends React.Component<
    CalendarViewProps<EcamCourse>,
    CalendarViewState<EcamCourse>
> {
    constructor(props: CalendarViewProps<EcamCourse>) {
        super(props);
        this.state = {selectedCourse: undefined};
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(course: EcamCourse) {
        this.setState({selectedCourse: course});
    }

    onClosedPopup() {
        this.setState({selectedCourse: undefined});
    }

    render(): React.ReactNode {
        let columns: ColumnsType<WeekList> = [
            {
                title: 'Timecode',
                dataIndex: 'timecode',
                align: 'right',
                width: 1,
                render: (num: number) => <a>{num + "h^"}</a>,
            },
            new DayColumn("Monday", this.handleSelection),
            new DayColumn("Tuesday", this.handleSelection),
            new DayColumn("Wednesday", this.handleSelection),
            new DayColumn("Thursday", this.handleSelection),
            new DayColumn("Friday", this.handleSelection),
            new DayColumn("Saturday", this.handleSelection),
            new DayColumn("Sunday", this.handleSelection)
        ];
        
        // first line for all-day events
        let data: WeekList[] = [
            new WeekList("0", 0)
        ];

        // Retreive all courses with the "props" object, inherited from "React.Component"
        let x = this.props.courses;
        
        for (let i = 8; i < 22; i++) {
            const timekey = i.toString() + "h^";
            
            let w: WeekList = new WeekList(timekey, i);
            
            // 1rst filter to take all courses starting at the row's hour
            let c: EcamCourse[] | undefined = x?.filter((course) => course.starttime.getHours() === i);

            // 2nd filter to sort each course for each day
            w.monday = c?.filter((course) => course.starttime.getDay() === 1) ?? [];
            w.tuesday = c?.filter((course) => course.starttime.getDay() === 2) ?? [];
            w.wednesday = c?.filter((course) => course.starttime.getDay() === 3) ?? [];
            w.thursday = c?.filter((course) => course.starttime.getDay() === 4) ?? [];
            w.friday = c?.filter((course) => course.starttime.getDay() === 5) ?? [];
            w.saturday = c?.filter((course) => course.starttime.getDay() === 6) ?? [];
            w.sunday = c?.filter((course) => course.starttime.getDay() === 0) ?? [];
            
            // Push the entry into the table lines' array
            data.push(w);
        }

        // The pop-up can be set after the table without changing the rending
        return (
            <>
                <Popup open={this.state.selectedCourse !== undefined} onClose={(e) => this.onClosedPopup()}>
                    <ul>
                        <li>{this.state.selectedCourse?.name ?? "No name"}</li>
                        <li>{this.state.selectedCourse?.groupId ?? "Not provided"}</li>
                        <li>De {this.state.selectedCourse?.starttime.getHours() ?? "??"}:{this.state.selectedCourse?.starttime.getMinutes() ?? "??"}h</li>
                        <li>À {this.state.selectedCourse?.endtime.getHours() ?? "??"}:{this.state.selectedCourse?.endtime.getMinutes() ?? "??"}h</li>
                        <li>Local : {this.state.selectedCourse?.local ?? "Not assigned"}</li>
                        <li>{this.state.selectedCourse?.description ?? "No description provided"}</li>
                    </ul>
                </Popup>
                <Card>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        footer={() => 'Footer'}
                        bordered 
                    />
                </Card>
            </>
        )
    }
}

export default CalendarView;