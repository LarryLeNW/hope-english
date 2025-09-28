export function mergeDateAndTime(dateISO?: string, timeHHmm?: string) {
    if (!dateISO || !timeHHmm) return undefined;
    const d = new Date(dateISO);
    const [h, m] = timeHHmm.split(":").map(Number);
    d.setHours(h, m, 0, 0);
    return d.toISOString();
}
