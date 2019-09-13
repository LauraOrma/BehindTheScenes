import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function AllCastingsCards(props: any) {
    const classes = useStyles();
    let roleString: string = Number(props.rol) <= 1 ? 'role' : 'roles';
    let url: string = '/CastingId/' + props.id_casting;
    let fecha = new Date(props.dateadd);
    let options = {year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric'};
    return (
        <Card className="card {classes.card}">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    CASTING DE {props.category}
                </Typography>
                <Typography variant="h5" component="h2">
                    <Link to={url} className="castingname">{props.name}</Link>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.rol} {roleString}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {fecha.toLocaleDateString("es-ES", options)}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.city}, {props.country}
                </Typography>
            </CardContent>
        </Card>
    );
}