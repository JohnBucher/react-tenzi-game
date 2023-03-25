import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import './Contact.css';

export default function Contact() {
    return (
        <div className='contact-container'>
            <div className='name'>John Bucher</div>
            <div className='links'>
                <a className='icon' href='https://github.com/JohnBucher/react-tenzi-game' title='GitHub Repository'
                    target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
            </div>
        </div>
    )
}