import { Calendar, Card } from 'antd';
import { WeeklyCalendar } from 'antd-weekly-calendar';
import type { GenericEvent } from 'antd-weekly-calendar/dist/components/types';
import type { Moment } from 'moment';

function CalendarPage() {
    function onPanelChange(value: Moment, mode: string) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    let events: GenericEvent[] = [
        { eventId: "1", startTime: new Date(2022, 11, 21, 12, 0, 0), endTime: new Date(2022, 11, 21, 14, 30, 0), title: 'Ap. 1', backgroundColor: 'red' },
        { eventId: "2", startTime: new Date(2022, 11, 25, 10, 0, 0), endTime: new Date(2022, 11, 25, 17, 15, 0), title: 'Ap. 1' },
    ]

    //return (<Calendar onPanelChange={onPanelChange} />)
    return (
        <>
            <Card>
                <WeeklyCalendar
                    events={events}
                    onEventClick={(event) => console.log(event)}
                    onSelectDate={(date) => console.log(date.toDateString())}
                />
            </Card>
        </>
    )
}

export default CalendarPage;