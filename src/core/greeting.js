export class Greeting {

    constructor(header, content) {
        this.header = header;
        this.content = content;
    }

    /**
     * Статичний метод для створення привітання до дня народження.
     * @param {Employee} employee - Об'єкт співробітника.
     * @returns {Greeting} - Об'єкт Greeting для привітання співробітника.
     */
    static forBirthdayOf(employee) {
        const content = `Happy Birthday, dear ${employee.getFirstName()}!`;
        const header = "Happy Birthday!";
        return new Greeting(header, content);
    }

    /**
     * Отримати заголовок привітання.
     * @returns {string} - Заголовок привітання.
     */
    getHeader() {
        return this.header;
    }

    /**
     * Отримати текст контенту привітання.
     * @returns {string} - Текст контенту.
     */
    getContent() {
        return this.content;
    }
}
