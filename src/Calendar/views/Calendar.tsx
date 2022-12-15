import React from 'react';
import {Card, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import DayColumn from './DayColumn';
import WeekList from '../models/WeekList';
import EcamCourse from '../models/EcamCourse';

import './calendar.css';

/// Sert à définir quels sont les "props" que la classe "CalendarView" utilise
interface CalendarViewProps<T extends EcamCourse> {
    courses?: T[];
}

/*
La classe qui représente le calendrier
Dans son render(), elle renvoie une table avec une colonne pour chaque jour de la semaine (la classe est définie dans "DayColumn.tsx")
La 1re colonne est utilisée pour diviser la table suivant l'heure de la journée 
*/
class CalendarView extends React.Component<CalendarViewProps<EcamCourse>> {
    columns: ColumnsType<WeekList> = [
        {
            title: 'Timecode',
            dataIndex: 'timecode',
            align: 'right',
            width: 1,
            render: (num: number) => <a>{num + "h^"}</a>,
        },
        new DayColumn("Monday"),
        new DayColumn("Tuesday"),
        new DayColumn("Wednesday"),
        new DayColumn("Thursday"),
        new DayColumn("Friday"),
        new DayColumn("Saturday"),
        new DayColumn("Sunday")
    ];

    constructor({courses = []}: CalendarViewProps<EcamCourse>) {
        super({courses});
    }

    render(): React.ReactNode {
        let data: WeekList[] = [
            new WeekList("0", 0)
        ];

        // On récupère la liste de tous les cours avec l'objet props, hérité de la classe "React.Component"
        let x = this.props.courses;
        
        for (let i = 8; i < 22; i++) {
            const timekey = i.toString() + "h^";
            
            let w: WeekList = new WeekList(timekey, i);
            
            // 1er filtre pour récupérer uniquement les cours qui commencent à l'heure indiquée
            let c: EcamCourse[] | undefined = x?.filter((course) => course.starttime.getHours() === i);

            // Un filtre par jour pour compléter les listes de l'objet WeekList
            w.monday = c?.filter((course) => course.starttime.getDay() === 1) ?? [];
            w.tuesday = c?.filter((course) => course.starttime.getDay() === 2) ?? [];
            w.wednesday = c?.filter((course) => course.starttime.getDay() === 3) ?? [];
            w.thursday = c?.filter((course) => course.starttime.getDay() === 4) ?? [];
            w.friday = c?.filter((course) => course.starttime.getDay() === 5) ?? [];
            w.saturday = c?.filter((course) => course.starttime.getDay() === 6) ?? [];
            w.sunday = c?.filter((course) => course.starttime.getDay() === 0) ?? [];
            
            data.push(w);
        }

        return (
            <Card>
                <Table
                    columns={this.columns}
                    dataSource={data}
                    pagination={false}
                    footer={() => 'Footer'}
                    bordered 
                />
            </Card>
        )
    }
}

export default CalendarView;