# License

We're using the GNU General Public License v3.0 so please keep this in mind if you'd like to use my code.

# About Dish Exchange

Dish exchange is supposed to be matching application app, where people can add their dishes to their profile and match with other people's dishes to eventually "exchange" their own home-made dishes in person. This application is for a school project so not all features are available. In [Features](#features) we will explain which features are available.

## Why Dish Exchange?

This concept is for people who love cooking, tasting food and love to share their food with the world. It's an easy and cheaper way to experience food from all kinds of people you would be able to find on the app. It was inspired by people who are big foodies, who cannot afford all the time to eat out and try different dishes and flavours, because that can be very expensive. 

## Features

As explained earlier, this project is a school project, so not all features you would expact a matching application to have, will be available. 

We have several features, such as: 

1. being able to register an acoount
2. being able to login 
3. being able to create, modify and delete your own dishes within the application 
5. Being able to filter your own created dishes

# How do you use our application?

To help you use my application, I set up a guide on how to use it.

## What will you need?

To be able to use my application you will need a few things:

- Any code editor
- Terminal for Linux
- Git
- Npm
- A mongoDB database (free)
- A spoonacular account
- Your own `.env` file within this repository (I recommend using my `.envSample` and renaming it to `.env`)

## Installation

If you have any trouble of questions with the installation, please don't hesitate and send me a message!

1. Open Linux in the terminal
2. In the terminal: locate yourself in the folder you want the local repository to be in
3. Copy the link of my repository - The link of my repository, can be found at the top of this page if you press on the `code` button and and then the copy button.
4. Use `git clone [LINK OF MY REPOSITORY]` in the terminal
5. Use `npm install` in the terminal to install the required node modules

Like I said before, you will need a mongoDB database and a Spoonacular account, which I'll explain below.

### MongoDB

First I'll explain how to create a new project and a cluster

6. Make a mongoDB account on "https://www.mongodb.com/" (it's free!)
7. Create a new project by clicking on the green button saying `new project` button in MongoDB (if you're not on the homepage, click on the leaf in the top left corner on the page to return to the homepage)
8. Create a cluster by clicking on the green button saying `build a database` (any settings are fine, a shared cluster is free)
9. MongoDB sends you to a `security quickstart`. In here you'll be making a user that can use your database. You will need the password of this user later for in your `.env` file! (see step 19)
10. If you scroll down on the `security quickstart` you will see that there's a button saying `add my current IP adress`. Click on it to add you IP to the IP Access list (otherwise you won't have access to your cluster)
11. Click on `finish and close` followed by `go to database`

In the following steps I'll explain how to create a collection in MongoDB

- ATTENTION: (PLEASE NOTE TO USE THE SAME NAMES AS I'M USING, OTHERWISE THE APPLICATION MIGHT NOT WORK AND YOU'LL HAVE TO FIX THIS YOURSELF IN SERVER.JS)

12. Now you should see `database deployments` of your cluster. To create a collection, click on `browse collections` followed by `add my own data`
13. Name the database `dishexchange` and call the collection `dishes` (PLEASE USE THE SAME NAMES OTHERWISE THE APPLICATION MIGHT NOT WORK!)

Now that you have your database set up, I'll explain in the following steps on how to connect your cluster with the application. For this you will need your own `.env` file (I recommend using `.envSample` and renaming it to `.env`)

14. Use my `.envSample` file in this repository and rename it to `.env` (I recommend using this file, because all you need to change is the value of the variables)
15. To connect your mongoDB cluster, go to your mongoDB cluster, click on `database` (on the left) and click on `connect`
16. Because we're using the Node.js driver to connect mongoDB, click on `connect your application`
17. Make sure that `driver` is set to `Node.js`
18. Copy the connection string (there's a copy button next to it) and add this connection string as a value of `DATABASE_URL` in your `.env` file of this repository
19. replace `<password>` with the password of the user you created earlier (remember step 9)

MongoDB should now be connected to this application!

### Spoonacular

To be able to use Spoonacular, you will need an API key. I'm only using spoonacular as a progressive enhancement, so that as a user you can make a picture of a dish and Spoonacular will try to "guess" the name of the dish and add this "guess" as name in the form, so you won't have to type the name of the dish yourself.

20. Create a Spoonacular account on: "https://spoonacular.com/food-api/docs/detect-foods-in-text" (it's free!)
21. Go to your Spoonacular profile (on the left, below API Console)
22. Click on `show / hide API key` to show your API key
23. Copy your API key
24. Paste your API key as the value of the variable `API_KEY` in your `.env` file

Now you should have everything you need and you're ready to go!
test

# Contributors

We worked as a team of 4 with the following team members: [Ruben Finnerud](https://github.com/rubenfin), [Vanessa Choe](https://github.com/VanessaChoe), [Dave Dankwah](https://github.com/davidsd29) and [Roshnie de Groen](https://github.com/rvdegroen).
