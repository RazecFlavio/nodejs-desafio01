export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((acc, item) => {
        const [key, value] = item.split('=')

        acc[key] = value;
        return acc;
    }, {})
}