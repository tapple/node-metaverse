// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class UUIDGroupNameReplyMessage implements MessageBase
{
    name = 'UUIDGroupNameReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.UUIDGroupNameReply;

    UUIDNameBlock: {
        ID: UUID;
        GroupName: Buffer;
    }[];

    getSize(): number
    {
        return this.calculateVarVarSize(this.UUIDNameBlock, 'GroupName', 1) + ((16) * this.UUIDNameBlock.length) + 1;
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
        const count = this.UUIDNameBlock.length;
        buf.writeUInt8(this.UUIDNameBlock.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.UUIDNameBlock[i]['ID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.UUIDNameBlock[i]['GroupName'].length, pos++);
            this.UUIDNameBlock[i]['GroupName'].copy(buf, pos);
            pos += this.UUIDNameBlock[i]['GroupName'].length;
        }
        return pos - startPos;
    }

    // @ts-ignore
    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        if (pos >= buf.length)
        {
            return pos - startPos;
        }
        const count = buf.readUInt8(pos++);
        this.UUIDNameBlock = [];
        for (let i = 0; i < count; i++)
        {
            const newObjUUIDNameBlock: {
                ID: UUID,
                GroupName: Buffer
            } = {
                ID: UUID.zero(),
                GroupName: Buffer.allocUnsafe(0)
            };
            newObjUUIDNameBlock['ID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjUUIDNameBlock['GroupName'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            this.UUIDNameBlock.push(newObjUUIDNameBlock);
        }
        return pos - startPos;
    }
}

