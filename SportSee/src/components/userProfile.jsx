import React, { useState, useEffect } from 'react';
import { getUserData } from '../services/api';
import '../styles/components/userProfile.css';
/**
* Composant userProfile
* Affiche un message de félicitations pour l'utilisateur avec son prenom
*/
function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données 
    const fetchUserData = async () => {
      try {
        // Appel à l'API pour récupérer les données
        const data = await getUserData(userId);
        if (data) {
          setUserData(data);
        } else {
          setError('Utilisateur non trouvé');
        }
      } 
      catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } 
    };
    fetchUserData();
  }, [userId]);

  if (error) return <div className="error">{error}</div>;
  if (!userData) return <div className="error">Aucune donnée disponible</div>;
  return (
    <div className="user-profile">
      <h1>Bonjour <span className="user-name">{userData.userInfos.firstName}</span></h1>
      <p className="congratulation-message">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}
export default UserProfile;