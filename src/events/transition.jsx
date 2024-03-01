import React, { useState } from 'react';

import { CSSTransition } from 'react-transition-group';

const App = () => {

const [isVisible, setIsVisible] = useState(false);

const handleButtonClick = () => {

setIsVisible(!isVisible);

};

return (

<>

<button onClick={handleButtonClick}>Toggle Div</button>

<CSSTransition in={isVisible} timeout={1000} classNames="fade">

<div>Hello, World!</div>

</CSSTransition>

</>

);

};

export default App;