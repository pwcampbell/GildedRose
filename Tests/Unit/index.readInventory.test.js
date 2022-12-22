const chai = require( 'chai' );
chai.use( require( 'deep-equal-in-any-order' ) );
chai.should();
const GildedRose = require( '../../index.js' );

describe( 'index.readInventory()', () => {
    before( async () => GildedRose.readInventory( './inventory.txt' ) );

    it( 'correctly reads and parses inventory.txt', async () => {
        const expectedInventory = {
            Sword: new GildedRose.item( 30, 50, 'Weapon' ),
            Axe: new GildedRose.item( 40, 50, 'Weapon' ),
            Halberd: new GildedRose.item( 60, 40, 'Weapon' ),
            'Aged Brie': new GildedRose.increaseQualityTheOlderItGets( 50, 10, 'Food' ),
            'Aged Milk': new GildedRose.item( 20, 20, 'Food' ),
            Mutton: new GildedRose.item( 10, 10, 'Food' ),
            'Hand of Ragnaros': new GildedRose.legendary( 80, 80, 'Sulfuras' ),
            'I am Murloc': new GildedRose.backstagePass( 20, 10, 'Backstage Passes' ),
            'Raging Ogre': new GildedRose.backstagePass( 10, 10, 'Backstage Passes' ),
            'Giant Slayer': new GildedRose.conjured( 15, 50, 'Conjured' ),
            'Storm Hammer': new GildedRose.conjured( 20, 50, 'Conjured' ),
            'Belt of Giant Strength': new GildedRose.conjured( 20, 40, 'Conjured' ),
            Cheese: new GildedRose.item( 5, 5, 'Food' ),
            'Potion of Healing': new GildedRose.item( 10, 10, 'Potion' ),
            'Bag of Holding': new GildedRose.item( 10, 50, 'Misc' ),
            'TAFKAL80ETC Concert': new GildedRose.backstagePass( 15, 20, 'Backstage Passes' ),
            'Elixir of the Mongoose': new GildedRose.item( 5, 7, 'Potion' ),
            '+5 Dexterity Vest': new GildedRose.item( 10, 20, 'Armor' ),
            'Full Plate Mail': new GildedRose.item( 50, 50, 'Armor' ),
            'Wooden Shield': new GildedRose.item( 10, 30, 'Armor' )
        };
        GildedRose.inventory.should.deep.equalInAnyOrder( expectedInventory );
    } );
} );
