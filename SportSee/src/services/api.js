import userData from '../mocks/userData.json';
import activityData from '../mocks/activity.json';
import averageData from '../mocks/average-sessions.json';
import performanceData from '../mocks/performance.json';
/**
* Service API pour récupérer les données utilisateur
*/

/* getUserData : Données générales utilisateur
{
   "data":{
      "id":18,
      "userInfos":{
         "firstName":"Prenom",
         "lastName":"Nom",
         "age":34
      },
      "score":0.3,
      "keyData":{
         "calorieCount":2500,
         "proteinCount":90,
         "carbohydrateCount":150,
         "lipidCount":120
      }
   }
}
*/
export const getUserData = async (userId) => {
    return new Promise((resolve) => {
        if (userData.data && userData.data.id === parseInt(userId)) {
            resolve(userData.data);
        } else {
            resolve(null);
        }
    });
};
/* getUserActivity : Données activité utilisateur
{
   "data":{
      "userId":18,
      "sessions":[
         {
            "day":"2020-07-01",
            "kilogram":70,
            "calories":240
         },
         {
            "day":"2020-07-02",
            "kilogram":69,
            "calories":220
         },
         ...
      ]
   }
}
*/
export const getUserActivity = async (userId) => {
    return new Promise((resolve) => {
        if (activityData.data && activityData.data.userId === parseInt(userId)) {
            resolve(activityData.data);
        } else {
            resolve(null);
        }
    });
};
/* getUserAverage : Durée des sessions sur une semaine
{
   "data":{
      "userId":18,
      "sessions":[
         {
            "day":1,
            "sessionLength":30
         },
         {
            "day":2,
            "sessionLength":40
         },
         ...
   }
}
*/
export const getUserAverage = async (userId) => {
    return new Promise((resolve) => {
        if (averageData.data && averageData.data.userId === parseInt(userId)) {
            resolve(averageData.data);
        } else {
            resolve(null);
        }
    });
};
/* getUserActivityType : performance par type de statistique
{
   "data":{
      "userId":18,
      "kind":{
         "1":"cardio",
         "2":"energy",
         "3":"endurance",
         "4":"strength",
         "5":"speed",
         "6":"intensity"
      },
      "data":[
         {
            "value":200,
            "kind":1
         },
         {
            "value":240,
            "kind":2
         },
         ....
      ]
   }
}
*/
export const getUserActivityType = async (userId) => {
    return new Promise((resolve) => {
        if (performanceData.data && performanceData.data.userId === parseInt(userId)) {
            resolve(performanceData.data);
        } else {
            resolve(null);
        }
    });
};