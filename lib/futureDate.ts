export function getFutureDateString(daysFromNow: number): string {
    const futureDate = new Date();

    // Set the date by adding the given number of days to today's date
    futureDate.setDate(futureDate.getDate() + daysFromNow);

    // Format options for displaying the date nicely
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    // Returns a human-readable string based on the user's browser locale
    return futureDate.toLocaleDateString(undefined, options);
}
