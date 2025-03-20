import {Employee} from "../../src/core/employee";
import {ourDateFromString} from "../helper/ourDateFactory";

describe('Employee', () => {

    it('birthday', () => {
        const employee = new Employee("foo", "bar", ourDateFromString("1990/01/31"), "a@b.c");

        expect(employee.isBirthday(ourDateFromString("2008/01/30"))).toBeFalsy();
        expect(employee.isBirthday(ourDateFromString("2008/01/31"))).toBeTruthy();
    });

});