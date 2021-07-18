import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    footer: {
        minHeight: '60px',
        padding: "5px 0",
        marginTop: '50px',
        boxShadow: '0 0 3px 2px rgba(132, 140, 142, 0.5)',
        textAlign: 'center',
        color: '#848C8E',
        lineHeight: '2rem'
    },
}));

export default function Footer() {
    const classes = useStyles();
    return(
        <div className={classes.footer}>
            <div>
            {'© '}
            {new Date().getFullYear()}
            {' Rick and Morty'}               
            </div>
        </div>
    )
}