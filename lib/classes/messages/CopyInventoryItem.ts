// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class CopyInventoryItemMessage implements MessageBase
{
    name = 'CopyInventoryItem';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.CopyInventoryItem;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    InventoryData: {
        CallbackID: number;
        OldAgentID: UUID;
        OldItemID: UUID;
        NewFolderID: UUID;
        NewName: Buffer;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.InventoryData, 'NewName', 1) + 52) * this.InventoryData.length) + 33;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.InventoryData.length;
        buf.writeUInt8(this.InventoryData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt32LE(this.InventoryData[i]['CallbackID'], pos);
            pos += 4;
            this.InventoryData[i]['OldAgentID'].writeToBuffer(buf, pos);
            pos += 16;
            this.InventoryData[i]['OldItemID'].writeToBuffer(buf, pos);
            pos += 16;
            this.InventoryData[i]['NewFolderID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.InventoryData[i]['NewName'].length, pos++);
            this.InventoryData[i]['NewName'].copy(buf, pos);
            pos += this.InventoryData[i]['NewName'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const count = buf.readUInt8(pos++);
        this.InventoryData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjInventoryData: {
                CallbackID: number,
                OldAgentID: UUID,
                OldItemID: UUID,
                NewFolderID: UUID,
                NewName: Buffer
            } = {
                CallbackID: 0,
                OldAgentID: UUID.zero(),
                OldItemID: UUID.zero(),
                NewFolderID: UUID.zero(),
                NewName: Buffer.allocUnsafe(0)
            };
            newObjInventoryData['CallbackID'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjInventoryData['OldAgentID'] = new UUID(buf, pos);
            pos += 16;
            newObjInventoryData['OldItemID'] = new UUID(buf, pos);
            pos += 16;
            newObjInventoryData['NewFolderID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjInventoryData['NewName'] = buf.slice(pos, pos + (varLength - 1));
            pos += varLength;
            this.InventoryData.push(newObjInventoryData);
        }
        return pos - startPos;
    }
}
