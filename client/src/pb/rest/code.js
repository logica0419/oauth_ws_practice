/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const PostCodeRequest = $root.PostCodeRequest = (() => {

    /**
     * Properties of a PostCodeRequest.
     * @exports IPostCodeRequest
     * @interface IPostCodeRequest
     * @property {string|null} [code] PostCodeRequest code
     */

    /**
     * Constructs a new PostCodeRequest.
     * @exports PostCodeRequest
     * @classdesc Represents a PostCodeRequest.
     * @implements IPostCodeRequest
     * @constructor
     * @param {IPostCodeRequest=} [properties] Properties to set
     */
    function PostCodeRequest(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PostCodeRequest code.
     * @member {string} code
     * @memberof PostCodeRequest
     * @instance
     */
    PostCodeRequest.prototype.code = "";

    /**
     * Creates a new PostCodeRequest instance using the specified properties.
     * @function create
     * @memberof PostCodeRequest
     * @static
     * @param {IPostCodeRequest=} [properties] Properties to set
     * @returns {PostCodeRequest} PostCodeRequest instance
     */
    PostCodeRequest.create = function create(properties) {
        return new PostCodeRequest(properties);
    };

    /**
     * Encodes the specified PostCodeRequest message. Does not implicitly {@link PostCodeRequest.verify|verify} messages.
     * @function encode
     * @memberof PostCodeRequest
     * @static
     * @param {IPostCodeRequest} message PostCodeRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PostCodeRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
        return writer;
    };

    /**
     * Encodes the specified PostCodeRequest message, length delimited. Does not implicitly {@link PostCodeRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PostCodeRequest
     * @static
     * @param {IPostCodeRequest} message PostCodeRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PostCodeRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PostCodeRequest message from the specified reader or buffer.
     * @function decode
     * @memberof PostCodeRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PostCodeRequest} PostCodeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PostCodeRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PostCodeRequest();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.code = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PostCodeRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PostCodeRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PostCodeRequest} PostCodeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PostCodeRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PostCodeRequest message.
     * @function verify
     * @memberof PostCodeRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PostCodeRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.code != null && message.hasOwnProperty("code"))
            if (!$util.isString(message.code))
                return "code: string expected";
        return null;
    };

    /**
     * Creates a PostCodeRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PostCodeRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PostCodeRequest} PostCodeRequest
     */
    PostCodeRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.PostCodeRequest)
            return object;
        let message = new $root.PostCodeRequest();
        if (object.code != null)
            message.code = String(object.code);
        return message;
    };

    /**
     * Creates a plain object from a PostCodeRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PostCodeRequest
     * @static
     * @param {PostCodeRequest} message PostCodeRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PostCodeRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.code = "";
        if (message.code != null && message.hasOwnProperty("code"))
            object.code = message.code;
        return object;
    };

    /**
     * Converts this PostCodeRequest to JSON.
     * @function toJSON
     * @memberof PostCodeRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PostCodeRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PostCodeRequest;
})();

export { $root as default };
