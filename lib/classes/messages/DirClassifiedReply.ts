// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class DirClassifiedReplyMessage implements MessageBase
{
    name = 'DirClassifiedReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.DirClassifiedReply;

    AgentData: {
        AgentID: UUID;
    };
    QueryData: {
        QueryID: UUID;
    };
    QueryReplies: {
        ClassifiedID: UUID;
        Name: Buffer;
        ClassifiedFlags: number;
        CreationDate: number;
        ExpirationDate: number;
        PriceForListing: number;
    }[];
    StatusData: {
        Status: number;
    }[];

    getSize(): number
    {
        return this.calculateVarVarSize(this.QueryReplies, 'Name', 1) + ((29) * this.QueryReplies.length) + ((4) * this.StatusData.length) + 34;
    }

    calculateVarVarSize(block: { [key: string]: any }[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        for (const bl of block)
        {
            size += bl[paramName].length + extraPerVar;
        }
        return size;
    }

    // @ts-ignore
    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.QueryData['QueryID'].writeToBuffer(buf, pos);
        pos += 16;
        let count = this.QueryReplies.length;
        buf.writeUInt8(this.QueryReplies.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.QueryReplies[i]['ClassifiedID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.QueryReplies[i]['Name'].length, pos++);
            this.QueryReplies[i]['Name'].copy(buf, pos);
            pos += this.QueryReplies[i]['Name'].length;
            buf.writeUInt8(this.QueryReplies[i]['ClassifiedFlags'], pos++);
            buf.writeUInt32LE(this.QueryReplies[i]['CreationDate'], pos);
            pos += 4;
            buf.writeUInt32LE(this.QueryReplies[i]['ExpirationDate'], pos);
            pos += 4;
            buf.writeInt32LE(this.QueryReplies[i]['PriceForListing'], pos);
            pos += 4;
        }
        count = this.StatusData.length;
        buf.writeUInt8(this.StatusData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt32LE(this.StatusData[i]['Status'], pos);
            pos += 4;
        }
        return pos - startPos;
    }

    // @ts-ignore
    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID
        } = {
            AgentID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjQueryData: {
            QueryID: UUID
        } = {
            QueryID: UUID.zero()
        };
        newObjQueryData['QueryID'] = new UUID(buf, pos);
        pos += 16;
        this.QueryData = newObjQueryData;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        let count = buf.readUInt8(pos++);
        this.QueryReplies = [];
        for (let i = 0; i < count; i++)
        {
            const newObjQueryReplies: {
                ClassifiedID: UUID,
                Name: Buffer,
                ClassifiedFlags: number,
                CreationDate: number,
                ExpirationDate: number,
                PriceForListing: number
            } = {
                ClassifiedID: UUID.zero(),
                Name: Buffer.allocUnsafe(0),
                ClassifiedFlags: 0,
                CreationDate: 0,
                ExpirationDate: 0,
                PriceForListing: 0
            };
            newObjQueryReplies['ClassifiedID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjQueryReplies['Name'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            newObjQueryReplies['ClassifiedFlags'] = buf.readUInt8(pos++);
            newObjQueryReplies['CreationDate'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjQueryReplies['ExpirationDate'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjQueryReplies['PriceForListing'] = buf.readInt32LE(pos);
            pos += 4;
            this.QueryReplies.push(newObjQueryReplies);
        }
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        count = buf.readUInt8(pos++);
        this.StatusData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjStatusData: {
                Status: number
            } = {
                Status: 0
            };
            newObjStatusData['Status'] = buf.readUInt32LE(pos);
            pos += 4;
            this.StatusData.push(newObjStatusData);
        }
        return pos - startPos;
    }
}

