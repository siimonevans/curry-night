# Curry night

:curry: :rice: :ramen: [mmm tasty curry](http://playground.torchboxapps.com/curry-night) :ramen: :rice: :curry: 

A catalogue of Torchbox Bristol's monthly evening of spice.

## Get started

Run the following commands in your terminal:

```
$ git clone https://github.com/SimonDEvans/curry-night.git
$ cd curry-night
$ npm install
$ npm run start
```

## Production build

To generate a production-ready build, run the following:

```
$ npm run build
```

## Data

This application consumes Google Sheet data as JSON. The file currently in use can be found [here.](https://docs.google.com/spreadsheets/d/1-5S5IVks0uIem8IlD3IOcf5TKsw5rpUeR2cZqNkf7XQ/edit#gid=0)

To use your own datasheet, either copy the above file or create your own:

1. Create a Google Sheets document.

2. Assign header fields by freezing the header row. The header field will then be used as the key to access data for a particular column (`View -> Freeze -> 1 row`).

3. Click on `Share` and copy the link, noting the SheetID. Make sure you allow the document to be viewable by the public.

4. Publish the file to the web so it's accessible publicly. Go to `File -> Publish to the web` and set the type to webpage.

5. The URL to fetch the JSON data from the sheet is in the below format. Paste your SheetID into the following  URL:`https://spreadsheets.google.com/feeds/list/<SHEET_ID>/od6/public/values?alt=json`.

6. It should just work.
