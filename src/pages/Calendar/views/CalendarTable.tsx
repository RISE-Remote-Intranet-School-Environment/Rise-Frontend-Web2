import React from 'react';
import {Card, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import DayColumn from './DayColumn';
import WeekList from '../models/WeekList';
import EcamCourse from '../models/EcamCourse';

import './calendartable.css';

interface CalendarTableProps<T extends EcamCourse> {
    data?: T[];
    selectionHandler(course: T): void
}

class CalendarTable extends React.Component<CalendarTableProps<EcamCourse>> {
    render(): React.ReactNode {
        let columns: ColumnsType<WeekList> = [
            {
                title: 'Timecode',
                dataIndex: 'timecode',
                align: 'center',
                width: 1,
                render: (num: number) =>
                    <p className='hour'>
                        {num+'h'}
                    </p>
            },
            new DayColumn("Monday", this.props.selectionHandler),
            new DayColumn("Tuesday", this.props.selectionHandler),
            new DayColumn("Wednesday", this.props.selectionHandler),
            new DayColumn("Thursday", this.props.selectionHandler),
            new DayColumn("Friday", this.props.selectionHandler),
            new DayColumn("Saturday", this.props.selectionHandler),
            new DayColumn("Sunday", this.props.selectionHandler)
        ];

        // first line for all-day events
        let data: WeekList[] = [
            new WeekList("0", 7)
        ];

        // Retreive all courses with the "props" object, inherited from "React.Component"
        let x = this.props.data;

        for (let i = 8; i < 22; i++) {
            const timekey = i.toString() + "h^";

            let w: WeekList = new WeekList(timekey, i);

            // 1rst filter to take all courses starting at the row's hour
            let c: EcamCourse[] | undefined = x?.filter((course) => course.starttime.getHours() === i);

            // You can add an other filter to take only courses of the defined week, when the buttons to navigate on the calendar are implemented
            // Like using the starttime.getDate() propertie for each course

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

        return (
            <Card>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered


                />
            </Card>
        )
    }
}

export default CalendarTable;