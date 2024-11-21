export interface sqsServiceI {
    add(params: { message: string; phoneNo?: number; [key: string]: any }): Promise<void>; // Add a message to the queue
    receive(queueUrl: string, maxMessages?: number, waitTimeSeconds?: number): Promise<any[]>; // Receive messages from the queue
    delete(queueUrl: string, receiptHandle: string): Promise<void>; // Delete a message from the queue
    purge(queueUrl: string): Promise<void>; // Purge all messages from the queue
  }
  