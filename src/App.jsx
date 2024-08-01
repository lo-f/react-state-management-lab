import { useState, useEffect } from 'react';
import FighterAttributes from './components/fighterAttributes/FighterAttributes.jsx'
import './App.css';
import TeamMember from './components/team/Team.jsx';


const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [teamStrength, setTeamStrength] = useState(0);
  const [teamAgility, setTeamAgility] = useState(0);
  const [zombieFighters, setZombieFighters] = useState(
    [
      {
        name: 'Survivor',
        price: 12,
        strength: 6,
        agility: 4,
        img: 'https://via.placeholder.com/150/92c952',
      },
      {
        name: 'Scavenger',
        price: 10,
        strength: 5,
        agility: 5,
        img: 'https://via.placeholder.com/150/771796',
      },
      {
        name: 'Shadow',
        price: 18,
        strength: 7,
        agility: 8,
        img: 'https://via.placeholder.com/150/24f355',
      },
      {
        name: 'Tracker',
        price: 14,
        strength: 7,
        agility: 6,
        img: 'https://via.placeholder.com/150/d32776',
      },
      {
        name: 'Sharpshooter',
        price: 20,
        strength: 6,
        agility: 8,
        img: 'https://via.placeholder.com/150/1ee8a4',
      },
      {
        name: 'Medic',
        price: 15,
        strength: 5,
        agility: 7,
        img: 'https://via.placeholder.com/150/66b7d2',
      },
      {
        name: 'Engineer',
        price: 16,
        strength: 6,
        agility: 5,
        img: 'https://via.placeholder.com/150/56acb2',
      },
      {
        name: 'Brawler',
        price: 11,
        strength: 8,
        agility: 3,
        img: 'https://via.placeholder.com/150/8985dc',
      },
      {
        name: 'Infiltrator',
        price: 17,
        strength: 5,
        agility: 9,
        img: 'https://via.placeholder.com/150/392537',
      },
      {
        name: 'Leader',
        price: 22,
        strength: 7,
        agility: 6,
        img: 'https://via.placeholder.com/150/602b9e',
      },
    ]
  );
  
  const calculateTeamStrength = (team) => {
    return team.reduce((total, fighter) => total + fighter.strength, 0);
  };

  const calculateTeamAgility = (team) => {
    return team.reduce((total, fighter) => total + fighter.agility, 0)
  };

  const handleAddFighter = (addFighter) => {
    if (money >= addFighter.price) {
      setTeam((team) => [...team, addFighter]);
      setMoney((money) => money - addFighter.price);
      setTeamStrength(calculateTeamStrength(team));
      setTeamAgility(calculateTeamAgility(team));
    } else {
      console.log("Sorry. Not enough money.")
    }
  };

  const handleRemoveFighter = (removeFighter) => {
    const newTeam = team.filter((fighter) => fighter !== removeFighter);
    setTeam(newTeam);
    setMoney((money) => money + removeFighter.price);
    setTeamStrength(calculateTeamStrength(newTeam));
  };

  useEffect(() => {
    setTeamStrength(calculateTeamStrength(team));
  }, [team]);

  useEffect(() => {
    setTeamAgility(calculateTeamAgility(team));
  })


  return (
    <>
      <h1>Zombie Fighters</h1>
      <h2>Team Strength: {teamStrength}</h2>
      <h2>Team Agility: {teamAgility}</h2>
      <h2>Money: ${money}</h2>
      <h2>Team</h2>
      {team.length === 0 ? (
        <p>Pick some team members!</p>
      ) : (
        <TeamMember team={team} handleRemoveFighter={handleRemoveFighter}/>
      )}

      <h2>Recruit Fighters</h2>
      <ul>
        {zombieFighters.map((attributes, index) => (
          <FighterAttributes
            key={index}
            {...attributes}
            handleAddFighter={() => handleAddFighter(attributes)}
          />
        ))}
      </ul>
    </>
  );
};

export default App
