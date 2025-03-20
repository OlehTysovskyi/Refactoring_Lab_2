import {DateRepresentation} from "../../src/infrastructure/repositories/dateRepresentation";

export function ourDateFromString(dateAsString) {
    return new DateRepresentation(dateAsString).toDate();
}
