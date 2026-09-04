import { createServerFn } from "@tanstack/react-start";

/**
 * Returns the public Firebase web configuration.
 * Firebase web API keys are publishable identifiers (access is controlled by
 * Firestore security rules), but the value itself lives in the secret store,
 * so it is served from the server rather than hard-coded in the bundle.
 */
export const getFirebaseConfig = createServerFn({ method: "GET" }).handler(async () => {
  return {
    apiKey: (process.env["GOOGLE_API_KEY"] ?? "").trim(),
    authDomain: "namma-laundry-1c362.firebaseapp.com",
    projectId: "namma-laundry-1c362",
    storageBucket: "namma-laundry-1c362.firebasestorage.app",
    messagingSenderId: "434862063225",
    appId: "1:434862063225:web:c48f3f4328b66aa7b19ea8",
  };
});
