import { sqsServiceI } from "../interfaces/helpers/sqs.interface";
import AWS from 'aws-sdk';

const sqs = new AWS.SQS({ region: 'us-east-1' });

class sqsService implements sqsServiceI {
  
  public async add(params: { message: string; phoneNo?: number; [key: string]: any }): Promise<void> {
    const { message, phoneNo, ...additionalParams } = params;

    const sqsParams: AWS.SQS.SendMessageRequest = {
      QueueUrl: process.env.SQS_QUEUE_URL as string,
      MessageBody: JSON.stringify({ message, phoneNo, ...additionalParams }),
    };

    try {
      await sqs.sendMessage(sqsParams).promise();
    } catch (error) {
      console.error('Error adding message to queue:', error);
      throw error;
    }
  }

  public async receive(queueUrl: string, maxMessages: number = 10, waitTimeSeconds: number = 20): Promise<any[]> {
    const sqsParams: AWS.SQS.ReceiveMessageRequest = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: maxMessages,
      WaitTimeSeconds: waitTimeSeconds,
      AttributeNames: ['All'],
    };

    try {
      const data = await sqs.receiveMessage(sqsParams).promise();
      return data.Messages || [];
    } catch (error) {
      console.error('Error receiving messages from queue:', error);
      throw error;
    }
  }

  public async delete(queueUrl: string, receiptHandle: string): Promise<void> {
    const sqsParams: AWS.SQS.DeleteMessageRequest = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };

    try {
      await sqs.deleteMessage(sqsParams).promise();
    } catch (error) {
      console.error('Error deleting message from queue:', error);
      throw error;
    }
  }

  public async purge(queueUrl: string): Promise<void> {
    const sqsParams: AWS.SQS.PurgeQueueRequest = {
      QueueUrl: queueUrl,
    };

    try {
      await sqs.purgeQueue(sqsParams).promise();
    } catch (error) {
      console.error('Error purging queue:', error);
      throw error;
    }
  }
}

export default sqsService;
