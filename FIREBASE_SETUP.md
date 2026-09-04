# Namma Laundry — Firebase setup (one time)

Project: `namma-laundry-1c362`

## 1. Enable Email/Password sign-in

Firebase Console → **Build → Authentication → Get started → Sign-in method** →
enable **Email/Password** → Save.

## 2. Create the admin user

Authentication → **Users → Add user** → enter the admin email + password → Add user.

## 3. Copy the admin UID

In the Users list, copy the **User UID** of that account (e.g. `q7Xa...`).

## 4. Create `admins/{uid}` in Firestore

Build → **Firestore Database** (create the database in production mode if you
have not yet) → **Start collection** → Collection ID: `admins` → Document ID:
paste the UID → add any field, e.g. `email` (string) = the admin email → Save.

The document ID **must** be exactly the UID.

## 5. Publish the security rules

Firestore Database → **Rules** tab → paste the contents of
[`firestore.rules`](./firestore.rules) → **Publish**.

Effect:

- `prices` and `services` — public read, write only for a signed-in user that
  has a document at `admins/{uid}`.
- `admins` — a user may read only their own document; no client writes.
- Everything else is denied.

## 6. Seed the catalogue

Open `/admin`, sign in with the admin account, and click **Seed from website
data**. This copies the existing prices and services from the site's bundled
data into the `prices` and `services` collections, unchanged. Run it once.

After seeding, edits made in `/admin` are read by the public Pricing and
Services pages straight from Firestore.

## API key

The Firebase web API key is stored as the `GOOGLE_API_KEY` secret and served to
the browser by `src/lib/firebase-config.functions.ts`. Web API keys are
publishable identifiers — access is enforced by the rules above.
