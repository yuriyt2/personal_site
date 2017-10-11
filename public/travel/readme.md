# Travel Inspiration App
## By [Yuriy Turetskiy](https://www.yuriyturetskiy.com)

![screenshot](https://s3-us-west-2.amazonaws.com/yuriy-site/travel-app.png)
![screenshot2](https://s3-us-west-2.amazonaws.com/yuriy-site/travel-app2.png)

### Description
+ I created an app to help users brainstorm travel ideas.  It is based on the author's experiences and also serves as a way to curate travel photos.  All the photos were taken by the author. 

### Features
+ Users are presented randomly assorted tiles of possible travel destinations.
+ Clicking on an image shows a short description of the location, a map and additional photos.

### Technology Used
+ Ruby on Rails
+ PostgreSQL
+ jQuery
+ Google Maps API

### Deployment URL
[Travel Inspiration Application](https://www.yuriyturetskiy.com/travel)

### Technical Details
+ I built a [separate](https://github.com/yuriyt2/travel-api) CRUD (create, read, update, destroy) application in Rails to function as an API for the front end and deployed it on Heroku.  It's configured to allow cross-origin GET HTTP requests.
+ The front end consumes a JSON endpoint of the API of all the locations arranged randomly.
+ Images are stored in an AWS S3 bucket.
+ Google Maps are displayed on the show page for each location.
