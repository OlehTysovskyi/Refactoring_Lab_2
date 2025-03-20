import { OurDate } from "../core/ourDate";
import { BirthdayService } from "./birthdayService";
import { FileEmployeesRepository } from "../infrastructure/repositories/fileEmployeesRepository";
import nodemailer from "nodemailer";

export class SomeServiceClient {

    runService() {
        const filename = "employee_data.txt";
        const employeesRepository = new FileEmployeesRepository(filename);

        // Створення транспортеру для відправки повідомлень
        const transport = nodemailer.createTransport({
            host: "localhost",
            port: 25,
        });

        // Перевірка чи транспортер створено
        if (!transport) {
            console.error("Mailer transport not created");
            return;
        }

        const service = new BirthdayService(employeesRepository);

        try {
            service.sendGreetings(new OurDate("2008/10/08"), transport, "sender@here.com");
        } catch (e) {
            console.error("Error occurred while sending greetings:", e);
        }
    }
}
