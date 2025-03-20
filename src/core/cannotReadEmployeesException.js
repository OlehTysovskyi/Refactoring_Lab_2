export class CannotReadEmployeesException extends Error {

    constructor(message) {
        super(message); // Передаємо повідомлення в базовий клас
        this.name = this.constructor.name; // Встановлюємо ім'я класу як ім'я помилки
    }
}
