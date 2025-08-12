async function base64ToBuffer(base64: string): Promise<Buffer> {
    if (typeof base64 !== 'string') throw new Error('Invalid base64s');
    return Buffer.from(base64, 'base64');
}

export { base64ToBuffer };
