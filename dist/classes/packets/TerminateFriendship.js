"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../UUID");
const MessageFlags_1 = require("../../enums/MessageFlags");
class TerminateFriendshipPacket {
    constructor() {
        this.name = 'TerminateFriendship';
        this.flags = MessageFlags_1.MessageFlags.FrequencyLow;
        this.id = 4294902060;
    }
    getSize() {
        return 48;
    }
    writeToBuffer(buf, pos) {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.ExBlock['OtherID'].writeToBuffer(buf, pos);
        pos += 16;
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
        const newObjExBlock = {
            OtherID: UUID_1.UUID.zero()
        };
        newObjExBlock['OtherID'] = new UUID_1.UUID(buf, pos);
        pos += 16;
        this.ExBlock = newObjExBlock;
        return pos - startPos;
    }
}
exports.TerminateFriendshipPacket = TerminateFriendshipPacket;
//# sourceMappingURL=TerminateFriendship.js.map