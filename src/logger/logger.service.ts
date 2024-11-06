import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

/**
 * 1. Rework LoggerService to a facade and move Elasticsearch implementation details to a dedicated file
 * 2. Rework methods to use 'abstract' names like 'info', 'debug', 'error' etc. instead of 'indexLog'
 */
@Injectable()
export class LoggerService implements OnModuleInit {
    private readonly client: Client;

    constructor() {
        this.client = new Client({ node: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}` });
    }

    async onModuleInit() {
        try {
            const health = await this.client.cluster.health();
            console.log('Elasticsearch cluster health:', health);
        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }
    }

    async indexLog(index: string, logData: Record<string, any>) {
        try {
            await this.client.index({
                index,
                body: logData,
            });
            console.log(`Log data indexed to ${index}`);
        } catch (error) {
            console.error('Error indexing log data:', error);
        }
    }

    async searchLogs(index: string, query: Record<string, any>) {
        try {
            const result = await this.client.search({
                index,
                body: query,
            });
            return result.hits.hits;
        } catch (error) {
            console.error('Error searching logs:', error);
            throw error;
        }
    }
}
