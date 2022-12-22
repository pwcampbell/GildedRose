'use strict';

const fs = require( 'fs/promises' );

module.exports.inventory = {};

/*
"The world is a magical place -
you never know when the next 'special requirement' might pop up -
how can you make this painless?"

Make it painless using polymorphism, by abstracting the Sell In and Quality delta behaviors into methods
which we execute every time we progress to the next day.  Each subclass in the inventory
may have a "special requirement" by overriding the superclass's method implementation.
*/
class item {
    constructor( sellIn, quality, itemCategory ) {
        this.sellIn = sellIn;
        this.quality = quality;
        this.itemCategory = itemCategory;
    }
    static maximumAttainableQuality = 50;

    progressSellIn() {
        if( this.sellIn > 0 ) --this.sellIn;
    }
    progressQuality() {
        if( this.sellIn === 0 ) this.quality -= 2; // Once the sell by date has passed, Quality degrades twice as fast
        else --this.quality;
        if( this.quality < 0 ) this.quality = 0; // The Quality of an item is never negative
    }
}
module.exports.item = item;

class conjured extends item {
    progressQuality() {
        // "Conjured" items degrade in Quality twice as fast as normal items
        for( let i = 0; i < 2; ++i ){
            super.progressQuality();
        }
    }
}
module.exports.conjured = conjured;

class backstagePass extends item {
    progressQuality() {
        // "Backstage passes", like aged brie, increase in Quality as it's SellIn value approaches;
        // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
        // Quality drops to 0 after the concert
        if( this.sellIn === 0 ) this.quality = 0;
        else if( this.quality < item.maximumAttainableQuality ){
            if( this.sellIn <= 10 ){
                if( this.sellIn <= 5 ) this.quality += 3;
                else this.quality += 2;
            }
            else ++this.quality;
            if( this.quality > item.maximumAttainableQuality ) this.quality = item.maximumAttainableQuality;
        }
    }
}
module.exports.backstagePass = backstagePass;

class increaseQualityTheOlderItGets extends item {
    progressQuality(){
        if( this.quality < item.maximumAttainableQuality ) ++this.quality;
    }    
}
module.exports.increaseQualityTheOlderItGets = increaseQualityTheOlderItGets;

class legendary extends item {
    // Legendary items never have to be sold or decrease in Quality, hence the noop functions
    progressSellIn(){}
    progressQuality(){}
}
module.exports.legendary = legendary;

module.exports.readInventory = async ( filename ) => {
    try {
        const data = await fs.readFile( filename, { encoding: 'utf8' } );
        data.split('\n').map( line => {
            const itemPropertiesList = line.split( ',' );
            if( itemPropertiesList.length !== 4 ) return; // Malformed data row
            const itemName = itemPropertiesList[0];
            const itemCategory = itemPropertiesList[1];
            const sellIn = parseInt( itemPropertiesList[2] );
            const quality = parseInt( itemPropertiesList[3] );
            let currentItem;
            if( itemName === 'Aged Brie' ) currentItem = new increaseQualityTheOlderItGets( sellIn, quality, itemCategory );
            else if( itemCategory === 'Sulfuras' ) currentItem = new legendary( sellIn, quality, itemCategory );
            else if( itemCategory === 'Conjured' ) currentItem = new conjured( sellIn, quality, itemCategory );
            else if( itemCategory === 'Backstage Passes' ) currentItem = new backstagePass( sellIn, quality, itemCategory );
            else currentItem = new item( sellIn, quality, itemCategory );
            module.exports.inventory[itemName] = currentItem;
        } );
    } catch ( err ) {
        console.log( err );
    }
};

module.exports.progressInventoryToNextDay = ( inventory ) => {
    Object.entries( inventory ).map( i => {
        i[1].progressSellIn();
        i[1].progressQuality();
        inventory[i[0]] = i[1];
    } );
};
