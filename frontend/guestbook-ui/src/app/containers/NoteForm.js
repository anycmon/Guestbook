import React from "react"
import Paper from "material-ui/Paper"
import TextField from "material-ui/TextField"
import Button from "material-ui/Button"
import { connect } from "react-redux"
import { addNote, updateMessage, updateAuthor } from "../actions/Guestbook"
import { postNote } from "../GuestbookAPI"

const style = {
    root: {
        flexGrow: 1
    },
    card: {},
    textAlign: "center",
    display: "flex"
}

export class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.onSubmit = this.onSubmit.bind(this)
        this.noteChanged = this.noteChanged.bind(this)
        this.authorChanged = this.authorChanged.bind(this)
        this.isInitAuthorRender = true
        this.isInitMessageRender = true
    }

    onSubmit() {
        this.props.postNote({
            author: this.props.author,
            message: this.props.message
        })
        this.props.updateMessage("")
        this.props.updateAuthor("")
        this.isInitAuthorRender = true
        this.isInitMessageRender = true
    }
    componentDidMount() {}

    noteChanged(event) {
        this.props.updateMessage(event.target.value)
        this.isInitMessageRender = false
    }

    authorChanged(event) {
        this.props.updateAuthor(event.target.value)
        this.isInitAuthorRender = false
    }

    render() {
        const {
            authorChanged,
            noteChanged,
            onSubmit,
            isInitAuthorRender,
            isInitMessageRender
        } = this
        const { author, message, classes } = this.props
        const isAuthorEmpty =
            !isInitAuthorRender && author === "" ? true : false
        const isNoteEmpty =
            !isInitMessageRender && message === "" ? true : false

        const buttonDisabled =
            isInitMessageRender ||
            isInitAuthorRender ||
            (isNoteEmpty || isAuthorEmpty)
        const noteHelperText = isNoteEmpty ? "Note is empty" : ""
        const authorHelperText = isAuthorEmpty ? "Author is empty" : ""

        return (
            <div>
                <Paper style={style}>
                    <TextField
                        helperText={authorHelperText}
                        error={isAuthorEmpty}
                        label="Author"
                        value={author}
                        onChange={authorChanged}
                        multiline={true}
                        fullWidth={true}
                    />
                </Paper>
                <Paper style={style}>
                    <TextField
                        helperText={noteHelperText}
                        error={isNoteEmpty}
                        label="Note"
                        value={message}
                        onChange={noteChanged}
                        multiline={true}
                        fullWidth={true}
                    />
                </Paper>
                <Paper style={style}>
                    <Button
                        disabled={buttonDisabled}
                        fullWidth={true}
                        variant="raised"
                        color="secondary"
                        className={classes.button}
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        author: state.author,
        message: state.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postNote: note => {
            postNote(note, response => dispatch(addNote(response.data)))
        },
        updateMessage: message => {
            dispatch(updateMessage(message))
        },
        updateAuthor: author => {
            dispatch(updateAuthor(author))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm)
