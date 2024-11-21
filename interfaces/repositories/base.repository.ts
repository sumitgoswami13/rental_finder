export interface baseRepositoryI {
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    findById(id: string): Promise<any>;
    delete(id: string): Promise<void>;
  }
  