
export enum LogSeverityLevel {
    low     = 'low',
    medium  = 'medium',
    high    = 'high',
}

export interface LogEntityOptions {
    level       : LogSeverityLevel,
    message     : string,
    origin      : string
    createdAt?  : Date
}

export class LogEntity {

    public level    : LogSeverityLevel;
    public message  : string
    public createdAt: Date
    public origin   : string;

    constructor({ level, message, origin, createdAt = new Date() }: LogEntityOptions) {
        this.level      = level;
        this.message    = message;
        this.createdAt  = createdAt;
        this.origin     = origin;
    }

    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}' : json;
        const {level, message, origin, createdAt} = JSON.parse(json);
        if (!level && !message) {
            throw new Error('Level and message are required');
        }
        return new LogEntity({level, message, origin, createdAt});
    }

    static fromObject = (object: {[key: string]: any}): LogEntity => {
        const {level, message, createdAt, origin} = object
        return new LogEntity({level, message, origin, createdAt});
    }

}