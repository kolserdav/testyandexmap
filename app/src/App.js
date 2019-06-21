/*
 * Клиентское приложение для поиска по организациям в Яндекс
 *
 * Главная функция приложения App монтирует на страницу компонент поиска 
 */
import React from 'react';
import './App.css';

// Components
import Search from './components/search.js'

// Глобальные стили приложения, для подключения классов из App.css
// В данный момент пусто, но пробовал - работает, добавляет свойства 
// класса из App.css в props дочерних элементов при передаче classes
const classes = {
	
}

function App() {
  return (
    <div className="App">
			<Search classes={classes}/>
    </div>
  );
}

export default App;
