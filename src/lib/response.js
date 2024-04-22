export function response(message, data=null, success=true) {
    return { message, data, success: success };
}