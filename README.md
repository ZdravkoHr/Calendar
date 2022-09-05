# A Calendar Widget

This project is built with Vue and is a calendar. When first opened, it shows the current day, month and year. The calendar has 2 functionalities. First, you can change the current month via the arrow buttons. When you do so, the calendar updates its contents. And second, when clicked on a day of the month, an event is being dispatched to the parent of the calendar component.


# How is it meant to be used?

The main idea behind this calendar is to be reused between different projects. It offers flexibility, such as choosing the color theme from the built-in themes or providing a custom theme. Overwriting a style is easy, too. The main file to be imported is **Calendar.vue**

# Props that the main component accepts

- **selectedColorTheme** - A string which tells the component which color theme to use. If omitted, the default theme will be applied.
- **customTheme** - An object with the structrue of a color theme. It allows the user to overwrite different parts of the theme or to replace it completely. Defaults to an empty object.

# Event emitted by the component
- **dateSelect** - fires when a day from the calendar is clicked.

# Color Themes

The project comes with several color themes to choose from. These themes are in the **color-themes.js** file inside of the **src** folder. Each theme is an object with three child objects - each of them responsible for a different part of the calendar. The following calendar parts are available for customization: 

- **month** - the bar containing the current month's name and the controls for month change 
  - *bg* - the color of the bar's background
  - *color* - the color of the bar's text  
- **days**  - the bar with the name of each day of the week  
  - *bg* - the color of the bar's background
  - *color* - the color of the bar's text  
- **body**  - the content of the calendar  
  - *bg* - the color of the body's background
  - *color* - the color of the body's text  
  - *activeBg* - the color of the *active day*'s background
  - *activeColor* - the color of the *active day*'s text


### A day is active either when it is the today's date or when it is hovered!

## Available Themes: 

| Theme | Image |
| --- | ----------- |
| default | ![image](https://user-images.githubusercontent.com/42611094/188504750-aba4038f-8fd9-4930-b5b7-ab045a25cce3.png) |
| deepPurpBlue |  ![image](https://user-images.githubusercontent.com/42611094/188505177-16c91e0e-e8e6-4175-a47d-8fbd2a9d1170.png)|


