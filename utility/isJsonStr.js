export default (str) => {
    try {
        JSON.parse(str);
    } catch(err) {
        return false;
    }
    return true;
}