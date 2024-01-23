import React from 'react'

import PropTypes from 'prop-types';

const Header = ({characters}) => {

  const renderCharacters = () => {
    if(characters.length !== 0){
        return(
          <ul>
            {characters.map( character => <li key={character.id}> {character.name} </li>)}
          </ul>
        )
    }
    return
  }

  return (
    <div>
        <h1>Find</h1>
        <div>
           {
            renderCharacters()
           }
        </div>
    </div>
  )
}

Header.propTypes = {
    characters: PropTypes.array,
};

Header.defaultProps = {
    characters: [],
  };

export default Header