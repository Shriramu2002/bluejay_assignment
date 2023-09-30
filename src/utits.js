export function freetimeconst(freetime)
{
    const llimit = 1 * 60 * 60 * 1000;
    const ulimit = 10 * 60 * 60 * 1000;
    return (freetime>=llimit && freetime<=ulimit);
}

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
