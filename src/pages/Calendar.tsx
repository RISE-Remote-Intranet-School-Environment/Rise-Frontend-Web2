
import React, { useState, useEffect } from 'react'; // Import CSS for pop-up

import List from './Calendar/components/List';
import TableWeek from './Calendar/components/TableWeek';
import TableMonth from './Calendar/components/TableMonth';
import EcamCourse from './Calendar/models/EcamCourse';
import PopupWindow from './Calendar/components/PopupWindow';
import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
// Import date-fns functions for date manipulation

import {
// Import date-fns functions for date manipulation
    format,
    addDays,
    subDays,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    addHours,

} from 'date-fns';


// You can make a list of "EcamCourse" if you want to test the calendar with many courses
// Be aware to modify './Calendar/views/DayColumn.tsx' with a loop to go through all courses

function Calendar() {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<EcamCourse | null>(null);
    const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const courses: EcamCourse[] = [
        {
            id: '1',
            groupId: '5MIN',
            starttime: new Date(2023, 10, 13, 12, 45),
            endtime: new Date(2023, 10, 13, 16, 0),
            local: '2F10',
            name: 'Software Licences and GDPR',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Lesson about GDPR',
            teacherName: 'Villano Emilio',
            tacherEmail: 'villano.emilio@ecam.be',
            labo: false,
        },
        {
            id: '2',
            groupId: '5MIN',
            starttime: new Date(2023, 10, 15, 12, 45),
            endtime: new Date(2023, 10, 15, 16, 15),
            local: '1E04',
            name: 'Artificial Intelligence project',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Laboratory during the student can implement a AI project',
            teacherName: 'Hasselmann Ken',
            tacherEmail: 'Hasselmann.ken@ecam.be',
            labo: true,
        },
        {
            id: '3',
            groupId: '4MCO',
            starttime: new Date(2023, 10, 16, 8, 30),
            endtime: new Date(2023, 10, 16, 12, 0),
            local: '2D15',
            name: 'Ethic Lab',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Lesson about ethical decision',
            teacherName: 'Ngom Gaël',
            tacherEmail: 'Ngom.gaël@ecam.be',
            labo: false,
        },
        {
            id: '4',
            groupId: '4MIN',
            starttime: new Date(2023, 10, 17, 12, 45),
            endtime: new Date(2023, 10, 17, 16, 15),
            local: '2D50',
            name: 'Software Architecture and Quality Lab',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Laboratory during the student can implement a website',
            teacherName: 'Louis Jean-Guillaume',
            tacherEmail: 'Louis-jean-guillaume@ecam.be',
            labo: true,
        },
        {
            id: '5',
            groupId: '4MEM',
            starttime: new Date(2023, 10, 21, 8, 30),
            endtime: new Date(2023, 10, 21, 12, 0),
            local: '2E44',
            name: 'Sciences humaines',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Lesson',
            teacherName: 'Melotte Philippe',
            tacherEmail: 'Melotte.philippe@ecam.be',
            labo: false,
        },
        {
            id: '6',
            groupId: '4MAU',
            starttime: new Date(2023, 10, 22, 8, 30),
            endtime: new Date(2023, 10, 22, 12, 0),
            local: '2E14',
            name: 'Ethic Lab',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Lesson about ethical decision',
            teacherName: 'Ngom Gaël',
            tacherEmail: 'Ngom.gaël@ecam.be',
            labo: false,
        },
        {
            id: '7',
            groupId: '5MIN',
            starttime: new Date(2023, 10, 22, 12, 45),
            endtime: new Date(2023, 10, 22, 16, 15),
            local: '1E04',
            name: 'Artificial Intelligence project',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Laboratory during the student can implement a AI project',
            teacherName: 'Hasselmann Ken',
            tacherEmail: 'Hasselmann.ken@ecam.be',
            labo: true,
        },
        {
            id: '8',
            groupId: '4MIN',
            starttime: new Date(2023, 10, 24, 8, 30),
            endtime: new Date(2023, 10, 24, 11, 45),
            local: '2F50',
            name: 'Software Licences',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Lesson about Software Architecture',
            teacherName: 'Louis Jean-Guillaume',
            tacherEmail: 'Louis-jean-guillaume@ecam.be',
            labo: false,
        },
        {
            id: '9',
            groupId: '4MIN',
            starttime: new Date(2023, 10, 24, 12, 45),
            endtime: new Date(2023, 10, 24, 16, 15),
            local: '1E04',
            name: 'Software Architecture and Quality Lab',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Laboratory during the student can implement a website',
            teacherName: 'Louis Jean-Guillaume',
            tacherEmail: 'Louis-jean-guillaume@ecam.be',
            labo: true,
        },
        {
            id: '10',
            groupId: '4MIN',
            starttime: new Date(2023, 11, 1, 12, 45),
            endtime: new Date(2023, 11, 1, 16, 15),
            local: '1E04',
            name: 'Software Architecture and Quality Lab',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Laboratory during the student can implement a website',
            teacherName: 'Louis Jean-Guillaume',
            tacherEmail: 'Louis-jean-guillaume@ecam.be',
            labo: true,
        },
    ];
    // Function that handles date modification
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleSelection = (course: EcamCourse) => {
        setSelectedCourse(course);
    };

    const handleClosedPopup = () => {
        setSelectedCourse(null);
    };
    // Function that handles incrementing the date by one week with the button
    const handleIncrementWeek = () => {
        if (selectedDate) {
            const newDate = addDays(selectedDate, 7);
            setSelectedDate(newDate);
        }
    };
    // Function that handles decrementing the date by one week with the button
    const handleDecrementWeek = () => {
        if (selectedDate) {
            const newDate = subDays(selectedDate, 7);
            setSelectedDate(newDate);
        }
    };
    const handleIncrementMonth = () => {
        if (selectedDate) {
            const newDate = addDays(selectedDate, 30);
            setSelectedDate(newDate);
        }
    };


    const handleDecrementMonth = () => {
        if (selectedDate) {
            const newDate = subDays(selectedDate, 30);
            setSelectedDate(newDate);
        }
    };


    // Function to switch between week and month view modes
    const handleSwitchViewMode = () => {
        setViewMode((prevMode) => (prevMode === 'week' ? 'month' : 'week'));
    };
    // Function to retrieve days of the week relative to the selected date
    const getWeekDays = (): Date[] => {
        if (selectedDate) {
            const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
            const endOfCurrentWeek = endOfWeek(selectedDate, { weekStartsOn: 1 });
            const daysOfWeek = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });
            return daysOfWeek;
        }
        return [];
    };
    // Function to retrieve days of the month
    const getMonthDays = (): Date[][] => {
        const monthDays: Date[][] = [];
        const daysOfWeek = getWeekDays();

        let startOfMonth: Date | null = null;
        let endOfMonth: Date | null = null;

        if (selectedDate) {
            startOfMonth = startOfWeek(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1), { weekStartsOn: 1 });
            endOfMonth = endOfWeek(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0), { weekStartsOn: 1 });

            let currentDay = startOfMonth;
            while (currentDay && currentDay <= endOfMonth) {
                const week = daysOfWeek.map(() => {
                    const day = currentDay;
                    currentDay = addDays(currentDay!, 1);
                    return day;
                });
                monthDays.push(week);
            }
        }

        return monthDays;
    };
    // Function that returns the working hours of the day
    const getWorkHours = (): Date[] => {
        const workHours: Date[] = [];
        if (selectedDate) {
            for (let i = 7; i <= 19; i++) {
                workHours.push(addHours(selectedDate, i));
            }
        }
        return workHours;
    };
    const getSelectedMonthLabel = (): string => {
        return selectedDate ? format(selectedDate, 'MMMM yyyy') : '';
    };



    const containerStyle = {
        fontFamily: 'Optima, sans-serif',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '20px',

        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        background: '#f7f7f7',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
        border: '1px solid white ',
    };
    const calendarStyle = {
        fontFamily: 'Optima, sans-serif',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '20px',
        boxShadow: '0 0 1px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'RoyalBlue',
        //border: '500px solid blue navy',
    };
    const buttonStyle = {
        padding: '8px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'RoyalBlue',
        color: 'white',
        marginRight: '10px',
    };
    const headerStyle: React.CSSProperties = {
        fontFamily: 'Optima, sans-serif',
        background: 'RoyalBlue',
        color: '#fff',
        padding: '15px',
        borderRadius: '5px 5px 0 0',
        textAlign: 'center',
        fontSize: '24px',
    };
    const contentStyle = {
        fontFamily: 'Optima, sans-serif',
        background: '#fff',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };
    const footerStyle: React.CSSProperties = {
        fontFamily: 'Optima, sans-serif',
        background: 'RoyalBlue',
        color: '#fff',
        padding: '15px',
        borderRadius: '0 0 5px 5px',
        textAlign: 'center',
    }

        return (
        <>
            <Popup open={selectedCourse !== null} onClose={handleClosedPopup}>
                <div>
                    {selectedCourse && (
                        <PopupWindow course={selectedCourse} />
                    )}
                </div>
            </Popup>

            <div style={{ ...containerStyle, borderRadius: '5px' }}>
                <div style={headerStyle}>Calendar</div>
                <div style={{ ...contentStyle, borderRadius: '5px' }}>
                    <label>Select a date:</label>
                    <input
                        type="date"
                        value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => handleDateChange(new Date(e.target.value))}
                    />

                    <p>Selected date: {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'No date selected'}</p>
                    <p>Selected month: {getSelectedMonthLabel()}</p>

                    <button style={buttonStyle} onClick={viewMode === 'week' ? handleDecrementWeek : handleDecrementMonth}>
                        {viewMode === 'week' ? 'Previous week' : 'Previous mounth'}
                    </button>
                    <button style={buttonStyle} onClick={viewMode === 'week' ? handleIncrementWeek : handleIncrementMonth}>
                        {viewMode === 'week' ? 'Next week' : 'Next month'}
                    </button>

                    <button style={buttonStyle} onClick={handleSwitchViewMode}>{viewMode === 'week' ? 'View Monthly' : 'View Weekly'}</button>
                </div>

                {windowWidth > 700 && (
                    <div className="table-container">
                        {selectedDate && viewMode === 'week' && (

                            <TableWeek
                                getWeekDays={getWeekDays}
                                getWorkHours={getWorkHours}
                                courses={courses}
                                selectionHandler={handleSelection}
                            />
                        )}
                        {selectedDate && viewMode === 'month' && (
                            <TableMonth
                                getMonthDays={getMonthDays}
                                courses={courses}
                                selectedDate={selectedDate}
                                selectionHandler={handleSelection}
                            />

                        )}
                    </div>
                )}

                {windowWidth <= 700 && (
                    <div>
                        <List getWeekDays={getWeekDays} courses={courses} />
                    </div>
                )}
            </div>
            <div style={footerStyle}>
                © 2023 Your Calendar App. All rights reserved.
            </div>
        </>
    );
}


 //export default CalendarPage;
 export default Calendar;
