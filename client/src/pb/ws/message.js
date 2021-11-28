/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const WsMessage = $root.WsMessage = (() => {

    /**
     * Properties of a WsMessage.
     * @exports IWsMessage
     * @interface IWsMessage
     * @property {string|null} [UserID] WsMessage UserID
     * @property {string|null} [Message] WsMessage Message
     */

    /**
     * Constructs a new WsMessage.
     * @exports WsMessage
     * @classdesc Represents a WsMessage.
     * @implements IWsMessage
     * @constructor
     * @param {IWsMessage=} [properties] Properties to set
     */
    function WsMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * WsMessage UserID.
     * @member {string} UserID
     * @memberof WsMessage
     * @instance
     */
    WsMessage.prototype.UserID = "";

    /**
     * WsMessage Message.
     * @member {string} Message
     * @memberof WsMessage
     * @instance
     */
    WsMessage.prototype.Message = "";

    /**
     * Creates a new WsMessage instance using the specified properties.
     * @function create
     * @memberof WsMessage
     * @static
     * @param {IWsMessage=} [properties] Properties to set
     * @returns {WsMessage} WsMessage instance
     */
    WsMessage.create = function create(properties) {
        return new WsMessage(properties);
    };

    /**
     * Encodes the specified WsMessage message. Does not implicitly {@link WsMessage.verify|verify} messages.
     * @function encode
     * @memberof WsMessage
     * @static
     * @param {IWsMessage} message WsMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WsMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.UserID != null && Object.hasOwnProperty.call(message, "UserID"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.UserID);
        if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.Message);
        return writer;
    };

    /**
     * Encodes the specified WsMessage message, length delimited. Does not implicitly {@link WsMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof WsMessage
     * @static
     * @param {IWsMessage} message WsMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WsMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a WsMessage message from the specified reader or buffer.
     * @function decode
     * @memberof WsMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {WsMessage} WsMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WsMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.WsMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.UserID = reader.string();
                break;
            case 2:
                message.Message = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a WsMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof WsMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {WsMessage} WsMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WsMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a WsMessage message.
     * @function verify
     * @memberof WsMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    WsMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.UserID != null && message.hasOwnProperty("UserID"))
            if (!$util.isString(message.UserID))
                return "UserID: string expected";
        if (message.Message != null && message.hasOwnProperty("Message"))
            if (!$util.isString(message.Message))
                return "Message: string expected";
        return null;
    };

    /**
     * Creates a WsMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof WsMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {WsMessage} WsMessage
     */
    WsMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.WsMessage)
            return object;
        let message = new $root.WsMessage();
        if (object.UserID != null)
            message.UserID = String(object.UserID);
        if (object.Message != null)
            message.Message = String(object.Message);
        return message;
    };

    /**
     * Creates a plain object from a WsMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof WsMessage
     * @static
     * @param {WsMessage} message WsMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    WsMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.UserID = "";
            object.Message = "";
        }
        if (message.UserID != null && message.hasOwnProperty("UserID"))
            object.UserID = message.UserID;
        if (message.Message != null && message.hasOwnProperty("Message"))
            object.Message = message.Message;
        return object;
    };

    /**
     * Converts this WsMessage to JSON.
     * @function toJSON
     * @memberof WsMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    WsMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return WsMessage;
})();

export { $root as default };
