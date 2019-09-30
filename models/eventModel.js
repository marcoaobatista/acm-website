export default {
    fields: {
        title: {
            required: true
        },
        date: {
            required: true,
            regex: /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/g
        },
        location: {
            required: true
        },
        description: {
            required: true
        },
        image: {
            required: true,
            regex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/){1}[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
        }
    }
}