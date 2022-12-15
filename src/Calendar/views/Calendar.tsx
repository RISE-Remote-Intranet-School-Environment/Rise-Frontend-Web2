import React from 'react';
import {Card, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import DayColumn from './grid/DayColumn';
import WeekList from '../models/WeekList';
import EcamCourse from '../models/EcamCourse';

interface CalendarViewProps<T extends EcamCourse> {
    courses?: T[];
}

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

    // courses: EcamCourse[];

    // constructor(props: any, coursesList: EcamCourse[]) {
    //     super(props);
    //     this.courses = props.coursesList;
    // }
    constructor({courses = []}: CalendarViewProps<EcamCourse>) {
        super({courses});
    }

    render(): React.ReactNode {
        let data: WeekList[] = [
            new WeekList("0", 0)
        ];

        let x = this.props.courses;
        
        for (let i = 8; i < 22; i++) {
            const timekey = i.toString() + "h^";
            
            let w: WeekList = new WeekList(timekey, i);
            
            let c: EcamCourse[] | undefined = x?.filter((course) => course.starttime.getHours() === i);

            w.monday = c?.filter((course) => course.starttime.getDay() === 1) ?? [];
            w.tuesday = c?.filter((course) => course.starttime.getDay() === 2) ?? [];
            w.wednesday = c?.filter((course) => course.starttime.getDay() === 3) ?? [];
            w.thursday = c?.filter((course) => course.starttime.getDay() === 4) ?? [];
            w.friday = c?.filter((course) => course.starttime.getDay() === 5) ?? [];
            w.saturday = c?.filter((course) => course.starttime.getDay() === 6) ?? [];
            w.sunday = c?.filter((course) => course.starttime.getDay() === 0) ?? [];
            
            data.push(w);
        }

        return (
            <Card>
                <Table columns={this.columns} dataSource={data} pagination={false} />
            </Card>
        )
    }
}

export default CalendarView;