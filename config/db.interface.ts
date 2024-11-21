export interface DatabaseConnectI {
    start(url:string): Promise <void>
}