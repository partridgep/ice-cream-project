# Ice Cream Selector
A CRUD web app that lets you pick and compare your ice cream based on flavor and/or brand, using a cloud-deployed database of ice creams.


## Getting Started
[Click Here](https://seir-ice-creams.herokuapp.com/) to get started (please allow 20-30 seconds for Heroku to warm up.)

## Technologies Used
* HTML
* CSS
* JavaScript/jQuery
* Node.js
* MongoDB
* Mongoose
* Google Fonts
* Materialize Icons
* Swiper Framework

## ERD

![ERD Diagram](https://i.imgur.com/ZlWB6mo.png)

## Wireframes & Completed Project Screenshots

![Home Page](https://i.imgur.com/IjGE72q.png)


![Flavor Selection Page](https://i.imgur.com/VziTVvO.png)


![Brand Selection Page](https://i.imgur.com/X2dLdXY.png)


![Ice Cream Comparison Page](https://i.imgur.com/cpZQZkd.png)


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

That may seem like a good amount of properties for an ice cream to contain, but thankfully most of the time the user will not have to input all of these in themselves. The purpose of having separate names and images for the ice cream itself, its flavor, and its brand, is to allow for simple query searches and a more pleasing display of information.

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

What if we only want to show the flavors of a particular brand?

We would call that same `.find()` function, except this time, we would pass that brand name as a parameter:

```
IceCream.find({ brandName: req.params.brandName }, function (err, iceCreams) {
    res.render('brandsFlavors', {
      iceCreams,
      user: req.user
    });
  });
```
 
The function is finding all the ice creams with the desired brand name, and passes just those ice creams to the brand's flavors page.

### Displaying Individual Ice Creams

Once the user has chosen a flavor, they are redirected to a view of all ice creams featuring that flavor.

If they have not chosen the flavor through a specific brand, the ice creams will simply appear in the order that they exist in the database. We iterate through the ice creams we queried in the controller and create a view div for each.

If the user accessed the flavor by selecting a brand first (i.e. Ben & Jerry's > Vanilla), we want the first ice cream(s) they see to be of that brand.

Our function in the controller would look something like this:

```
IceCream.find({ flavorName: req.params.flavorName })
.populate("reviews.reviewedBy")
.exec( function (err, iceCreams) {
      IceCream.find({ brandName: req.params.brandName, flavorName: req.params.flavorName})
      .populate("reviews.reviewedBy").exec( function (err, brandsIceCreams) {
        res.render('brandsIceCreams', {
          iceCreams,
          brandsIceCreams,
          user: req.user
        });
    });
});
```

First we find ALL ice creams of the flavor (which gives us `iceCreams`, but then we query again to find ice creams of said flavor AND brand (giving us `brandsIceCreams`.) We can then render our brands' ice creams page, looping through `brandsIceCreams` first to create a view div for each, then through `iceCreams` to add all the remaining ones (ignoring the ones already added.)

![Flavor Page Comparison](https://i.imgur.com/SX9pzWv.png)

### Displaying User Ratings and Reviews

Each ice cream's ratings reviews are embedded in its review schema. Therefore, it's a simple matter of iterating through each ice cream's reviews array and displaying the relevant information.


## CRUD: Creating

### Adding a new ice cream to the database

Once a user is logged in, they have access to the 'Add New Ice Cream' form. They will be prompted to enter fields with the necessary information.

In case they want to add another flavor or brand of other existing ice creams, we render those other properties as input options in a dropdown menu:

![image](https://i.imgur.com/Rjs9bC6.png)

The last input option will be `Other`, which if selected, will trigger the form to register the user's text input as the name instead.

To do this, we create a Constructor object in order to assign the properties we desire. For example, this is how we would assign the flavor name:

```
if (req.body.flavor === 'Other') {
  iceCreamConstructor.flavor = req.body.newFlavor;
  addingNewFlavor = true;
} else {
  iceCreamConstructor.flavor = req.body.flavor;
};
```

First, we check to see if the user has entered a new flavor. If so, we tell our constructor that the flavor will correspond to what the user has entered in the `newFlavor` input field. Otherwise, it will correspond to whatever option has been selected in the `flavor` dropdown menu.

*But what about the flavor and brand images?*

If the user has selected an existing flavor or brand, then the create function will find other ice creams with the same flavor and/or brand, grab their images, and assign them to the new ice cream:

```
if (!addingNewBrand) 
  IceCream.findOne({ brandName: iceCreamConstructor.brand }, function (err, sameBrand) {
    iceCreamConstructor.brandImage = sameBrand.brandImage;
    iceCream = createHelper(req.body, iceCreamConstructor);
    saveIceCream(iceCream, addingNewFlavor, addingNewBrand, req, res);
  });
};
```

If the user has selected a *new* flavor or brand, their will be redirected to another input page to enter a link for those images. By that point, the ice cream will have been created, so that will constitute an [*update*](https://github.com/partridgep/ice-cream-project#adding-a-flavorbrand-image-directly-after-ice-cream-creation-as-an-update).

### Creating a User Rating

If the user is logged in, they are able to view a form that lets them input a rating from 1 to 5, represented as a five-star system. Each star acts as a submit button, triggering a create function. This rating becomes added to that ice cream's review schema, and the user's `RatedIceCreams` array has that ice cream added to it as a reference.

### Creating a User Review

If the user is logged in, they are able to view an input form that lets them input a text review. Upon submission, that review is linked to their user rating.

## CRUD: Updating

### Adding a flavor/brand image directly after ice cream creation (as an update)

If entering a new flavor and/or brand, the user is redirect to a new input field:

![image](https://i.imgur.com/fQIKGa9.png)

Upon submission, this new property will be added to the ice cream that was just created.

### Updating any ice cream property

The user is able to update any ice cream property after clicking on the "Edit" field. They are redirected to a form, with all fields pre-filled with the ice cream's values. Upon submission, all fields will be updated (though if nothing has changed, it will all be the same.)

### Updating a flavor/brand image on the "Edit" page

If the user updates either the flavor or brand image, then it gets updated for ALL ice creams of the same brand of flavor:

```
if (iceCream.flavorImage !== req.body.flavorImage) {
    IceCream.find({ 
      flavorImage: iceCream.flavorImage, 
      flavorName: iceCream.flavorName }, 
      function (err, sameFlavorImage) {
        for (i of sameFlavorImage) {
          i.flavorImage = req.body.flavorImage;
          i.save(function (err) { console.log(err) });
        };
      });
};
```

### Updating a User Rating

The user can re-submit a rating on the five-star input field, triggering an update to their rating.

### Updating a User Review

The user can click on the "Edit" button above their review, rendering an input field pre-filled with their review content. Upon submission, the new text is updated to their review.

## CRUD: Deleting

The user can click on the "X" button above their review and choose to delete either their review, or their rating *and* their review:

![](https://i.imgur.com/PU5uSJE.png)


### Deleting a user review

The user can click on the "Delete Review" button, removing just their review, but their rating will remain, and so the review reference will stay within that ice cream's reviews array:

```
IceCream.findById(req.params.id, function(err, iceCream) {
    for (review of iceCream.reviews) {
       if (review.reviewedBy.toString() === req.user.id.toString()) {
            review.content = "";
            break;
   		};
	};
```

### Deleting a user review & rating

If the user clicks on "Delete Review + Rating", their review is removed from that ice cream's reviews array:

```
IceCream.findById(req.params.id, function(err, iceCream) {
     for (i=0; i<iceCream.reviews.length; i++) {
        if (iceCream.reviews[i].reviewedBy.toString() === req.user.id.toString()) {
            iceCream.reviews.splice(i, 1);
            break;
      	  };
 	  };
```


Additionally, the ice cream reference is removed from the user's array of rated ice creams:

```
User.findById(req.user, function(err, reviewer) {
    for (i=0; i<reviewer.ratedIceCreams.length; i++) {
         if (reviewer.ratedIceCreams[i].toString() === req.params.id.toString()) {
             reviewer.ratedIceCreams.splice(i, 1);
       };
    };
    reviewer.save(function(err) {console.log(err)});
});
```

# Mobile Optimization

### Media Queries

Media queries make the app optimized for viewing and browsing on mobile.

![Mobile View](https://i.imgur.com/r68VX63.png)

### Swiper Framework

Using the [Swiper framework](https://swiperjs.com/), each ice cream div becomes its own little card, allowing the user to swipe between each, kind of like a Tinder for ice cream.

![Swipe Demonstration](https://i.imgur.com/xF1yRYc.png)

# IceBox Features

* Ensure cross-browser optimization (Swiper on Safari iPhone not functioning perfectly as of yet)
* Add "Back to Basics" boolean for ice creams to only show "Basic" ice creams (i.e. basic chocolate and not chocolate fudge brownie) when selected
* Ensure user is redirected to ice cream they clicked on first from their user page


