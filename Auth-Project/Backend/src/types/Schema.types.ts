import type mongoose from "mongoose";
import type { createSessionInDB } from "../dao/session.js";
import type { SessionType } from "../models/session.js";

export interface payload {
    userId : string,
    sessionId : string
}

export type CreateSessionReturn = {
  RefreshToken: string;
  session: SessionType & { _id: mongoose.Types.ObjectId };

  AccessToken: string;

};
