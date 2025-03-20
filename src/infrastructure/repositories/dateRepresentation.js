import {OurDate} from "../../core/ourDate";

export class DateRepresentation {

    constructor(dateAsString) {
        this.dateAsString = dateAsString;
    }

    toDate() {
        const [year, month, day] = this.dateAsString.split("/");
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        return new OurDate(date);
    }
}