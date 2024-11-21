import { baseRepositoryI } from "../interfaces/repositories/base.repository";

export class BaseRepository<T> implements baseRepositoryI {
    protected dbModel: any;

    constructor(dbModel: any) {
        this.dbModel = dbModel;
    }

    // Create a new item in the database
    async create(data: any): Promise<any> {
        try {
            const createdItem = await this.dbModel.create(data);
            return createdItem;
        } catch (error) {
            console.error("Error creating item:", error);
            throw error;
        }
    }

    // Update an existing item in the database by its id
    async update(id: string, data: any): Promise<any> {
        try {
            const item = await this.findById(id);
            if (!item) return null;
            const updatedItem = await this.dbModel.update(data, { where: { id } });
            return updatedItem;
        } catch (error) {
            console.error("Error updating item:", error);
            throw error;
        }
    }

    // Find an item by its id
    async findById(id: string): Promise<any> {
        try {
            const item = await this.dbModel.findOne({ where: { id } });
            return item || null;
        } catch (error) {
            console.error("Error finding item by ID:", error);
            throw error;
        }
    }

    // Delete an item by its id
    async delete(id: string): Promise<void> {
        try {
            const result = await this.dbModel.destroy({ where: { id } });
            if (result === 0) {
                throw new Error(`Item with id ${id} not found.`);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            throw error;
        }
    }
}
