/** This function takes the difference between 'Time Out' column in the previous entry
    and 'Time' column in the current entry (same employee), to check if the difference 
    lies between 1 hour and 10 hours.
**/
export function freetimeconst(freetime)
{
    const llimit = 1 * 60 * 60 * 1000;
    const ulimit = 10 * 60 * 60 * 1000;
    return (freetime>=llimit && freetime<=ulimit);
}

/** This function takes the 'Time Out' column in the last entry and 'Time'
    column in the current entry, and check if they are of the same date,
    or 1 day after, or more.
**/
export function consConst(currDay, lastday)
{
    currDay = currDay.split(' ')[0];
    lastday = lastday.split(' ')[0];

    let daysInbtw = new Date(currDay) - new Date(lastday);
    daysInbtw = daysInbtw/(3600*24*1000);

    if(daysInbtw === 0)
    {
        return 0;
    }
    else if(daysInbtw === 1)
    {
        return 1;
    }

    return -1;

}

/** This function checks the 'Timecard Hours' column values for each shift entry
    of the employee to see if any of its value is greater than 14 hours.
**/
export function shifttimeconst(shifthours)
{
    shifthours = shifthours.split(':')[0];
    // console.log(shifthours);
    if(shifthours >= 14)
    {
        // console.log(shifthours);
        return true;
    }

    return false;
}
