import React from "react"
import Grid from "material-ui/Grid"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Note from "./Note"

export const NoteList = ({ classes, notes }) => (
    <Grid container className={classes.root} spacing={24} direction="column">
        <Grid key="0" item />
        {notes.reverse().map((note, index) => {
            return (
                <Grid key={index} item>
                    <Note classes={classes} {...note} />
                </Grid>
            )
        })}
    </Grid>
)

NoteList.propTypes = {
    classes: PropTypes.object.isRequired,
    notes: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps)(NoteList)
