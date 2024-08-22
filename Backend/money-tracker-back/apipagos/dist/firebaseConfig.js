"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseDataBase = exports.app = void 0;
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
const firebaseConfig = {
    apiKey: "AIzaSyDV10po-zbQpeTgBkyxwNmpeTKDtX4JOio",
    authDomain: "money-tracer-a3726.firebaseapp.com",
    projectId: "money-tracer-a3726",
    storageBucket: "money-tracer-a3726.appspot.com",
    messagingSenderId: "449497660440",
    appId: "1:449497660440:web:befd097ef572c296b8976d",
    measurementId: "G-H93KTBZC91"
};
exports.app = (0, app_1.initializeApp)(firebaseConfig);
exports.firebaseDataBase = (0, database_1.getDatabase)(exports.app);
//# sourceMappingURL=firebaseConfig.js.map