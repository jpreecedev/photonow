# Find My Face

_Find My Face_ is a website built using Next.js, React, and Material UI that uses AWS Rekognition to recognise people in an album of pictures.

_Find My Face_ was originally built to be a commercial product, but the idea has since been abandoned and is now open source and available to all.

_Find My Face_ has the following features;

- Log in, registration, user management via JWT (Json Web Tokens).
- Ability to capture a picture of your face using React Webcam (works on desktop and mobile, uses the mobile front-facing camera).
- Uploads your face to AWS Rekognition, which then searches through a predefined collection of images and returns all the images you were found in.
- You can preview all the pictures you were found in, and add any you would like to purchase to a basket.
- You can go through a checkout journey, and purchase those pictures (payment is made using Stripe).
- Finally, once payment is confirmed, you can download the high quality pictures directly to your device.
- As an administrator (you have created an account), you can upload pictures directly to the collection.

The original thinking was that this product would be used at private events, conferences, gigs, festivals, and basically anywhere where a large group or crowd of people gather. A photographer would go around and take pictures of people and then anybody would be easily able to find those pictures later (and ideally purchase them). The product never made it to market.

## Tech stack

Find My Face was built using the following technologies;

- Next.js with a custom back-end, which features server-side rendering, client side hydration and more.
- AWS Rekognition, for face detection/recognition.
- React for the front-end.
- MongoDB to store data about users, orders, payments etc.
- React-Webcam to capture images using the webcam/front-facing camera.
- Material UI (React) for the design.
- Redux for state management.
- Stripe for payments
- Filepond for image uploads.
- And many, many more.

## V2 features

As this product is at MVP stage, there are some missing features that would have been added had development continued.

Those features were;

- Images uploaded to a collection should be resized and watermarked (watermark is missing because of an issue with relative paths)
- Full end-to-end SSL (we're using Cloudflare for SSL at the minute). This would allow us to have secure cookies.
- Fully automated deployment with PM2
- Allow OAuth login using Google and/or Facebook

## Future development

It was great fun building this website and I intend to get some value out of it. The plan is to turn the development of this website into a series of blog posts and potentially an e-book, so as to reinforce my own understand of all the technologies, and to help others learn and grow themselves.

Stay tuned! 🧀
