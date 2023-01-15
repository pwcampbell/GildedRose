# Getting Started

I started with the visual studio spa template for angular. I already had this dev env setup so I am not 100% sure what you need installed before you can run it.
- Visual Studio 2022
- .NET 7
- Node and NPM
- Angular CLI

## Notes
- I used an in memory DB to make it easier to get setup and running so you wouldn't have to deal with db creation or connection strings

- Once you have the dev env setup and project opened in visual studio, you should be able to just hit F5 to run the app, front end and backend.

- To run the unit test, in visual studio in the Test menu select Run All Tests

- http://localhost:<port>/swagger will give you the swagger doc with the requested endpoints.

- I didn't put much work into the front end, its pretty basic and doesn't have any tests

- For a production system I would add some integration tests too