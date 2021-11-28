import * as $protobuf from "protobufjs";
/** Properties of a GetRedirectResponse. */
export interface IGetRedirectResponse {

    /** GetRedirectResponse redirectUri */
    redirectUri?: (string|null);
}

/** Represents a GetRedirectResponse. */
export class GetRedirectResponse implements IGetRedirectResponse {

    /**
     * Constructs a new GetRedirectResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGetRedirectResponse);

    /** GetRedirectResponse redirectUri. */
    public redirectUri: string;

    /**
     * Creates a new GetRedirectResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GetRedirectResponse instance
     */
    public static create(properties?: IGetRedirectResponse): GetRedirectResponse;

    /**
     * Encodes the specified GetRedirectResponse message. Does not implicitly {@link GetRedirectResponse.verify|verify} messages.
     * @param message GetRedirectResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGetRedirectResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GetRedirectResponse message, length delimited. Does not implicitly {@link GetRedirectResponse.verify|verify} messages.
     * @param message GetRedirectResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGetRedirectResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GetRedirectResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GetRedirectResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GetRedirectResponse;

    /**
     * Decodes a GetRedirectResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GetRedirectResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GetRedirectResponse;

    /**
     * Verifies a GetRedirectResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GetRedirectResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GetRedirectResponse
     */
    public static fromObject(object: { [k: string]: any }): GetRedirectResponse;

    /**
     * Creates a plain object from a GetRedirectResponse message. Also converts values to other types if specified.
     * @param message GetRedirectResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GetRedirectResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GetRedirectResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
