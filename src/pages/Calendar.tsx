import React, { useState } from 'react';
import List from './Calendar/components/List';
import TableWeek from './Calendar/components/TableWeek';
import TableMouth from './Calendar/components/TableMonth';
import EcamCourse from './Calendar/models/EcamCourse';
import PopupWindow from './Calendar/components/PopupWindow';

import {
    format,
    addDays,
    subDays,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isWithinInterval,
    addHours,
} from 'date-fns';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Calendar() {
    // variabile di stato selectedDate che salva la data selezionata
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<EcamCourse | null>(null);
    const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

    // esempio di corso
    const courses: EcamCourse[] = [
        {
            id: '1',
            groupId: '4MIN',
            starttime: new Date(2023, 11, 27, 12, 0),
            endtime: new Date(2023, 11, 27, 16, 0),
            local: '2D50',
            name: 'Software Architecture and Quality Lab',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Laboratory during the student can implement a website',
            teacherName: 'LOUIS Jean-Guillaume',
            tacherEmail: 'crt@ecam.be',
            labo: false,
        },
        {
            id: '2',
            groupId: '4MIN',
            starttime: new Date(2023, 11, 29, 16, 0),
            endtime: new Date(2023, 11, 29, 17, 0),
            local: '2D50',
            name: 'Software Licences',
            link: 'https://www.ecam.be/cursus-informatique/',
            description: 'Laboratory during the student can implement a website',
            teacherName: 'LOUIS Jean-Guillaume',
            tacherEmail: 'crt@ecam.be',
            labo: false,
        },

        // Aggiungi altri eventi lezione se necessario
    ];

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleSelection = (course: EcamCourse) => {
        setSelectedCourse(course);
    };

    const handleClosedPopup = () => {
        setSelectedCourse(null);
    };

    const handleIncrementWeek = () => {
        if (selectedDate) {
            const newDate = addDays(selectedDate, 7);
            setSelectedDate(newDate);
        }
    };

    const handleDecrementWeek = () => {
        if (selectedDate) {
            const newDate = subDays(selectedDate, 7);
            setSelectedDate(newDate);
        }
    };

    const handleSwitchViewMode = () => {
        setViewMode((prevMode) => (prevMode === 'week' ? 'month' : 'week'));
    };


    const getWeekDays = (): Date[] => {
        if (selectedDate) {
            const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
            const endOfCurrentWeek = endOfWeek(selectedDate, { weekStartsOn: 1 });
            const daysOfWeek = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });
            return daysOfWeek;
        }
        return [];
    };

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
                    currentDay = addDays(currentDay!, 1);  // Ajout du "!" pour indiquer que currentDay n'est pas null
                    return day;
                });
                monthDays.push(week);
            }
        }

        return monthDays;
    };

    const getWorkHours = (): Date[] => {
        const workHours: Date[] = [];
        if (selectedDate) {
            for (let i = 8; i <= 19; i++) {
                workHours.push(addHours(selectedDate, i));
            }
        }
        return workHours;
    };

    return (
        <>
            <Popup open={selectedCourse !== null} onClose={handleClosedPopup}>
                <div>
                    {selectedCourse && (
                        <>
                            <PopupWindow
                                course={selectedCourse} />
                        </>
                    )}
                </div>
            </Popup>
            <div>
                <label>Seleziona una data:</label>
                <input
                    type="date"
                    value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                />

                <p>Data selezionata: {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Nessuna data selezionata'}</p>

                <button onClick={handleIncrementWeek}>Aumenta di una settimana</button>
                <button onClick={handleDecrementWeek}>Diminuisci di una settimana</button>
                <button onClick={handleSwitchViewMode}>{viewMode === 'week' ? 'View Monthly' : 'View Weekly'}</button>


                {selectedDate && (
                    <>
                        {viewMode === 'week' && (
                            <TableWeek
                                getWeekDays={getWeekDays}
                                getWorkHours={getWorkHours}
                                courses={courses}
                                selectionHandler={handleSelection}
                            />
                        )}
                        {viewMode === 'month' && (
                            <TableMouth
                                getMonthDays={getMonthDays}
                                courses={courses}
                                selectedDate={selectedDate}
                            />
                        )}
                    </>
                )}
            </div>
            <div>
                <List
                    getWeekDays={getWeekDays}
                    courses={courses} />
            </div>
        </>
    );
}

export default Calendar;