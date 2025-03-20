import {OurDate} from "../core/ourDate";
import {BirthdayService} from "./birthdayService";
import {FileEmployeesRepository} from "../infrastructure/repositories/fileEmployeesRepository";

export class SomeServiceClient {

    runService() {
        const filename = "employee_data.txt";
        const service = new BirthdayService(new FileEmployeesRepository(filename));
        try {
            service.sendGreetings(new OurDate("2008/10/08"), "localhost", 25,"sender@here.com");
        } catch (e) {
            console.log(e);
        }
    }
}