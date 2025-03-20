import {BirthdayService} from "../../src/application/birthdayService";
import {FileEmployeesRepository} from "../../src/infrastructure/repositories/fileEmployeesRepository";
import {ourDateFromString} from "../helper/ourDateFactory";

describe('Acceptance', () => {

    const EMPLOYEES_FILE_PATH = "test/resources/employee_data.txt";
    const FROM = "sender@here.com";
    const SMTP_HOST = "localhost";
    const SMTP_PORT = 25;
    let messagesSent;
    let service;

    beforeEach(() => {
        messagesSent = [];
        service = new class extends BirthdayService{
            _sendMessage(msg, transport) {
                messagesSent.push(msg);
            }
        }(new FileEmployeesRepository(EMPLOYEES_FILE_PATH));
    })

    it('base scenario', () => {
        service.sendGreetings(ourDateFromString("2008/10/08"), SMTP_HOST, SMTP_PORT, FROM);

        expect(messagesSent.length).toEqual(1);
        const message = messagesSent[0];
        expect(message.text).toEqual("Happy Birthday, dear John!",);
        expect(message.subject).toEqual("Happy Birthday!");
        expect(message.to).toEqual("john.doe@foobar.com");
    });

    it('will not send emails when nobodys birthday', () => {
        service.sendGreetings(ourDateFromString("2008/01/01"), SMTP_HOST, SMTP_PORT, FROM);

        expect(messagesSent.length).toEqual(0);
    });
});