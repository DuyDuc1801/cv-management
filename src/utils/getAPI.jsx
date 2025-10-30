export const getAPI = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}