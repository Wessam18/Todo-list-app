import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    return (
        <div className="header">
            <FontAwesomeIcon icon={faSquareCheck} /> My Todo-list
        </div>
    );
}
