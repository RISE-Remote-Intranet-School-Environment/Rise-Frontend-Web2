import type { ColumnType } from 'antd/es/table';
import { RenderedCell } from 'rc-table/lib/interface';
import { ReactNode } from 'react';

import WeekList from '../../models/WeekList';
// import EcamCourse from '../../models/EcamCourse';

// function ListItem(props: any) {
//     return <li>{props.value}</li>
// }

class DayColumn implements ColumnType<WeekList> {
    title: string;
    className: string = "dayColumn";
    dataIndex: string;

    constructor(title: string) {
        this.title = title;
        this.dataIndex = title.toLowerCase();
    }

    render?: ((value: any, record: WeekList, index: number) => ReactNode | RenderedCell<WeekList>) | undefined = (_, record, index) => {
        if (record.getDay(this.title).length !== 0) {
            console.log(record.getDay(this.dataIndex)[0].starttime.getHours().toString());
        }
        return (
            <div>
                <a>{record.getDay(this.dataIndex).length !== 0 ? record.getDay(this.dataIndex)[0].starttime.toDateString() : ""}</a>
                {/* <ul>
                    {courses.map((course) =>
                        <ListItem key={course.id} value={course.name}/>
                    )}
                </ul> */}
            </div>
            // <ul>
            //     {courses.map((course) =>
            //         <ListItem key={course.id} value={course.name}/>
            //     )}
            // </ul>
        );
    };
}

export default DayColumn;