"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const Vector3_1 = require("../Vector3");
const MessageFlags_1 = require("../../enums/MessageFlags");
class TeleportRequestPacket {
    constructor() {
        this.name = 'TeleportRequest';
        this.flags = MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294901822;
    }
    getSize() {
        return 72;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Info['RegionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Info['Position'].writeToBuffer(buf, pos, false);
        pos += 12;
        this.Info['LookAt'].writeToBuffer(buf, pos, false);
        pos += 12;
        return pos - startPos;
    }
    readFromBuffer(buf, pos) {
        const startPos = pos;
        const newObjAgentData = {
            AgentID: UUID_1.UUID.zero(),
            SessionID: UUID_1.UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjInfo = {
            RegionID: UUID_1.UUID.zero(),
            Position: Vector3_1.Vector3.getZero(),
            LookAt: Vector3_1.Vector3.getZero()
        };
        newObjInfo['RegionID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        newObjInfo['Position'] = new Vector3_1.Vector3(buf, pos, false);
        pos += 12;
        newObjInfo['LookAt'] = new Vector3_1.Vector3(buf, pos, false);
        pos += 12;
        this.Info = newObjInfo;
        return pos - startPos;
    }
}
exports.TeleportRequestPacket = TeleportRequestPacket;
//# sourceMappingURL=TeleportRequest.js.map