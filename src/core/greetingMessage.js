import {Greeting} from "./greeting";

export class GreetingMessage {

    constructor(to, greeting) {
        this.to = to;
        this.greeting = greeting;
    }

    static generateForSome(employees) {
        return employees.map(GreetingMessage._generateFor);
    }

    static _generateFor(employee) {
        const greeting = Greeting.forBirthdayOf(employee);
        const recipient = employee.getEmail();
        return new GreetingMessage(recipient, greeting);
    }

    getSubject() {
        return this.greeting.getHeader();
    }

    getText() {
        return this.greeting.getContent();
    }

    getTo() {
        return this.to;
    }
}