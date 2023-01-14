import type { ColumnType } from 'antd/es/table';
import { RenderedCell } from 'rc-table/lib/interface';
import type { ReactNode } from 'react';

import TimeSlot from './TimeSlot';
import WeekList from '../models/WeekList';
import EcamCourse from '../models/EcamCourse';

// Used to define the function type which take care of the selected event
type SelectionHandler = (course: EcamCourse) => void;

/// A class to describe each day of the week in the table
/// To avoid repetitivity, because the render for each column is the same to display all the courses
class DayColumn implements ColumnType<WeekList> {
    title: string;
    // If you want to add properties for each column, there is the className
    className: string = "dayColumn";
    dataIndex: string;
    onSelectedEvent: SelectionHandler;

    constructor(title: string, onSelection: SelectionHandler) {
        this.title = title;
        this.dataIndex = title.toLowerCase();
        this.onSelectedEvent = onSelection;
    }

    clickHandler(course: EcamCourse) {
        this.onSelectedEvent(course);
    }

    // Render defined in these column used for each entry in the table
    render?: ((value: any, record: WeekList, index: number) => ReactNode | RenderedCell<WeekList>) | undefined = (_, record, index) => {
        let courses = record.getDay(this.dataIndex);
        // When there are no courses for a day, do nothing
        if (courses.length === 0) return

        return (
            <>
                <TimeSlot 
                    courses={courses}
                    rowIndex={index}
                    clickHandler={this.onSelectedEvent}
                />
            </>
        );
    };
}

export default DayColumn;