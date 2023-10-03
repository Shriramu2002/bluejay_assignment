import fs, { read } from 'fs';
import csv from 'csv-parser';
import { freetimeconst, shifttimeconst, consConst } from './utits.js';
//hello

const results = [];
const const1 = [];
const const2 = [];
const const3 = [];

function analyze()
{
    const total_records = results.length;
    
    for(let i=0; i<total_records; )
    {
        //The employee have not worked for even a single day
        if(results[i]['Time'] == '')
        {
            i++;
            continue;
        }
        
        //lastday stores the time the employee left the office of his last working day
        let lastday = results[i]['Time Out'];
        if(lastday === '')
            lastday = results[i]['Time'];

        let id = results[i]['Position ID'];
        let nxt = i+1;
        let mxCount = 1;
        let count = 1;

        //variable to check if the employee have worked for more than 14 hours in any shift
        let shiftTimeConst = shifttimeconst(results[nxt]['Timecard Hours (as Time)']);

        //variable to check if the employee had just less than 10 hours and more than 1 hour in between shifts (even one instance of such an event also is enough)
        let freeTimeConst = false;

        //variable to check if the employee had worked for 7 consecutive days
        let consecutiveDaysConst = false;

        //The loop will run until the next record points to the other employee
        while(nxt != total_records && id == results[nxt]['Position ID'])
        {
            //difference between time when he last left the office and the current time
            let shifttimediff = new Date(results[nxt]['Time']) - new Date(lastday);
            freeTimeConst = freeTimeConst || freetimeconst(shifttimediff);

            //if the previous iteration day is same as current iteration day, dont increment count
            if(consConst(results[nxt]['Time'], lastday) == 1)
            {
                //if the difference between the day in his last iteration and current is less than 1, then increase count
                count++;
            }
            else if(consConst(results[nxt]['Time'], lastday) == -1)
            {
                //if the the current iteration day is neither consecutive or the same day as previous iteration
                //find the mxCount so far
                //reinitialize count
                mxCount = Math.max(count, mxCount);
                count = 1;
            }
            
            shiftTimeConst = shiftTimeConst || shifttimeconst(results[nxt]['Timecard Hours (as Time)']);

            lastday = results[nxt]['Time Out'];
            if(lastday == '')
                lastday = results[nxt]['Time'];

            nxt++;
        }

        //check if the mxCount is more than 7 for the particular employee
        mxCount = Math.max(count, mxCount);
        consecutiveDaysConst = mxCount>=7;

        //if the constraints are true add them to their respective arrays
        if(consecutiveDaysConst)
        {
            const1.push({
                'Name':results[i]['Employee Name'],
                'Position':results[i]['Position Status']
            });
        }

        if(freeTimeConst)
        {
            const2.push({
                'Name':results[i]['Employee Name'],
                'Position':results[i]['Position Status']
            });
        }

        if(shiftTimeConst)
        {
            const3.push({
                'Name':results[i]['Employee Name'],
                'Position':results[i]['Position Status']
            });
        }

        i = nxt;

    }

}

function formatAndAlignText(name, pos) {
    const maxLength = 100; // Adjust as needed to set the desired total width

    const namePadding = maxLength - name.length;

    const paddedName = name + ' '.repeat(namePadding);

    console.log(`${paddedName}${pos}`);
}

function printResults(){

    console.log(`\n${'*'.repeat(50)}Analytics${'*'.repeat(48)}\n`);

    if(const1)
    {
        console.log(`Workers who have worked for seven consecutive days:`);
        for(const obj of const1)
        {
            formatAndAlignText(obj['Name'], obj['Position']);
        }
    }
    else{
        console.log("There are no workers who have worked for 7 consecutive days")
    }
    console.log('\n');

    if(const2)
    {
        console.log(`Workers who have taken less than 10 hours between shifts but greater than 1 hour`);
        for(const obj of const2)
        {
            formatAndAlignText(obj['Name'], obj['Position']);
        }
    }
    else{
        console.log("There are no workers who have less than 10 hours and more than 1 hour between shifts");
    }
    console.log('\n');

    if(const3)
    {
        console.log(`Workers who have worked for more than 14 hours in a shift`);
        for(let obj of const3)
        {
            formatAndAlignText(obj['Name'], obj['Position']);
        }
    }
    else{
        console.log("There are no workers who have worked for more than 14 hours in a shift");
    }
    console.log(`\n${'*'.repeat(50)}End${'*'.repeat(54)}\n`);

}

export function main(argv){

    const CSV_PATH = new URL(`../csvFiles/${argv}`, import.meta.url).pathname;

    const stream = fs.createReadStream(CSV_PATH);

    //handle errors 
    stream.on('error', (error) => {
        console.log("Lets try something different");
    });

    const reader = stream.pipe(csv());
    reader.on('data', (row) => {
        results.push(row);
    });

    reader.on('end', () => {
        analyze();
        printResults();
    });

}




  
