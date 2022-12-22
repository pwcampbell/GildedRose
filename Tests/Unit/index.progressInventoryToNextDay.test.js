const chai = require( 'chai' );
chai.should();
const GildedRose = require( '../../index.js' );

describe( 'index.progressInventory()', () => {

    it( 'correctly progresses a legendary item', () => {
        const originalProperties = new GildedRose.legendary( 80, 80, 'Sulfuras' );
        const expectedProperties = new GildedRose.legendary( 80, 80, 'Sulfuras' );
        const inventory = { 'Eye of Sulfuras': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Eye of Sulfuras'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses a regular expired item that is already worthless', () => {
        const originalProperties = new GildedRose.item( 0, 0, 'Weapon' );
        const expectedProperties = new GildedRose.item( 0, 0, 'Weapon' );
        const inventory = { 'Pet Rock': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Pet Rock'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses a regular unexpired item', () => {
        const originalProperties = new GildedRose.item( 10, 20, 'Weapon' );
        const expectedProperties = new GildedRose.item( 9, 19, 'Weapon' );
        const inventory = { 'Pet Rock': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Pet Rock'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses a regular expired item', () => {
        const originalProperties = new GildedRose.item( 0, 20, 'Weapon' );
        const expectedProperties = new GildedRose.item( 0, 18, 'Weapon' );
        const inventory = { 'Pet Rock': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Pet Rock'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses unexpired Aged Brie', () => {
        const originalProperties = new GildedRose.increaseQualityTheOlderItGets( 10, 20, 'Food' );
        const expectedProperties = new GildedRose.increaseQualityTheOlderItGets( 9, 21, 'Food' );
        const inventory = { 'Aged Brie': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Aged Brie'].should.deep.equal( expectedProperties );
    } );

    //"Aged Brie" actually increases in Quality the older it gets
    it( 'correctly progresses expired Aged Brie', () => {
        const originalProperties = new GildedRose.increaseQualityTheOlderItGets( 0, 20, 'Food' );
        const expectedProperties = new GildedRose.increaseQualityTheOlderItGets( 0, 21, 'Food' );
        const inventory = { 'Aged Brie': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Aged Brie'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses Aged Brie whose Quality already hit the maximum of 50', () => {
        const originalProperties = new GildedRose.increaseQualityTheOlderItGets( 10, 50, 'Food' );
        const expectedProperties = new GildedRose.increaseQualityTheOlderItGets( 9, 50, 'Food' );
        const inventory = { 'Aged Brie': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Aged Brie'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses unexpired Backstage Pass whose Quality already hit the maximum of 50', () => {
        const originalProperties = new GildedRose.backstagePass( 15, 50, 'Backstage Passes' );
        const expectedProperties = new GildedRose.backstagePass( 1, 50, 'Backstage Passes' );
        const inventory = { 'Cirque du Soleil': originalProperties };
        for( let i = 0; i < 14; ++i ) GildedRose.progressInventoryToNextDay( inventory );
        inventory['Cirque du Soleil'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses Backstage Pass that is over 10 days away from expiration', () => {
        const originalProperties = new GildedRose.backstagePass( 15, 20, 'Backstage Passes' );
        const expectedProperties = new GildedRose.backstagePass( 14, 21, 'Backstage Passes' );
        const inventory = { 'Cirque du Soleil': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Cirque du Soleil'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses Backstage Pass that is between 5 and 10 days away from expiration', () => {
        const originalProperties = new GildedRose.backstagePass( 8, 20, 'Backstage Passes' );
        const expectedProperties = new GildedRose.backstagePass( 7, 22, 'Backstage Passes' );
        const inventory = { 'Cirque du Soleil': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Cirque du Soleil'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses Backstage Pass that is between 1 and 5 days away from expiration', () => {
        const originalProperties = new GildedRose.backstagePass( 4, 20, 'Backstage Passes' );
        const expectedProperties = new GildedRose.backstagePass( 3, 23, 'Backstage Passes' );
        const inventory = { 'Cirque du Soleil': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Cirque du Soleil'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses Backstage Pass that has expired', () => {
        const originalProperties = new GildedRose.backstagePass( 1, 20, 'Backstage Passes' );
        const expectedProperties = new GildedRose.backstagePass( 0, 0, 'Backstage Passes' );
        const inventory = { 'Cirque du Soleil': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Cirque du Soleil'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses unexpired Conjured item', () => {
        const originalProperties = new GildedRose.conjured( 10, 20, 'Conjured' );
        const expectedProperties = new GildedRose.conjured( 9, 18, 'Conjured' );
        const inventory = { 'Magic 8 Ball': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Magic 8 Ball'].should.deep.equal( expectedProperties );
    } );

    it( 'correctly progresses expired Conjured item', () => {
        const originalProperties = new GildedRose.conjured( 0, 20, 'Conjured' );
        const expectedProperties = new GildedRose.conjured( 0, 16, 'Conjured' );
        const inventory = { 'Magic 8 Ball': originalProperties };
        GildedRose.progressInventoryToNextDay( inventory );
        inventory['Magic 8 Ball'].should.deep.equal( expectedProperties );
    } );
} );
