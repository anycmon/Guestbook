import React from "react"
import Paper from "material-ui/Paper"
import PropTypes from "prop-types"
import Typography from "material-ui/Typography"
import Card, { CardContent, CardHeader } from "material-ui/Card"
import IconButton from "material-ui/IconButton"
import MoreVertIcon from "@material-ui/icons/MoreVert"

const Note = ({ id, author, message, createdAt, classes }) => (
    <Paper elevation={12}>
        <Card className={classes.card}>
            <CardHeader
                id={id}
                title={author}
                subheader={new Date(createdAt).toDateString()}
            />
            <CardContent>
                <Typography component="p">{message}</Typography>
            </CardContent>
        </Card>
    </Paper>
)

Note.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
}

export default Note
