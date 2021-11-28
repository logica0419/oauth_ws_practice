import * as $protobuf from "protobufjs";
/** Properties of a GetMeResponse. */
export interface IGetMeResponse {

    /** GetMeResponse name */
    name?: (string|null);
}

/** Represents a GetMeResponse. */
export class GetMeResponse implements IGetMeResponse {

    /**
     * Constructs a new GetMeResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGetMeResponse);

    /** GetMeResponse name. */
    public name: string;

    /**
     * Creates a new GetMeResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GetMeResponse instance
     */
    public static create(properties?: IGetMeResponse): GetMeResponse;

    /**
     * Encodes the specified GetMeResponse message. Does not implicitly {@link GetMeResponse.verify|verify} messages.
     * @param message GetMeResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGetMeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GetMeResponse message, length delimited. Does not implicitly {@link GetMeResponse.verify|verify} messages.
     * @param message GetMeResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGetMeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GetMeResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GetMeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GetMeResponse;

    /**
     * Decodes a GetMeResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GetMeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GetMeResponse;

    /**
     * Verifies a GetMeResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GetMeResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GetMeResponse
     */
    public static fromObject(object: { [k: string]: any }): GetMeResponse;

    /**
     * Creates a plain object from a GetMeResponse message. Also converts values to other types if specified.
     * @param message GetMeResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GetMeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GetMeResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
