## Deployed
https://cassio-hudson-chi-crime-data.herokuapp.com/

## Description

The Chicago crime api displays crime statistics in a number of formats, date, type, if an arrest was made ect. However I feel it’s missing a necessary component, displaying historical data according to dates. Criminals are human, they are affected by natural effects and crimes fluctuate based on the time of year. For example the sites primary purpose will be displaying all crimes committed on the current date every year back to 2001. Additional functions will be displaying crime data by the week. Having a better understanding of when crimes happen will help us understand why they happen and how to prevent them.

This site shows a readout of all crimes commited on the current date. Other days can be selected using a date picker or buttons that advance or subtract the dy. Below that is a readout of the 10 days that have most and least number of crimes reported. Clicking the day will change the main graph to that day. Below that in its default state is a graph of all crime commited by month and year. Clicking on a single year on the legend will show only the crime data by month for that year. Clicking on a point on that graph will show crimes for that year by the day of the month. Clicking on a single point on that graph will show al crime commited by the hour of that day. Finally clicking on a single hour point on that graph will display all crimes commited on that hour of that day. Another bar graph will be displayed showing the crimes by type. When the user is zoomed into this level below the bar graph will show a detailed readout of all crimes that were commited within that hour. Data such as crime type, description, if an arrest was made, FBI code and others.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
