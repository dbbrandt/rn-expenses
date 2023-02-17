export function now() {
    return new Date;
}

export function toDateTime(dateString) {
    return Date.parse(dateString);
}

export function serializeDate(date) {
    return date.toLocaleString("en-US");
}

export function formatDateString(dateString) {
    const date = new Date(toDateTime(dateString));
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}

export function secondsElapsed(dateString) {
    return (now() - toDateTime(dateString)) / 1000;
}
