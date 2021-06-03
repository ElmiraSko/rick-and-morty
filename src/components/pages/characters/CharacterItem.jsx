import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
    //   paddingTop: '56.25%', // 16:9
      paddingTop: '86%', // 16:9
    },
    link: {
      textDecoration: 'none',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: 'black',
    }
  }));
  
    
export default function CharacterItem(props) {
    
    const classes = useStyles();
    const characterItem = props.itemValues
    
        return (
          <Card className={classes.root}>
            <CardHeader
              title={characterItem.name}
              subheader={characterItem.species}
            />
            <Link
                className={classes.link}
                to={`/character-item?id=${characterItem.id}`}
                >
                <CardMedia
                  className={classes.media}
                  image={characterItem.image}
                  title={characterItem.name}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {characterItem.location.name}
                  </Typography>
                </CardContent>
            </Link>
          </Card>
        );
}