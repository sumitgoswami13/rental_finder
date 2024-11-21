import { userRepositoryI } from "../interfaces/repositories/user.repository.interface";
import User from "../Models/user.models";
import { BaseRepository } from "./base.repositories"; // Assuming BaseRepository is an abstract class

class UserRepository extends BaseRepository<User> implements userRepositoryI {
    private model:any

    constructor(model: typeof User) {
        super(model);
        this.model = model
         // Initialize the repository with the `User` model
    }

    // Method to find user by phone number
    public async finduserByPhone(phoneNo: number): Promise<User | null> {
        try {
            const user = await this.model.findOne({ where: { phoneNo } });
            return user || null; // Return the user if found, else return null
        } catch (error) {
            console.error("Error in finduserByPhone:", error);
            throw error; // Rethrow error to be handled by the calling code
        }
    }

    // Method to find or create a social user based on provider data (e.g., Google, Facebook)
    public async findOrCreateSocialUser(providerData: any): Promise<User> {
        try {
            // Try to find an existing user by social provider's unique ID or data
            let user = await this.model.findOne({ where: { socialId: providerData.socialId } });

            if (!user) {
                // If no user found, create a new one
                user = await this.model.save({
                    userName: providerData.userName,
                    email: providerData.email,
                    phoneNo: providerData.phoneNo,
                    isVerified: true, // Assuming social users are verified
                    isProfileAllowed: true, // Default profile allowed for social users
                    lastLogin: new Date(),
                    socialId: providerData.socialId // Store the social provider's ID
                });
            }

            return user;
        } catch (error) {
            console.error("Error in findOrCreateSocialUser:", error);
            throw error; // Rethrow error to be handled by the calling code
        }
    }
}

export default UserRepository;
