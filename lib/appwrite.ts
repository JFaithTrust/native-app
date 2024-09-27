import {Client, Account, ID, Avatars, Databases, Query} from 'react-native-appwrite';
import {CreateUserProps} from "@/types";

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.js.aora',
    projectId: '66f6a4ae002e7f934101',
    databaseId: '66f6a7f200132437b1ee',
    userCollectionId: '66f6a825001c2d25837b',
    videoCollectionId: '66f6a85a0024a60d8179',
    storageId: '66f6aa490028ad970886'
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
    }catch (error) {
        console.log(error);
        throw new Error("Error creating user");
    }
}

export async function signIn(email: string, password: string) {
    try {
       const session = await account.createEmailPasswordSession(email, password);

        return session;
    }catch (error) {
        console.log(error);
        throw new Error("Error signing in");
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    }catch (error) {
        console.log(error);
        throw new Error("Error getting current user");
    }
}