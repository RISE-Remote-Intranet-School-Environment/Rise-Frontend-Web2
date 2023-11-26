import React from 'react';

// Pop-up imports
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import EcamCourse from '../models/EcamCourse';
import CalendarTable from './CalendarTable';
import './Calendar.css'

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
        this.state = { selectedCourse: undefined };
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(course: EcamCourse) {
        this.setState({ selectedCourse: course });
    }

    onClosedPopup() {
        this.setState({ selectedCourse: undefined });
    }

    render(): React.ReactNode {
        // The pop-up can be set after the table without changing the rending
        return (
            <>
                <Popup open={this.state.selectedCourse !== undefined} onClose={(e) => this.onClosedPopup()}>
                    <div>
                        <h1>Info</h1>
                        <table id='popup'>
                            <tbody>
                                <tr>
                                    <td className='ref'>Name of the course</td>
                                    <td>{this.state.selectedCourse?.name ?? "No name"}</td>
                                </tr>
                                <tr>
                                    <td className='ref'>Professor</td>
                                    <td>
                                        {this.state.selectedCourse?.teacherName ?? "/"} <br />
                                        Mail: {this.state.selectedCourse?.tacherEmail ?? "/"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='ref'>Date and Time</td>
                                    <td>{this.state.selectedCourse?.starttime.toISOString().split('T')[0] ?? "/"} <br />
                                    {this.state.selectedCourse?.starttime.toLocaleTimeString().substring(0, this.state.selectedCourse?.starttime.toLocaleTimeString().lastIndexOf(':'))}-
                                    {this.state.selectedCourse?.endtime.toLocaleTimeString().substring(0, this.state.selectedCourse?.endtime.toLocaleTimeString().lastIndexOf(':'))}</td>
                                </tr>
                                <tr>
                                    <td className='ref'>Classroom</td>
                                    <td>{this.state.selectedCourse?.local ?? "/"}</td>
                                </tr>
                                <tr>
                                    <td className='ref'>Description</td>
                                    <td>{this.state.selectedCourse?.description ?? "/"}</td>
                                </tr>
                                <tr>
                                    <td className='ref'>Link</td>
                                    <td><a href={this.state.selectedCourse?.link} title='Link of course'>{this.state.selectedCourse?.link ?? "/"}</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Popup>
                <CalendarTable
                    data={this.props.courses}
                    selectionHandler={this.handleSelection}
                />
            </>
        )
    }
}

export default CalendarView;