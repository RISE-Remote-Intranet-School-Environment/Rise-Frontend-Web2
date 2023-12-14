import React, { useState } from 'react';
import List from './Calendar/components/List';
import TableWeek from './Calendar/components/TableWeek';
import TableMouth from './Calendar/components/TableMonth';
import EcamCourse from './Calendar/models/EcamCourse';
import PopupWindow from './Calendar/components/PopupWindow';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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

function Calendar() {
    // variabile di stato selectedDate che salva la data selezionata
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<EcamCourse | null>(null);
    const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

    // esempio di corso
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
            for (let i = 7; i <= 19; i++) {
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