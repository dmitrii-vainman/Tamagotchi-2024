import React, { useState, useEffect } from 'react';

const VirtualPet = ({hunger, setHunger}) => {

    useEffect(() => {
        const interval = setInterval(() => {
            setHunger(prevHunger => Math.max(prevHunger - 1, 0)); 
        }, 1000); // 1 Sekunde //dummy mäßig erstmal 1 sek -> später 60sek

        return () => clearInterval(interval); // Aufräumen
    }, []);

   
    const food1 = () => {
        setHunger(prevHunger => Math.min(prevHunger + 5, 100)); 
    };
    const food2 = () => {
        setHunger(prevHunger => Math.min(prevHunger + 10, 100));
    };
    const food3 = () => {
        setHunger(prevHunger => Math.min(prevHunger + 15, 100));
    };

//Buttons sind erst einmal Prototypen
    return (
        <div>
            <button className='food1' onClick={food1} disabled={hunger === 100}>{hunger === 100 ? "Voll" : "🥩"}</button> {}
            <button className='food2' onClick={food2} disabled={hunger === 100}>{hunger === 100 ? "Voll" : "🍗"}</button> {}
            <button className='food3' onClick={food3} disabled={hunger === 100}>{hunger === 100 ? "Voll" : "🍖"}</button> {}
        </div>
    );
};

export default VirtualPet;