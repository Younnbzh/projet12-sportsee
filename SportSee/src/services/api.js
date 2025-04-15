/**
* Service API pour récupérer les données utilisateur
*/
// Base URL de l'API
const API_BASE_URL = 'http://localhost:3000';
// Flag pour basculer entre mock et API réelle - mettre à true pour utiliser les données mockées
const USE_MOCKED_DATA = true; 

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
    if (USE_MOCKED_DATA) {
        try {
            // Import dynamique basé sur l'ID utilisateur
            const userDataModule = await import(`../mocks/${userId}/userData.json`);
            return userDataModule.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            return null;
        }
    } else {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${userId}`);
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des données: ${response.status}`);
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            return null;
        }
    }
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
    if (USE_MOCKED_DATA) {
        try {
            // Import dynamique basé sur l'ID utilisateur
            const userActivity = await import(`../mocks/${userId}/activity.json`);
            return userActivity.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            return null;
        }
    } else {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des données: ${response.status}`);
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            return null;
        }
    }
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
    if (USE_MOCKED_DATA) {
        try {
            // Import dynamique basé sur l'ID utilisateur
            const userAverage = await import(`../mocks/${userId}/average-sessions.json`);
            return userAverage.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            return null;
        }
    } else {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`);
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des données: ${response.status}`);
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            return null;
        }
    }
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
    if (USE_MOCKED_DATA) {
        try {
            // Import dynamique basé sur l'ID utilisateur
            const userPerformance = await import(`../mocks/${userId}/performance.json`);
            return userPerformance.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            return null;
        }
    } else {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${userId}/performance`);
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des données: ${response.status}`);
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            return null;
        }
    }
};