import { DatabaseConnectI } from "./db.interface";
import { DataSource } from "typeorm";

class DatabaseConnect implements DatabaseConnectI {
  private dataSource: DataSource | null = null;

  constructor() {}

  public async start(url: string): Promise<void> {
    try {
      this.dataSource = new DataSource({
        type: "postgres",
        url: url,
        synchronize: true, // You can change this based on your needs
        logging: false, // You can enable logging if required
        entities: [
          // Include your entities here
        ],
      });

      await this.dataSource.initialize();
      console.log("PostgreSQL connected successfully with TypeORM!");
    } catch (error) {
      console.error("Failed to connect to PostgreSQL with TypeORM:", error);
      throw error;
    }
  }

  public async close(): Promise<void> {
    try {
      if (this.dataSource) {
        await this.dataSource.destroy();
        this.dataSource = null;
        console.log("PostgreSQL connection closed successfully!");
      }
    } catch (error) {
      console.error("Failed to close PostgreSQL connection with TypeORM:", error);
      throw error;
    }
  }
}

export default DatabaseConnect;
