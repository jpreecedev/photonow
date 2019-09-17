# Find My Face

_Find My Face_ is a website built using Next.js, React, and Material UI that uses AWS Rekognition to recognise people in an album of pictures.

_Find My Face_ was originally built to be a commercial product, but the idea has since been abandoned and is now open source and available to all.

_Find My Face_ has the following features;

- Log in, registration, user management via JWT (Json Web Tokens).
- Ability to capture a picture of your face using React Webcam (works on desktop and mobile, uses the mobile front-facing camera).
- Uploads your face to AWS Rekognition, which then searches through a predefined collection of images and returns all the images you were found in.
- You can preview all the pictures you were found in, and add any you would like to purchase to a basket.
- You can go through a checkout journey, and purchase those pictures (payment is made using Stripe).
- Finally, once payment is confirmed, you can download the high-quality pictures directly to your device.
- As an administrator (you have created an account), you can upload pictures directly to the collection.

The original thinking was that this product would be used at private events, conferences, gigs, festivals, and basically anywhere where a large group or crowd of people gather. A photographer would go around and take pictures of people and then anybody would be easily able to find those pictures later (and ideally purchase them). The product never made it to market.

## Tech stack

Find My Face was built using the following technologies;

- Next.js with a custom back-end, which features server-side rendering, client-side hydration and more.
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

## How to set up and use.

This code should be straightforward to download and use, thanks to the power and simplicity of Next.js.

- Clone the repo
- Run `npm install` to install package dependencies
- Rename `.env-example` to `.env` and populate the placeholder variables with your own values (should be fairly self-explanatory)
- Then run `npm run dev` to spin up the development server and navigate to `http://localhost:3000` in your browser.
- To upload images to your collection, first create an account (`http://localhost:3000/register`) and you will be redirected to an upload screen. Use the upload screen to upload images directly to your AWS Face Rekognition collection.

If you find any particular pain-points during the setup process, please open an issue.

## Dream MVP

If I had unlimited time and resource, I'd use the following/have the following features for my MVP;

- Next.js for SSR, with custom back end using Express.
- Mongoose as a light wrapper around Mongo, and a View Model layer around each Schema for easier code reuse.
- Write all tests using Jest
  - Back-end tests would rely on Mongo Memory Server for speed
  - Front-end tests would use React Testing Library
  - End-to-end tests would be written in Cypress
- Authentication using Passport.js local strategy, Google OAuth and Facebook (for speed and simplicity when registering and logging in)
- Session management using JWT
- Authorisation
  - Administrator role, owner role (photographer), and customer role
  - Administrators and owner would have the ability to create image collections
  - Owners should be able to create image collections and would be able to see orders, revenue etc
  - Administrators would have dashboard figures for all photographers, similar to that provided in Stripe
- Filepond for image upload, Multer for accepting image uploads, AWS S3 for storage, Sharp for image processing
- React Webcam for image capture
- Stripe for payments
- React, Redux (or Apollo) front-end/state management
- Material UI for design
- End-to-end SSL, automated deployments to Digital Ocean, PM2 for process handling
- Transactional emails using AWS SES, useful when creating an account, placing an order etc
- Allow customers to watch collections
- Push notifications, let the customer know when a collection they are watching has been updated
- Google Analytics

I think that covers most of what is required for a basic SASS product.

## Future development

It was great fun building this website and I intend to get some value out of it. The plan is to turn the development of this website into a series of blog posts and potentially an e-book, so as to reinforce my own understand of all the technologies, and to help others learn and grow themselves.

Stay tuned! 🧀
