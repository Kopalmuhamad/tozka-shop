import { addUser, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";


export async function signUp(userData: {
    email: string;
    fullname: string;
    password: string;
    phone: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
}): Promise<boolean> {
    try {
        const existingUsers = await retrieveDataByField(
            "users",
            "email",
            userData.email
        );

        if (existingUsers.length > 0) {
            return false; // User already exists
        }

        if (!userData.role) {
            userData.role = "member";
        }

        userData.password = await bcrypt.hash(userData.password, 10);
        userData.created_at = new Date();
        userData.updated_at = new Date();
        await addUser("users", userData);

        return true;
    } catch (error) {
        console.error("Error in signUp:", error);
        return false;
    }
}

export async function signIn(email: string, password: string) {
    try {
        const data = await retrieveDataByField("users", "email", email);

        if (data) return data[0];
        else return null;
    } catch (error) {
        console.error("Error in signIn:", error);
        return null;
    }
}

export async function loginWithGoogle(
    data: { email: string; role?: string },
    callback: Function
) {
    try {
        const user = await retrieveDataByField("users", "email", data.email);

        if (user.length > 0) {
            callback(user[0]);
        } else {
            if (!data.role) {
                data.role = "member";
            }
            await addUser("users", data);
            callback(data);
        }
    } catch (error) {
        console.error("Error in loginWithGoogle:", error);
    }
}