<p align="center">
  <h2 align="center"> This is Pulse, <br> a golden hour app for photographers built with React Native </h2>
  <br>
  <br>
</p>

## Screenshot

![Pulse App Screenshot](/static/pulse.png)

## What is Golden Hour?
The Golden Hour is a period shortly after sunrise or before sunset during which daylight is redder and softer than when the Sun is higher in the sky. 

## How to read Pulse's graph
Pulse provides two donut graphs with various colors to represent certain times during the day. The inner graph represents the time from 12:00am to 11:59am, the morning, and the outer graph represents the time from 12:00pm to 11:59pm, the evening. The hour hand determines what section the current time is in. 

Color Key:
  - Light gray -> Daylight
  - Orange -> Golden Hour
  - Black -> Nighttime

Using the screeenshot as an example the current time is 11:43:45am. Since it is the morning, we read from the inner circle. The hour hand is pointing to the light gray area meaning we have regular daylight.

### Resources used
  - [Donut graphs to represent golden hours](https://github.com/radogost/PieChartExample)
  - [Corresponding Medium article](https://medium.com/the-react-native-log/animated-charts-in-react-native-using-d3-and-art-21cd9ccf6c58#.be1h0h7xj)
  - [Inspiration for the Pulse Loader](https://github.com/mohebifar/react-native-loader)


### Getting Started
Pulse is currently not in the App Store, but we hope to be soon! To try Pulse locally,
    
    npm install -g react-native-cli
    npm install
    react-native link
    react-native run-ios
    
If the linking fails, you will have to link the 'react-native-svg' and 'ART' libraries manually. The documentation on how to do this can be found [here](https://facebook.github.io/react-native/docs/linking-libraries-ios.html).
