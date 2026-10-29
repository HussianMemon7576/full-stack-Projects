import type { CreateSessionReturn } from "../types/Schema.types.js"
import { convertvaluetoCrypto } from "./hashed.js"
import { createAccessToken, createRefreshToken } from "./Tokens.js"
import { createSessionInDB } from "../dao/session.js"

export async function createSession(id:string,ip:string|null,userAgent:string|null): Promise<CreateSessionReturn>{
    const RefreshToken = createRefreshToken(id.toString())
    const RefreshTokenhashed = convertvaluetoCrypto(RefreshToken)
    const session = await createSessionInDB(id.toString(),RefreshTokenhashed,ip,userAgent)
    
    const AccessToken = createAccessToken(id.toString(),session._id.toString())

    return {
        RefreshToken,
        session,
        AccessToken,
    }
}