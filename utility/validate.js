export default (item, model, errors) => {    
    const fields = model.fields;
    
    for (let field in fields) {
        if (fields.hasOwnProperty(field)) {

            if (fields[field].required && (item[field] === undefined || item[field] === '')) {
                errors[field] = `${field} is required`;
            }

            if (fields[field].regex && (item[field] !== undefined)) {
                if (!(new RegExp(fields[field].regex).test(item[field]))) {
                    console.log('REGEX:', fields[field].regex)
                
                    console.log(item[field], !fields[field].regex.test(item[field]));
                    
                    errors[field] = `${field} is invalid`;
                }
                
            }
            
            if (fields[field].min && (item[field] !== undefined)) {
                if (item[field] < fields[field].min)
                    errors[field] = `${field} must be at least ${fields[field].min} characters long`;
            }

            if (fields[field].max && (item[field] !== undefined)) {
                if ((item[field] > fields[field].max))
                    errors[field] = `${field} can not be over ${fields[field].max} characters long`;
            }
        }
    }
    return;
}