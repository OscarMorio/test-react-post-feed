export const isNull = (input: unknown): input is null => {
    return typeof input !== 'undefined' && input == null
}