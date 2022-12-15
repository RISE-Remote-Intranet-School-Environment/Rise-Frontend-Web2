import type { ColumnType } from 'antd/es/table';
import { RenderedCell } from 'rc-table/lib/interface';
import type { ReactNode } from 'react';

import WeekList from '../models/WeekList';
import './timeslot.css';

/// La classe qui prend en charge la représentation des différents cours dans le calendrier
/// Suivant le jour concerné, défini par la variable "dataIndex"
class DayColumn implements ColumnType<WeekList> {
    title: string;
    className: string = "dayColumn";
    dataIndex: string;

    constructor(title: string) {
        this.title = title;
        this.dataIndex = title.toLowerCase();
    }

    render?: ((value: any, record: WeekList, index: number) => ReactNode | RenderedCell<WeekList>) | undefined = (_, record, index) => {
        // console.log(record.getDay(this.dataIndex).length)
        let courses = record.getDay(this.dataIndex);
        if (courses.length === 0) {
            return
        }

        let course = courses[0];
        let start_minutes = course.starttime.getMinutes();
        let end_minutes = course.endtime.getMinutes();

        // Permet de définir la taille du block à l'aide des heures de début et de fin
        let length = course.endtime.getHours() - course.starttime.getHours() + (end_minutes - start_minutes)/60

        // J'utilise les valeurs en pourcentages pour les placer dans le tableau suivant le repère supérieur de la case
        // zIndex sert, grâce à l'index de chaque ligne, à faire superposer les cours définis plus tard dans la journée au dessus des précédents
        // J'ai défini quelques couleurs d'arrière-plan pour chaque option d'étude dans "timeslot.css"
        return (
            <div 
                className={'timeslot ' + course.groupId.substring(1)}
                style={{"top": (start_minutes*100/60).toString() + "%", "height": (length*100).toString() + "%", "zIndex": index}}
            >
                <a onClick={(event) => undefined}>{course.name}</a>
            </div>
        );
        // Il reste à ajouter un évènement quand on clique sur l'intitulé du cours pour faire afficher les détails
    };
}

export default DayColumn;