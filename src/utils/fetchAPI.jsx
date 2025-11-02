export const getAPI = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}

export const postAPI = async (api, data) => {
    const response = await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}