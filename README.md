
# DeveloperWeek 2020 Hackathon Challenge

As a team we are interested in using the HERE API to produce a real-time interactive application to simulate traffic lights based on streaming data. The Map API is to determine coordinates of longitude and latitude and analyze the traffic flow on each street. For this proof of concept, we used sixteen points, on a four by four grid in a small sample map of downtown San Francisco. To determine the color of the light, the current traffic flow value is used as a baseline, with a negative flow indicating red and a positive flow indicating green.

For the implementation of our application, we used React Framework based on Javascript with a Python Reinforcement Learning framework using Q-learning. Our data is parsed from a JSON format and passed on to our model to generate a dynamic graphical representation of a traffic four-way light. The goal for this work is to optimize traffic lights to reflect real world driving conditions. For example, by knowing the current traffic flow, traffic lights can be automated to change based on the intensity of traffic. If the model hears a current siren, it will change light color accordingly to allow for prioritized access. Our goal is that the simulation can be used in production to create a smart road system using 5G network to create less congested roads. 

# Architectural Overview
![Test Image 3](/diagram.jpeg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Our proof of concept simply makes use of a localhost, we also plan on creating an instance running as a webapplication on a hosted environment using Heroku.



### Agora Application

This application uses a React framework to create an addEventListener to run a webserver hosted on a local machine to allow users to connect to video feeds 



## Siren Detection

A Python module with appropriate ML/DL libraries loads and inferences a .wav audio file using a pretrained model to determine an accuracy score to change lights in our simulation.   



## Built With

* React/Node.js - The web framework used for interactivity with the API 
* Visual Studio Code  - IDE 
* HERE Maps API  - Used the REST API to send requests for functionality of our application

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Contributors

* **Sachin Shastei** - ML Engineer
* **Taylor Knulp-McDonna** - Data Engineer
* **Bruno Tapia Sierra** - Front end Developer
* **Chang Seong Kang** Front End Developer
*  **Sasha Tooryani** Devops Engineer

## License

This project is licensed under the MIT License 

## Acknowledgments

* To DeveloperWeek staff and Hackathon volunteers, also Galvanize for allowing to use the workspace
* Sponors Yubikeys, Agora, HERE for mentoring and documentation




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## AGORA APPLICATION README

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
