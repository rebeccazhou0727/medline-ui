const onRequest = async (url='', data={}, headers={}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(data)
    })
    const responseData = await response.json();
    return responseData; 
}

export default onRequest;