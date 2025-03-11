import userData from '../mocks/userData.json';

export const getUserData = async (userId) => {
    return new Promise((resolve) => {
        if (userData.data && userData.data.id === parseInt(userId)) {
            resolve(userData.data);
        } else {
            resolve(null);
        }
    });
};