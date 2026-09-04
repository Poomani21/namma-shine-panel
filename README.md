# Namma Admin Panel

Poomani21/namma-sparkle-shine.git



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "@secret:GOOGLE_API_KEY ",
  authDomain: "namma-laundry-1c362.firebaseapp.com",
  projectId: "namma-laundry-1c362",
  storageBucket: "namma-laundry-1c362.firebasestorage.app",
  messagingSenderId: "434862063225",
  appId: "1:434862063225:web:c48f3f4328b66aa7b19ea8",
  measurementId: "G-LWZDJBDPHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



Use my existing Namma Laundry website code from this public GitHub repository as the source/reference:



Poomani21/namma-sparkle-shine.git



Create the Admin Panel + Firebase integration without redesigning or breaking the existing public website. i  already done some admin related

Do these 4 tasks:

Admin route

Create/fix /admin.

Run typecheck/build and fix all TypeScript/runtime errors.

Verify that /admin renders correctly.

Admin layout

In src/routes/__root.tsx, hide the existing public website Header and Footer when the current route starts with /admin.

The public website must remain exactly as it is.

Firebase Authentication + Firestore security

Use Firebase Authentication with Email/Password login for /admin.

Add a firestore.rules file.

prices and services: public read access.

prices and services: write access only when the logged-in user's UID has a document at admins/{uid}.

Provide clear setup instructions for Firebase Console:

Enable Email/Password Authentication.

Create the admin user.

Copy the admin user's UID.

Create admins/{uid} in Firestore.

Publish the provided Firestore rules.

Seed existing data + live website sync

Inspect the existing GitHub project and find the current Prices and Services data already used by the website.

Do NOT invent or change any existing price/service values.

Create/import those existing records into Firestore collections:

prices

services

Run the seed/import once from /admin.

Make the admin panel support editing Prices and Services.

Update the public website so it reads Prices and Services from Firestore instead of only hardcoded data.

When an admin edits a price/service in /admin, the change must be reflected on the public website.

Important

Do NOT change the existing public website design, layout, content, routes, or functionality except what is required to connect Prices and Services to Firestore.



Do not rebuild the existing website. Reuse the existing data structure and components wherever possible.



Finally test the complete flow:



Admin Login → Edit Price → Firestore → Public Website displays updated Price



Fix any errors found during typecheck/build and confirm /admin works.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://namma-shine-panel.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7a072ba3-2eaf-493c-a9bb-042243f506d2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
