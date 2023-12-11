# AngularChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Setup

To run this application you need to install json-server using `npm i json-server` (or run `npm install` if you cloned this project).

## How to run

Run `json-server --watch products.json` to get access to mock-up data.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## How to test

### Filtering

Enter the tags you need splitting them by space and click `Filter`.

Click `Cancel` to clear the filter.

### Product list

To add a new product you need to enter only name and price data and click on a button.

To go to `Tag Manager` click on a `Tag Manager` button.

To delete a product you need to enter its id and click `Delete Product`

### Product details

Click on a product card to go to product details.

To update the product you need to enter data in all fields.

To delete click `Delete`.

To go back to the product list click `Go Back`

### Tag manager

Click `Show Tags` to see the list of tags.

To add a new tag enter a tag name, choose the color and click `Create`.

To edit the tag enter the tag id, name, choose the color and click `Edit`.

To assign a tag to a specific product enter the product id and click `Assign` button on the tag you want to add.
