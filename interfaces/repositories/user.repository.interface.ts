import { baseRepositoryI } from "./base.repository";

export interface userRepositoryI extends baseRepositoryI {
    finduserByPhone(phoneNo:number):Promise<any>;
    findOrCreateSocialUser(providerData: any): Promise<any>;
}