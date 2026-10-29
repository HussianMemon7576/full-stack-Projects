
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

import { RefreshToken } from "../api/auth.api";
import {
    setSucessRefresh,
    setNotSucessRefresh,
} from "../features/auth/authSlice";

const AuthInitializer = () => {
    const dispatch = useDispatch<AppDispatch>();

      const restoreSession = async () => {
            try {
                const token = await RefreshToken();

                dispatch(setSucessRefresh(token));
            } catch (error) {
                dispatch(setNotSucessRefresh());

                console.error("Session restore failed:", error);
            }
        };

    useEffect(() => {
    
        restoreSession();
    }, [dispatch]);

    return null;
};

export default AuthInitializer;
