import React, { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../libs/apiCall";
import { auth } from "../libs/firebaseConfig";
import useStore from "../store";
import Button from "./button";

export const SocialAuth = ({ isLoading, setLoading }) => {
    const [user] = useAuthState(auth);
    const { setCredentials } = useStore((state) => state);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setLoading(true);
            const res = await signInWithPopup(auth, provider);
            const { user } = res;
            // console.log("Google Sign-In successful:", user);
            saveUserToDb(user);
        } catch (error) {
            console.error("Error signing in with Google:", error);
            toast.error("Failed to sign in with Google. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const saveUserToDb = async (user) => {
        if (!user) return;
        try {
            const userData = {
                name: user.displayName,
                email: user.email,
                provider: "google",
                uid: user.uid,
            };

            const { data: res } = await api.post("/auth/sign-in", userData);
            // console.log("User saved to database:", res);

            if (res?.user) {
                toast.success(res?.message);
                const userInfo = { ...res?.user, token: res?.token };
                localStorage.setItem("user", JSON.stringify(userInfo));
                setCredentials(userInfo);

                setTimeout(() => navigate("/overview"), 1500);
            }
        } catch (error) {
            console.error("Error saving user to database:", error);
            toast.error(error?.response?.data?.message || "An error occurred.");
        }
    };

    useEffect(() => {
        if (user) {
            saveUserToDb(user);
        }
    }, [user]);

    return (
        <div className="flex items-center gap-2">
            <Button
                onClick={signInWithGoogle}
                disabled={isLoading}
                variant="outline"
                className="w-full text-sm font-normal dark:border-gray-800 dark:text-gray-400"
                type="button"
            >
                <FcGoogle className="mr-2 size-5" />
                Continue with Google
            </Button>
        </div>
    );
};

export default SocialAuth;
