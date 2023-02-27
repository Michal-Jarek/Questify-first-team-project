import React from 'react';
import { ReactComponent as ArrowIcon } from '../images/arrow.svg';
import { ReactComponent as StarIcon } from '../images/star.svg';
import { ReactComponent as TrophyIcon } from '../images/trophy.svg'
import { DifficultyBar, DifficultySelect } from './Header.styled';

export const Header = ({ onClick, difficulty, cardType }) => {
    return (
        <DifficultyBar cardType={cardType}>
            <DifficultySelect
                onClick={onClick}
                difficulty={difficulty}
            >
                <p>{difficulty}</p>
                <ArrowIcon />
            </DifficultySelect>
            {cardType === 'Challenge' ? <TrophyIcon /> : <StarIcon />}
        </DifficultyBar>
    );
};