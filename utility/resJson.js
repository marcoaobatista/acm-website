export default (statusCode, object) => {
    return {
        statusCode: statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object)
    };
}