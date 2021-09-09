const { DateTime } = require("luxon");

// Setting up date picker
const today = DateTime.now();
const maxDate = DateTime.now().plus({ days: 16 });
const picker = new Litepicker({
    element: document.getElementById('pickerstart'),
    elementEnd: document.getElementById('pickerend'),
    singleMode: false,
    allowRepick: true,
    autoRefresh: true,
    minDate: today,
    maxDate: maxDate,
    tooltipNumber: (totalDays) => {
        return totalDays - 1;
    }
});

const setDuration = () => {
    const startDate = DateTime.fromISO(document.getElementById('pickerstart').value);
    const endDate = DateTime.fromISO(document.getElementById('pickerend').value);

    let dateDiff = endDate.diff(startDate, 'days');
    const duration = dateDiff.values.days;
    return duration
}


export { setDuration }