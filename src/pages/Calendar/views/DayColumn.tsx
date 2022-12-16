import type { ColumnType } from 'antd/es/table';
import { RenderedCell } from 'rc-table/lib/interface';
import type { ReactNode } from 'react';

import WeekList from '../models/WeekList';
import './timeslot.css';

/// A class to describe each day of the week in the table
/// To avoid repetitivity, because the render for each column is the same to display all the courses
class DayColumn implements ColumnType<WeekList> {
    title: string;
    className: string = "dayColumn";
    dataIndex: string;

    constructor(title: string) {
        this.title = title;
        this.dataIndex = title.toLowerCase();
    }

    // Render defined in these column used for each entry in the table
    render?: ((value: any, record: WeekList, index: number) => ReactNode | RenderedCell<WeekList>) | undefined = (_, record, index) => {
        // console.log(record.getDay(this.dataIndex).length)
        
        let courses = record.getDay(this.dataIndex);
        // When there are no courses for a day, do nothing
        if (courses.length === 0) {
            return
        }

        let course = courses[0];
        let start_minutes = course.starttime.getMinutes();
        let end_minutes = course.endtime.getMinutes();

        // We can compute the relative block's length with the help of start and end times for each course
        let length = course.endtime.getHours() - course.starttime.getHours() + (end_minutes - start_minutes)/60

        // I use percentages to create a relative position from the top of each cell, and the length of each course
        // zIndex is used to place later courses above the previous ones (for example, conflict with courses for different study year)
        // I defined some background colors in "timeslot.css" to differentiate each study's option, and use the className propertie to choose which take
        return (
            <div 
                className={'timeslot ' + course.groupId.substring(1)}
                style={{"top": (start_minutes*100/60).toString() + "%", "height": (length*100).toString() + "%", "zIndex": index}}
            >
                <a onClick={(event) => undefined}>{course.name}</a>
            </div>
        );
        // Just have to add an event to display all the details for a course when we click on it
    };
}

export default DayColumn;