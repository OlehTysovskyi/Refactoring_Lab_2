import { Employee } from "../../core/employee";
import fs from "fs";
import { DateRepresentation } from "./dateRepresentation";
import { CannotReadEmployeesException } from "../../core/cannotReadEmployeesException";

export class FileEmployeesRepository {
    constructor(path) {
        this.path = path;
    }

    whoseBirthdayIs(today) {
        return this._allEmployees().filter(employee => employee.isBirthday(today));
    }

    _allEmployees() {
        return this._readFileData()
            .split(/\r?\n/)
            .filter(line => line.trim()) // Додано перевірку, щоб уникнути порожніх рядків
            .map(this._parseEmployee.bind(this)); // Замінено ручне створення масиву на `.map()`
    }

    _readFileData() {
        try {
            return fs.readFileSync(this.path, { encoding: "utf8" });
        } catch {
            throw new CannotReadEmployeesException(`cannot loadFrom file = '${this.path}'`); 
            // Виправлено помилку в рядку викидання винятку (неправильний шаблонний рядок)
        }
    }

    _parseEmployee(str) {
        const [lastName, firstName, birthDate, email] = str.split(", "); 
        // Винесено парсинг працівника в окремий метод для покращення читабельності

        if (!birthDate) {
            throw new CannotReadEmployeesException(`Badly formatted employee birth date in: '${str}'`); 
            // Додано перевірку, щоб уникнути винятків при відсутності дати
        }

        return new Employee(firstName, lastName, this._extractDate(birthDate), email);
    }

    _extractDate(dateAsString) {
        if (!dateAsString || !/^\d{4}\/\d{2}\/\d{2}$/.test(dateAsString)) { 
            // Додано перевірку формату дати перед її обробкою
            throw new CannotReadEmployeesException(`Badly formatted employee birth date in: '${dateAsString}'`);
        }
        return new DateRepresentation(dateAsString).toDate();
    }
}
