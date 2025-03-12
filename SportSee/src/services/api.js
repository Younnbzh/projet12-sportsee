import userData from '../mocks/userData.json';
import activityData from '../mocks/activity.json';
import averageData from '../mocks/average-sessions.json';

export const getUserData = async (userId) => {
    return new Promise((resolve) => {
        if (userData.data && userData.data.id === parseInt(userId)) {
            resolve(userData.data);
        } else {
            resolve(null);
        }
    });
};

export const getUserActivity = async (userId) => {
    return new Promise((resolve) => {
        if (activityData.data && activityData.data.userId === parseInt(userId)) {
            resolve(activityData.data);
        } else {
            resolve(null);
        }
    });
};

export const getUserInfos = async (userId) => {
    return getUserData(userId);
};

export const getUserAverage = async (userId) => {
    return new Promise((resolve) => {
        if (averageData.data && averageData.data.userId === parseInt(userId)) {
            resolve(averageData.data);
        } else {
            resolve(null);
        }
    });
};