# Ice Cream Selector
A web app that lets you pick and compare your ice cream based on either flavor or brand, using a cloud-deployed database of ice creams, with full CRUD capabilities.


## Getting Started
[Click Here](https://seir-ice-creams.herokuapp.com/) to get started.

## Technologies Used
* HTML
* CSS
* JavaScript/jQuery
* Node.js
* MongoDB
* Mongoose
* Google Fonts
* Google Icons

## ERD

![image](https://i.imgur.com/maP4SPM.png)

## Screenshots

### Wireframe
*Home Page:*

![image](https://i.imgur.com/Z6udr2B.png)

*Flavor Selection Page:*

![image](https://i.imgur.com/6J2DAot.png)

*Brand Selection Page:*

![image](https://i.imgur.com/B4K8QRY.png)

*Ice Cream Comparison Page:*

![image](https://i.imgur.com/QF4jqkU.png)

### Completed Project
*Home Page:*

![image](https://i.imgur.com/dVa7Nm2.jpg)

*Flavor Selection Page:*

![image](https://i.imgur.com/jgqBtp8.png)

*Brand Selection Page:*

![image](https://i.imgur.com/3Haal9T.png)

*Ice Cream Comparison Page:*

![image](https://i.imgur.com/1xFY7f1.png)

# Functioning

## MVC

This web app follows the MVC Code organization. As such, you will find the project divided into the following folders:

* `models`
* `views` 
* `controllers`

Furthermore, there is a `routes` folder that stores the app's required paths, and `config` folder to set up database and Oauth connections.

### Models

There are two model files:

1. Ice Cream model
2. User model

The Ice Cream model contains the following properties:

* Name of the ice cream
* Name of its flavor
* Image of its flavor
* Name of its brand
* Image of its brand
* Image of the ice cream
* Link to the ice cream
* Short description
* Array of reviews

That may seem like a good amount of properties for an ice cream to contain, but thankfully most of the time the user will not have to fill all of these in themselves. The purpose of having separate names and images for the ice cream itself, its flavor, and its brand, is to allow for simple query searches and a more pleasing display of the app.

The reviews are a nested model inside the ice cream model, and contain the following properties:

* Review content (what the user wrote)
* Rating (out of 5)
* A reference to the user that reviewed the ice cream

Now, the user model contains:

* Their name
* Their email
* Their avatar URL
* Their Google ID
* Array of rated ice creams

## CRUD: Retrieving

### Displaying the Flavors and the Brands

This app takes advantage of query functions within Mongoose.

One example: to get to the Flavor Selector page, we call the `.find()` function on ALL ice creams:

```
IceCream.find({}, function (err, iceCreams) {
    res.render('flavors', {
      iceCreams,
      user: req.user
    });
  });
```

All properties of all the ice creams are passed through as we render the flavors page.

Therefore, if we want to create an input button to access one flavor, we can have it display its name and image (as we render the page, we keep an array of flavors and only add a new button if the flavor has not already been added to the array, ensuring every flavor is only listed once.)

What if we only want to show the flavors that a particular brand has?

We would call that same `.find()` function, except this time, we would pass that brand name as a parameter:

```
IceCream.find({ brandName: req.params.brandName }, function (err, iceCreams) {
    res.render('brandsFlavors', {
      iceCreams,
      user: req.user
    });
  });
```
 
The function is finding all the ice creams whose brand name is the one we want, and pass just those ice creams to the brand's flavors page.

### Displaying Individual Ice Creams


## CRUD: Creating
