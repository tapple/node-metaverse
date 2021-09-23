// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class GroupTitlesReplyMessage implements MessageBase
{
    name = 'GroupTitlesReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.GroupTitlesReply;

    AgentData: {
        AgentID: UUID;
        GroupID: UUID;
        RequestID: UUID;
    };
    GroupData: {
        Title: Buffer;
        RoleID: UUID;
        Selected: boolean;
    }[];

    getSize(): number
    {
        return this.calculateVarVarSize(this.GroupData, 'Title', 1) + ((17) * this.GroupData.length) + 49;
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
        this.AgentData['GroupID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['RequestID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.GroupData.length;
        buf.writeUInt8(this.GroupData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt8(this.GroupData[i]['Title'].length, pos++);
            this.GroupData[i]['Title'].copy(buf, pos);
            pos += this.GroupData[i]['Title'].length;
            this.GroupData[i]['RoleID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8((this.GroupData[i]['Selected']) ? 1 : 0, pos++);
        }
        return pos - startPos;
    }

    // @ts-ignore
    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            GroupID: UUID,
            RequestID: UUID
        } = {
            AgentID: UUID.zero(),
            GroupID: UUID.zero(),
            RequestID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['GroupID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['RequestID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.GroupData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjGroupData: {
                Title: Buffer,
                RoleID: UUID,
                Selected: boolean
            } = {
                Title: Buffer.allocUnsafe(0),
                RoleID: UUID.zero(),
                Selected: false
            };
            varLength = buf.readUInt8(pos++);
            newObjGroupData['Title'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            newObjGroupData['RoleID'] = new UUID(buf, pos);
            pos += 16;
            newObjGroupData['Selected'] = (buf.readUInt8(pos++) === 1);
            this.GroupData.push(newObjGroupData);
        }
        return pos - startPos;
    }
}

