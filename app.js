'use strict';

const GildedRose = require( './index.js' );
const readlineSync = require('readline-sync');

/*
"We strongly suggest that you approach this exercise as if this code was part of a larger system."

For example, in another Node.js project, one could execute `npm i --save GildedRose`
and then use the solution as illustrated by the driver code in this file

Run this file, e.g. by executing `npm start`, to test drive the inventory
*/

GildedRose.readInventory( './inventory.txt' ).then( async () => {
    const commands = [
        'Ask for the entire list of inventory',
        'Ask for the details of a single item by name',
        'Progress to the next day',
        'List the trash we should throw away (Quality = 0)'
    ];
    let currentDay = 0;
    let exit = false;
    while( !exit ){
        const commandIndex = readlineSync.keyInSelect( commands, 
            `It is Day ${currentDay} at the Gilded Rose. Which command would you like to execute?`,
            { cancel: 'EXIT' } );
        switch ( commandIndex ){
            case 0:
                console.log( '\nCurrent inventory is:' );
                Object.entries( GildedRose.inventory ).map(
                    item => console.log( `Item Name: '${item[0]}', Item Category: '${item[1].itemCategory}', Sell In: ${item[1].sellIn}, Quality: ${item[1].quality}` ) );
                break;
            case 1:
                const itemName = readlineSync.question( '\nPlease specify the name of the item you would like to inspect (case sensitive) and hit the Enter/Return key: ' );
                const item = GildedRose.inventory[itemName];
                if( item === undefined ) console.log( `\nCouldn't find an item called '${itemName}'` );
                else console.log( `\nItem Name: '${itemName}', Item Category: '${item.itemCategory}', Sell In: ${item.sellIn}, Quality: ${item.quality}` );
                break;
            case 2:
                console.log( `\nProgressing to Day ${++currentDay}...` );
                GildedRose.progressInventoryToNextDay( GildedRose.inventory );
                break;
            case 3:
                let trash = [];
                Object.entries( GildedRose.inventory ).map( item => item[1].quality === 0? trash.push( item[0] ): undefined );
                if( trash.length === 0 ) console.log( '\nThere is no trash because quality > 0 for all items' );
                else console.log( `\nThe following items are trash (quality = 0): ${trash}` );
                break;
            case -1:
                exit = true;
                break;
        }
    }
    console.log( '\nExiting...' );
} );
