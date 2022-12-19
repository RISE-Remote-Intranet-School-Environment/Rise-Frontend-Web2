# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
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


# Architecture and Software quality: 

# Frontend web of R.I.S.E project 

The previous version of the project that we inherited used the following technologies: 

Python. 

JavaScript with the Next.js and React framework. 

Npm. 

We have observed that the configuration and launch of the project was very tedious and complicated. We have then decided to make an easy launch our priority. 

HOW TO LAUNCH THE PROJECT (requires Npm): 

Open a Cmd prompt in the project directory. (RFW in this case) 
Type following commands:
To install the dependencies:

### `npm install` 

To run the project:

### `npm start` 

For this new version of the project, we decided to switch from JavaScript to TypeScript and to throw away Python. We used React to create and power our website. There is a lot of documentation and  tutorials about it so if you need any help you can always browse the internet for help. 

For the Menu part of the WebSite there are two main things we made: 

A Navbar component which is the menu on top of the website, in this navbar are Links to the pages we created, we already have created all the Pages we should require for the project but if you want to add a page you need to create it in the pages folder and add a link in the links.json file. Then you need to route it by adding it’s route in to the App.tsx file. The footer is just a copy of the Navbar and will be shown on the bottom of the page. With some additional css files we are able to give it’s styling and give the different colors. We also added a route to Home when clicking on the Logo Container and we defined a “default” route to the homepage for when the website is launched using npm start. 

For the Login page we used an mui component, which is an online library where you can find components for your React application, and put it on the login page this will show you a form to login and the given username and password can be collected to send them the database and be compared to see if the user exists or not and then can login to it’s own version of the website with its own syllabus page etc... 

On the HomePage there is just an image that gets shown because we didn’t know what to put here but if you want to make/design a homepage you just need to put your code in the Homepage file. 

 

Points to improve and still to create: 

-Grade page on the note page there still needs to be an frontend created to show and display the different grades of a student. 

-Forum page also needs to be created, there needs to be communication with the student help team to know what they want to implement and how they see their forum page to implement the different uses they want. 
