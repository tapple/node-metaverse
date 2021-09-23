// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class DirLandReplyMessage implements MessageBase
{
    name = 'DirLandReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.Deprecated | MessageFlags.FrequencyLow;
    id = Message.DirLandReply;

    AgentData: {
        AgentID: UUID;
    };
    QueryData: {
        QueryID: UUID;
    };
    QueryReplies: {
        ParcelID: UUID;
        Name: Buffer;
        Auction: boolean;
        ForSale: boolean;
        SalePrice: number;
        ActualArea: number;
    }[];

    getSize(): number
    {
        return this.calculateVarVarSize(this.QueryReplies, 'Name', 1) + ((26) * this.QueryReplies.length) + 33;
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
        const count = this.QueryReplies.length;
        buf.writeUInt8(this.QueryReplies.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.QueryReplies[i]['ParcelID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.QueryReplies[i]['Name'].length, pos++);
            this.QueryReplies[i]['Name'].copy(buf, pos);
            pos += this.QueryReplies[i]['Name'].length;
            buf.writeUInt8((this.QueryReplies[i]['Auction']) ? 1 : 0, pos++);
            buf.writeUInt8((this.QueryReplies[i]['ForSale']) ? 1 : 0, pos++);
            buf.writeInt32LE(this.QueryReplies[i]['SalePrice'], pos);
            pos += 4;
            buf.writeInt32LE(this.QueryReplies[i]['ActualArea'], pos);
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
        const count = buf.readUInt8(pos++);
        this.QueryReplies = [];
        for (let i = 0; i < count; i++)
        {
            const newObjQueryReplies: {
                ParcelID: UUID,
                Name: Buffer,
                Auction: boolean,
                ForSale: boolean,
                SalePrice: number,
                ActualArea: number
            } = {
                ParcelID: UUID.zero(),
                Name: Buffer.allocUnsafe(0),
                Auction: false,
                ForSale: false,
                SalePrice: 0,
                ActualArea: 0
            };
            newObjQueryReplies['ParcelID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjQueryReplies['Name'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            newObjQueryReplies['Auction'] = (buf.readUInt8(pos++) === 1);
            newObjQueryReplies['ForSale'] = (buf.readUInt8(pos++) === 1);
            newObjQueryReplies['SalePrice'] = buf.readInt32LE(pos);
            pos += 4;
            newObjQueryReplies['ActualArea'] = buf.readInt32LE(pos);
            pos += 4;
            this.QueryReplies.push(newObjQueryReplies);
        }
        return pos - startPos;
    }
}

