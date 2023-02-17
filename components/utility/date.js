export function now() {
    return new Date;
}

export function toDateTime(dateString) {
    return Date.parse(dateString);
}

export function serializeDate(date) {
    return date.toLocaleString("en-US");
}

export function formatDate(date) {
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthName = month[date.getMonth()];
    return monthName + " " + date.getDate() + ", " + date.getFullYear();
}

export function formatDateString(dateString) {
    const date = new Date(toDateTime(dateString));
    return formatDate(date);
}

export function daysElapsed(dateString) {
    return (now() - toDateTime(dateString)) / ( 1000 * 3600);
}
