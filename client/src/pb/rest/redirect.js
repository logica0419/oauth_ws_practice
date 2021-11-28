/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const GetRedirectResponse = $root.GetRedirectResponse = (() => {

    /**
     * Properties of a GetRedirectResponse.
     * @exports IGetRedirectResponse
     * @interface IGetRedirectResponse
     * @property {string|null} [redirectUri] GetRedirectResponse redirectUri
     */

    /**
     * Constructs a new GetRedirectResponse.
     * @exports GetRedirectResponse
     * @classdesc Represents a GetRedirectResponse.
     * @implements IGetRedirectResponse
     * @constructor
     * @param {IGetRedirectResponse=} [properties] Properties to set
     */
    function GetRedirectResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetRedirectResponse redirectUri.
     * @member {string} redirectUri
     * @memberof GetRedirectResponse
     * @instance
     */
    GetRedirectResponse.prototype.redirectUri = "";

    /**
     * Creates a new GetRedirectResponse instance using the specified properties.
     * @function create
     * @memberof GetRedirectResponse
     * @static
     * @param {IGetRedirectResponse=} [properties] Properties to set
     * @returns {GetRedirectResponse} GetRedirectResponse instance
     */
    GetRedirectResponse.create = function create(properties) {
        return new GetRedirectResponse(properties);
    };

    /**
     * Encodes the specified GetRedirectResponse message. Does not implicitly {@link GetRedirectResponse.verify|verify} messages.
     * @function encode
     * @memberof GetRedirectResponse
     * @static
     * @param {IGetRedirectResponse} message GetRedirectResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetRedirectResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.redirectUri != null && Object.hasOwnProperty.call(message, "redirectUri"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.redirectUri);
        return writer;
    };

    /**
     * Encodes the specified GetRedirectResponse message, length delimited. Does not implicitly {@link GetRedirectResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetRedirectResponse
     * @static
     * @param {IGetRedirectResponse} message GetRedirectResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetRedirectResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetRedirectResponse message from the specified reader or buffer.
     * @function decode
     * @memberof GetRedirectResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetRedirectResponse} GetRedirectResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetRedirectResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetRedirectResponse();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.redirectUri = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GetRedirectResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetRedirectResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetRedirectResponse} GetRedirectResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetRedirectResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetRedirectResponse message.
     * @function verify
     * @memberof GetRedirectResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetRedirectResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.redirectUri != null && message.hasOwnProperty("redirectUri"))
            if (!$util.isString(message.redirectUri))
                return "redirectUri: string expected";
        return null;
    };

    /**
     * Creates a GetRedirectResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetRedirectResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetRedirectResponse} GetRedirectResponse
     */
    GetRedirectResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.GetRedirectResponse)
            return object;
        let message = new $root.GetRedirectResponse();
        if (object.redirectUri != null)
            message.redirectUri = String(object.redirectUri);
        return message;
    };

    /**
     * Creates a plain object from a GetRedirectResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetRedirectResponse
     * @static
     * @param {GetRedirectResponse} message GetRedirectResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GetRedirectResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.redirectUri = "";
        if (message.redirectUri != null && message.hasOwnProperty("redirectUri"))
            object.redirectUri = message.redirectUri;
        return object;
    };

    /**
     * Converts this GetRedirectResponse to JSON.
     * @function toJSON
     * @memberof GetRedirectResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetRedirectResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetRedirectResponse;
})();

export { $root as default };
