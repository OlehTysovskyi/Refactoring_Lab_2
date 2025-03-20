import {Employee} from "../../core/employee";
import fs from "fs";
import {DateRepresentation} from "./dateRepresentation";
import {CannotReadEmployeesException} from "../../core/cannotReadEmployeesException";

export class FileEmployeesRepository {

    constructor(path) {
        this.path = path;
    }

    whoseBirthdayIs(today) {
        return this._allEmployees()
            .filter((employee) => employee.isBirthday(today));
    }

    _allEmployees() {
        const employees = [];
        let data = this._readFileData();
        data.split(/\r?\n/).forEach((str) => {
            let employeeData = str.split(", ");
            const employee = new Employee(employeeData[1], employeeData[0],
                this._extractDate(employeeData[2]), employeeData[3]);
            employees.push(employee);
        });
        return employees;

    }

    _readFileData() {
        try {
            return fs.readFileSync(this.path, {encoding: 'utf8'});
        } catch (e) {
            throw new CannotReadEmployeesException(`cannot loadFrom file = '${this.path}'`);
        }
    }

    _extractDate(dateAsString) {
        try {
            return new DateRepresentation(dateAsString).toDate();
        } catch (e) {
            throw new CannotReadEmployeesException(`Badly formatted employee birth date in: '${dateAsString}'`);
        }
    }
}