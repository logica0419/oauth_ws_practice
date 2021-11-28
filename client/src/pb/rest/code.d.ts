import * as $protobuf from "protobufjs";
/** Properties of a PostCodeRequest. */
export interface IPostCodeRequest {

    /** PostCodeRequest code */
    code?: (string|null);
}

/** Represents a PostCodeRequest. */
export class PostCodeRequest implements IPostCodeRequest {

    /**
     * Constructs a new PostCodeRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPostCodeRequest);

    /** PostCodeRequest code. */
    public code: string;

    /**
     * Creates a new PostCodeRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PostCodeRequest instance
     */
    public static create(properties?: IPostCodeRequest): PostCodeRequest;

    /**
     * Encodes the specified PostCodeRequest message. Does not implicitly {@link PostCodeRequest.verify|verify} messages.
     * @param message PostCodeRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPostCodeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PostCodeRequest message, length delimited. Does not implicitly {@link PostCodeRequest.verify|verify} messages.
     * @param message PostCodeRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPostCodeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PostCodeRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PostCodeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PostCodeRequest;

    /**
     * Decodes a PostCodeRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PostCodeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PostCodeRequest;

    /**
     * Verifies a PostCodeRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PostCodeRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PostCodeRequest
     */
    public static fromObject(object: { [k: string]: any }): PostCodeRequest;

    /**
     * Creates a plain object from a PostCodeRequest message. Also converts values to other types if specified.
     * @param message PostCodeRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PostCodeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PostCodeRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
