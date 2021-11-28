/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const GetMeResponse = $root.GetMeResponse = (() => {

    /**
     * Properties of a GetMeResponse.
     * @exports IGetMeResponse
     * @interface IGetMeResponse
     * @property {string|null} [name] GetMeResponse name
     */

    /**
     * Constructs a new GetMeResponse.
     * @exports GetMeResponse
     * @classdesc Represents a GetMeResponse.
     * @implements IGetMeResponse
     * @constructor
     * @param {IGetMeResponse=} [properties] Properties to set
     */
    function GetMeResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetMeResponse name.
     * @member {string} name
     * @memberof GetMeResponse
     * @instance
     */
    GetMeResponse.prototype.name = "";

    /**
     * Creates a new GetMeResponse instance using the specified properties.
     * @function create
     * @memberof GetMeResponse
     * @static
     * @param {IGetMeResponse=} [properties] Properties to set
     * @returns {GetMeResponse} GetMeResponse instance
     */
    GetMeResponse.create = function create(properties) {
        return new GetMeResponse(properties);
    };

    /**
     * Encodes the specified GetMeResponse message. Does not implicitly {@link GetMeResponse.verify|verify} messages.
     * @function encode
     * @memberof GetMeResponse
     * @static
     * @param {IGetMeResponse} message GetMeResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetMeResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        return writer;
    };

    /**
     * Encodes the specified GetMeResponse message, length delimited. Does not implicitly {@link GetMeResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetMeResponse
     * @static
     * @param {IGetMeResponse} message GetMeResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetMeResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetMeResponse message from the specified reader or buffer.
     * @function decode
     * @memberof GetMeResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetMeResponse} GetMeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetMeResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetMeResponse();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GetMeResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetMeResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetMeResponse} GetMeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetMeResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetMeResponse message.
     * @function verify
     * @memberof GetMeResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetMeResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        return null;
    };

    /**
     * Creates a GetMeResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetMeResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetMeResponse} GetMeResponse
     */
    GetMeResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.GetMeResponse)
            return object;
        let message = new $root.GetMeResponse();
        if (object.name != null)
            message.name = String(object.name);
        return message;
    };

    /**
     * Creates a plain object from a GetMeResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetMeResponse
     * @static
     * @param {GetMeResponse} message GetMeResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GetMeResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.name = "";
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        return object;
    };

    /**
     * Converts this GetMeResponse to JSON.
     * @function toJSON
     * @memberof GetMeResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetMeResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetMeResponse;
})();

export { $root as default };
