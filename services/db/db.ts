import { getFirestore } from "firebase/firestore/lite";

import { app } from "@/services/api";

export const db = getFirestore(app);
