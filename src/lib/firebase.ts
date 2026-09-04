import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

import { getFirebaseConfig } from "./firebase-config.functions";

let appPromise: Promise<FirebaseApp> | null = null;

/** Lazily initialises Firebase in the browser only. */
export function getFirebaseApp(): Promise<FirebaseApp> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Firebase is only available in the browser"));
  }
  if (!appPromise) {
    appPromise = (async () => {
      const existing = getApps()[0];
      if (existing) return existing;
      const config = await getFirebaseConfig();
      return initializeApp(config);
    })();
  }
  return appPromise;
}

export async function getDb(): Promise<Firestore> {
  return getFirestore(await getFirebaseApp());
}

export async function getFirebaseAuth(): Promise<Auth> {
  return getAuth(await getFirebaseApp());
}

export const COLLECTIONS = {
  prices: "prices",
  services: "services",
  admins: "admins",
} as const;
