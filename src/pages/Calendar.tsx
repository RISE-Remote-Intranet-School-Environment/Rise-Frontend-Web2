import React, { useState } from 'react';
import List from './Calendar/components/List';
import Table from './Calendar/components/Table';
import EcamCourse from './Calendar/models/EcamCourse';
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

    // esempio di corso
    const courses: EcamCourse[] = [
        {
            id: '1',
            groupId: '4MIN',
            starttime: new Date(2023, 11, 27, 11, 0),
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

    // funzione che si occupa della modifica della data
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    // funzione che si occupa dell'incrementazione della data di una settimana con il bottone
    const handleIncrementWeek = () => {
        if (selectedDate) {
            const newDate = addDays(selectedDate, 7);
            setSelectedDate(newDate);
        }
    };

    // funzione che si occupa del decremento della data di una settimana con il bottone
    const handleDecrementWeek = () => {
        if (selectedDate) {
            const newDate = subDays(selectedDate, 7);
            setSelectedDate(newDate);
        }
    };

    // funzione che mi permette di ottenere gli altri giorni della settimana rispetto al giorno selezionato
    const getWeekDays = (): Date[] => {
        if (selectedDate) {
            const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
            const endOfCurrentWeek = endOfWeek(selectedDate, { weekStartsOn: 1 });
            const daysOfWeek = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });
            return daysOfWeek;
        }
        return [];
    };

    // funzione che mi restituisce le ore lavorative del giorno
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
            <div>
                <label>Seleziona una data:</label>
                <input
                    type="date"
                    value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                />

                <button onClick={handleIncrementWeek}>Aumenta di una settimana</button>
                <button onClick={handleDecrementWeek}>Diminuisci di una settimana</button>

                <p>Data selezionata: {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Nessuna data selezionata'}</p>

                {selectedDate && (
                    <Table
                        getWeekDays={getWeekDays}
                        getWorkHours={getWorkHours}
                        courses={courses}
                    />
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