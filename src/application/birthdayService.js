import { GreetingMessage } from "../core/greetingMessage";

export class BirthdayService {

    constructor(employeeRepository, mailerTransporter) {
        // Вводимо залежність для транспортерів у конструкторі
        this.employeesRepository = employeeRepository;
        this.mailerTransporter = mailerTransporter || null;
    }

    sendGreetings(date, sender) {
        const employees = this._employeesHavingBirthday(date);
        const messages = this._greetingMessagesFor(employees);
        this._send(messages, sender);
    }

    _greetingMessagesFor(employees) {
        return GreetingMessage.generateForSome(employees);
    }

    _employeesHavingBirthday(today) {
        return this.employeesRepository.whoseBirthdayIs(today);
    }

    _send(messages, sender) {
        for (const message of messages) {
            const recipient = message.getTo();
            const body = message.getText();
            const subject = message.getSubject();
            this._sendTheMessage(sender, subject, body, recipient);
        }
    }

    _sendTheMessage(sender, subject, body, recipient) {
        // Якщо транспортер не передано, то можемо використати дефолтний
        const transport = this.mailerTransporter || this._createDefaultTransport();

        const msg = {
            from: sender,
            to: recipient,
            subject: subject,
            text: body,
        };

        this._sendMessage(msg, transport);
    }

    // Створення дефолтного транспортеру
    _createDefaultTransport() {
        return {
            sendMail: (msg, callback) => {
                // Можна замінити на реальний транспорт для відправки листів
                console.log('Default transport: Sending email...', msg);
                callback();
            }
        };
    }

    // Використовується для тестування
    _sendMessage(msg, transport) {
        transport.sendMail(msg, (err) => {
            if (err) {
                throw new Error("not sent");
            }
        });
    }
}
