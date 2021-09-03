const { DateTime } = require("luxon");

// Setting up date picker
const tomorrow = DateTime.now().plus({ days: 1 });
const picker = new Litepicker({
    element: document.getElementById('pickerstart'),
    elementEnd: document.getElementById('pickerend'),
    singleMode: false,
    allowRepick: true,
    autoRefresh: true,
    minDate: tomorrow,
    tooltipNumber: (totalDays) => {
        return totalDays - 1;
    }
});

const setDuration = () => {
    const startDate = DateTime.fromISO(document.getElementById('pickerstart').value);
    const endDate = DateTime.fromISO(document.getElementById('pickerend').value);

    let duration = endDate.diff(startDate, 'days');
    console.log(duration.values.days);
    return duration;
}


export { setDuration }