import nodemailer from "nodemailer";
import {GreetingMessage} from "../core/greetingMessage";

export class BirthdayService {

    constructor(employeeRepository) {
        this.employeesRepository = employeeRepository;
    }

    sendGreetings(date, smtpHost, smtpPort, sender) {
        this._send(this._greetingMessagesFor(this._employeesHavingBirthday(date)),
            smtpHost, smtpPort, sender);
    }

    _greetingMessagesFor(employees) {
        return GreetingMessage.generateForSome(employees);
    }

    _employeesHavingBirthday(today) {
        return this.employeesRepository.whoseBirthdayIs(today);
    }

    _send(messages, smtpHost, smtpPort, sender) {
        for (const message of messages) {
            const recipient = message.getTo();
            const body = message.getText();
            const subject = message.getSubject();
            this._sendTheMessage(smtpHost, smtpPort, sender, subject, body, recipient);
        }
    }

    _sendTheMessage(smtpHost, smtpPort, sender, subject, body, recipient) {
        // Create a mail session
        const transport = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
        })

        // Construct the message
        const msg = {
            from: sender,
            to: recipient,
            subject: subject,
            text: body
        };

        // Send the message
        this._sendMessage(msg, transport);
    }

    // used for testing :-(
    _sendMessage(msg, transport) {
        transport.sendMail(msg, (err) => {
            if (err) throw new Error("not send");
        });
    }

}
