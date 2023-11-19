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
        this.state = {
        selectedCourse: undefined,
        currentDate: new Date(),
        };
        this.handleSelection = this.handleSelection.bind(this);
        this.handlePrevWeek = this.handlePrevWeek.bind(this);
        this.handleNextWeek = this.handleNextWeek.bind(this);
    }

    handleSelection(course: EcamCourse) {
        this.setState({selectedCourse: course});
    }
    handlePrevWeek() {
        this.setState((prevState) => ({
            currentDate: new Date(prevState.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000),
        }));
    }

    handleNextWeek() {
        this.setState((prevState) => ({
            currentDate: new Date(prevState.currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
        }));
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
                    {/* ... (existing code) */}
                </Popup>
                <CalendarTable
                    data={this.props.courses}
                    selectionHandler={this.handleSelection}
                    startDate={startOfWeek}
                    endDate={endOfWeek}
                />
            </>
        )
    }
}

export default CalendarView;