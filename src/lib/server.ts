// place files you want to import through the `$lib` alias in this folder.
// Import the functions you need from the SDKs you need
import  admin from "firebase-admin";
import serviceAccount from "$lib/key.json";
import { Constants } from "./constants";

try {
  // Initialze the admin app
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cul-student-helper-app-default-rtdb.europe-west1.firebasedatabase.app"
  });
} catch(e) {}

/**
 * An object that represents this firebase application.
 */
export const app = admin.app();


/**
 * An object that represents the storage for this firebase application.
 */
export const storage = admin.storage()

/**
 * An object that represents the database for this firebase application. 
 * We use Cloud Firestore as opposed to Realtime Database because we want more
 * performant queries.
 */
export const database = admin.firestore();


/**
 * The collection of all users in our database.
 */
export const usersCollection = database.collection(Constants.userReference)

/**
 * The collection of all schedules in our database.
 */
export const schedulesCollection = database.collection(Constants.scheduleReference);

/**
 * The collection of all schedules in our database.
 */
export const collefgesCollection = database.collection(Constants.collegesReference);

/**
 * The collection of all schedules in our database.
 */
export const departmentCollection = database.collection(Constants.departmentReference);
