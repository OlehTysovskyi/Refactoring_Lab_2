import {FileEmployeesRepository} from "../../../src/infrastructure/repositories/fileEmployeesRepository";
import {ourDateFromString} from "../../helper/ourDateFactory";
import {CannotReadEmployeesException} from "../../../src/core/cannotReadEmployeesException";

describe('File Employee Repository', () => {

    const ANY_DATE = ourDateFromString("2016/01/01");

    it('fails when the file does not exist', () => {
        const employeesRepository = new FileEmployeesRepository("non-existing.file");

        try {
            employeesRepository.whoseBirthdayIs(ANY_DATE);
        } catch (exception) {
            expect(exception).toBeInstanceOf(CannotReadEmployeesException);
            expect(exception.message).toContain("cannot loadFrom file");
            expect(exception.message).toContain("non-existing.file");
        }
    });

    it('fails when the file does not have the necessary fields', () => {
        const employeesRepository = new FileEmployeesRepository("test/resources/wrong_data__wrong-date-format.csv");

        try {
            employeesRepository.whoseBirthdayIs(ANY_DATE);
        } catch (exception) {
            expect(exception.message).toContain("Badly formatted employee birth date in");
        }
    });

});