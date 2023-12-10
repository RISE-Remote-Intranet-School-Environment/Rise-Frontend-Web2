import React, { CSSProperties } from "react";

import EcamCourse from '../models/EcamCourse';
import './timeslot.css';

interface TimeSlotProps<T extends EcamCourse> {
    courses: T[],
    rowIndex: number
    // Function provided by CalendarView, given by the DayColumn render
    clickHandler(course: T): void

}

/**
 * Table's cell
 * 
 * Where each course is rendered in each table's cell
 */
class TimeSlot extends React.Component<TimeSlotProps<EcamCourse>> {
    handleClick(course: EcamCourse) {
        this.props.clickHandler(course);
    }

    render(): React.ReactNode {

        return (
            <div className="timeslot" >
                {this.props.courses.map((course, index) => {
                    let start_minutes = course.starttime.getMinutes();
                    let end_minutes = course.endtime.getMinutes();

                    // We can compute the relative block's length with the help of start and end times for each course
                    let length = course.endtime.getHours() - course.starttime.getHours() + (end_minutes - start_minutes)/60;

                    // I use percentages to create a relative position from the top of each cell, and the length of each course
                    // zIndex is used to place later courses above the previous ones (for example, conflict with courses for different study year)
                    // I defined some background colors in "timeslot.css" to differentiate each study's option, and use the className propertie to choose which take
                    console.log('Courses:', this.props.courses); //diplays courses just to check it works
                    return (
                        <div
                            key={index}
                            className={'event ' + course.groupId.substring(1)}
                            style={{
                                "top": (start_minutes*100/60).toString() + "%",
                                "height": (length*100).toString() + "%",
                                "zIndex": this.props.rowIndex
                            }}
                            // onClick={(e) => {
                            //     this.props.clickHandler(courses);
                            // }}
                        >
                            <button onClick={(e) => this.handleClick(course)}>{course.name}</button>
                        </div>
                    );
                    // like you can see, we have the choice to also use the onClick propertie of the division
                    // I put the function on the course name only, but you can change it
                })}
            </div>
        )
    }
}


export default TimeSlot;