import React from 'react';
import {Card, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import DayColumn from './DayColumn';
import WeekList from '../models/WeekList';
import EcamCourse from '../models/EcamCourse';

import './calendar.css';

/// Used to define which "props" type is used by "CalendarView"
interface CalendarViewProps<T extends EcamCourse> {
    courses?: T[];
}

/*
The Calendar class
The render() method return a table subdivised in 7 days (see "DayColumn.tsx"), plus 1 column used for each hour
*/
class CalendarView extends React.Component<CalendarViewProps<EcamCourse>> {
    columns: ColumnsType<WeekList> = [
        {
            title: 'Timecode',
            dataIndex: 'timecode',
            align: 'right',
            width: 1,
            render: (num: number) => <a>{num + "h^"}</a>,
        },
        new DayColumn("Monday"),
        new DayColumn("Tuesday"),
        new DayColumn("Wednesday"),
        new DayColumn("Thursday"),
        new DayColumn("Friday"),
        new DayColumn("Saturday"),
        new DayColumn("Sunday")
    ];

    constructor({courses = []}: CalendarViewProps<EcamCourse>) {
        super({courses});
    }

    render(): React.ReactNode {
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

        // I wanted to use the "footer" propertie to display the details of a course that've been clicked by the user
        // But you're fre to use an other method to do so
        return (
            <Card>
                <Table
                    columns={this.columns}
                    dataSource={data}
                    pagination={false}
                    footer={() => 'Footer'}
                    bordered 
                />
            </Card>
        )
    }
}

export default CalendarView;