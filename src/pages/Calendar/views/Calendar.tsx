import React from 'react';
// Pop-up imports
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EcamCourse from '../models/EcamCourse';
import CalendarTable from './CalendarTable';

/**
 * Used to define which `props` type is used by `CalendarView`
 * 
 * Props are readonly
 */
interface CalendarViewProps<T extends EcamCourse> {
    courses?: T[];
}

/**
 * Used to define the state's variables
 * 
 * The state can be modified, with the `setState` method which triggers the render
 */
interface CalendarViewState<T extends EcamCourse> {
    selectedCourse?: T;
    currentDate: Date;
    currentWeekStartDate: Date;
}

/**
 * The Calendar class
 * 
 * The `render` method return a table subdivised in 7 days (see `DayColumn.tsx`), plus 1 column used for each hour
 */
class CalendarView extends React.Component<
    CalendarViewProps<EcamCourse>,
    CalendarViewState<EcamCourse>
> {
    constructor(props: CalendarViewProps<EcamCourse>) {
        super(props);
        const currentDate = new Date();
        const currentWeekStartDate = new Date(currentDate);
        currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the current week (Sunday)

        this.state = {
            selectedCourse: undefined,
            currentDate,
            currentWeekStartDate,
        };
        this.handleSelection = this.handleSelection.bind(this);
        this.handlePrevWeek = this.handlePrevWeek.bind(this);
        this.handleNextWeek = this.handleNextWeek.bind(this);
    }

    handleSelection(course: EcamCourse) {
        this.setState({selectedCourse: course});
    }
    handlePrevWeek() {
        const { currentWeekStartDate } = this.state;
        const newWeekStartDate = new Date(currentWeekStartDate);
        newWeekStartDate.setDate(currentWeekStartDate.getDate() - 7); // Go back one week
        this.setState({ currentWeekStartDate: newWeekStartDate });
    }

    handleNextWeek() {
        const { currentWeekStartDate } = this.state;
        const newWeekStartDate = new Date(currentWeekStartDate);
        newWeekStartDate.setDate(currentWeekStartDate.getDate() + 7); // Go forward one week
        this.setState({ currentWeekStartDate: newWeekStartDate });
    }

    onClosedPopup() {
        this.setState({selectedCourse: undefined});
    }

    render(): React.ReactNode {
        // The pop-up can be set after the table without changing the rending
        const startOfWeek = new Date(this.state.currentDate);
        startOfWeek.setDate(this.state.currentDate.getDate() - this.state.currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        return (
            <>
                <div>
                    <button onClick={this.handlePrevWeek}>Previous Week</button>
                    <button onClick={this.handleNextWeek}>Next Week</button>
                </div>
                <Popup open={this.state.selectedCourse !== undefined} onClose={(e) => this.onClosedPopup()}>
                    <ul>
                        <li>{this.state.selectedCourse?.name ?? "No name"}</li>
                        <li>{this.state.selectedCourse?.groupId ?? "Not provided"}</li>
                        <li>De {this.state.selectedCourse?.starttime.getHours() ?? "??"}h{this.state.selectedCourse?.starttime.getMinutes() ?? "??"}</li>
                        <li>À {this.state.selectedCourse?.endtime.getHours() ?? "??"}h{this.state.selectedCourse?.endtime.getMinutes() ?? "??"}</li>
                        <li>Local : {this.state.selectedCourse?.local ?? "Not assigned"}</li>
                        <li>{this.state.selectedCourse?.description ?? "No description provided"}</li>
                    </ul>
                </Popup>
                <CalendarTable
                    data={this.props.courses}
                    selectionHandler={this.handleSelection}
                    currentWeekStartDate={this.state.currentWeekStartDate} // Pass the current week's start date to CalendarTable
                    startDate={startOfWeek}
                    endDate={endOfWeek}
                />
            </>
        )
    }
}

export default CalendarView;