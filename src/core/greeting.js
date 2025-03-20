export class Greeting {

    constructor(header, content) {
        this.header = header;
        this.content = content;
    }

    static forBirthdayOf(employee){
        const content = `Happy Birthday, dear ${employee.getFirstName()}!`;
        const header = "Happy Birthday!";
        return new Greeting(header, content);
    }

    getHeader() {
        return this.header;
    }

    getContent() {
        return this.content;
    }
}