export default {
    fields: {
        name: {
            required: true
        },
        title: {
            required: true
        },
        image: {
            required: true,
            regex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/){1}[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
        }
    }
}