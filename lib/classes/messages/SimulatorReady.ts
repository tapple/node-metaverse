// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class SimulatorReadyMessage implements MessageBase
{
    name = 'SimulatorReady';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.SimulatorReady;

    SimulatorBlock: {
        SimName: Buffer;
        SimAccess: number;
        RegionFlags: number;
        RegionID: UUID;
        EstateID: number;
        ParentEstateID: number;
    };
    TelehubBlock: {
        HasTelehub: boolean;
        TelehubPos: Vector3;
    };

    getSize(): number
    {
        return (this.SimulatorBlock['SimName'].length + 1) + 42;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8(this.SimulatorBlock['SimName'].length, pos++);
        this.SimulatorBlock['SimName'].copy(buf, pos);
        pos += this.SimulatorBlock['SimName'].length;
        buf.writeUInt8(this.SimulatorBlock['SimAccess'], pos++);
        buf.writeUInt32LE(this.SimulatorBlock['RegionFlags'], pos);
        pos += 4;
        this.SimulatorBlock['RegionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.SimulatorBlock['EstateID'], pos);
        pos += 4;
        buf.writeUInt32LE(this.SimulatorBlock['ParentEstateID'], pos);
        pos += 4;
        buf.writeUInt8((this.TelehubBlock['HasTelehub']) ? 1 : 0, pos++);
        this.TelehubBlock['TelehubPos'].writeToBuffer(buf, pos, false);
        pos += 12;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjSimulatorBlock: {
            SimName: Buffer,
            SimAccess: number,
            RegionFlags: number,
            RegionID: UUID,
            EstateID: number,
            ParentEstateID: number
        } = {
            SimName: Buffer.allocUnsafe(0),
            SimAccess: 0,
            RegionFlags: 0,
            RegionID: UUID.zero(),
            EstateID: 0,
            ParentEstateID: 0
        };
        varLength = buf.readUInt8(pos++);
        newObjSimulatorBlock['SimName'] = buf.slice(pos, pos + (varLength - 1));
        pos += varLength;
        newObjSimulatorBlock['SimAccess'] = buf.readUInt8(pos++);
        newObjSimulatorBlock['RegionFlags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjSimulatorBlock['RegionID'] = new UUID(buf, pos);
        pos += 16;
        newObjSimulatorBlock['EstateID'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjSimulatorBlock['ParentEstateID'] = buf.readUInt32LE(pos);
        pos += 4;
        this.SimulatorBlock = newObjSimulatorBlock;
        const newObjTelehubBlock: {
            HasTelehub: boolean,
            TelehubPos: Vector3
        } = {
            HasTelehub: false,
            TelehubPos: Vector3.getZero()
        };
        newObjTelehubBlock['HasTelehub'] = (buf.readUInt8(pos++) === 1);
        newObjTelehubBlock['TelehubPos'] = new Vector3(buf, pos, false);
        pos += 12;
        this.TelehubBlock = newObjTelehubBlock;
        return pos - startPos;
    }
}
