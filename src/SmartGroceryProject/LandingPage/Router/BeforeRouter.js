import Start_Router from './MainRouter';
import { ThemeContext } from '../components/Contexts/ThemeContext';
import React from 'react';
import { useState } from 'react';
import { PredectionsContext } from '../components/Contexts/PredectionsContext';


export default function BeforeRouter() {
    
    const [darkState, setDarkState] = useState(true);//initial value set for dark mode ,dark mode on
    const [predectionname, setPredectionName] = useState(false);

    return (

        <PredectionsContext.Provider value={{ predectionname, setPredectionName }}>
            <ThemeContext.Provider value={{ darkState, setDarkState }}>

                <Start_Router></Start_Router>

            </ThemeContext.Provider>
        </PredectionsContext.Provider>



    );
}