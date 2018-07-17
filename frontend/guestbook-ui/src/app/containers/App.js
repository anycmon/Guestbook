import React from "react"
import Grid from "material-ui/Grid"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Typography from "material-ui/Typography"
import { connect } from "react-redux"
import { loadNotes } from "../actions/Guestbook"
import NoteList from "./NoteList"
import NoteForm from "./NoteForm"
import { getNotes } from "../GuestbookAPI"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles"

const style = {
    root: {
        flexGrow: 1
    },
    card: {},
    textAlign: "center",
    display: "flex"
}

const theme = createMuiTheme()

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    componentDidMount() {}

    render() {
        const { classes } = this.props
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <AppBar color="secondary" position="static">
                        <Toolbar>
                            <Typography
                                variant="title"
                                color="inherit"
                                className={classes.flex}
                            >
                                Guestbook
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid container className={classes.root} spacing={24}>
                        <Grid item xs={8} sm={4} />
                        <Grid item xs={8} sm={4}>
                            <Grid
                                container
                                className={classes.root}
                                spacing={24}
                                direction="column"
                            >
                                <Grid item xs={12} sm={12} />
                                <Grid item xs={12} sm={12}>
                                    <NoteForm classes={classes} />
                                    <NoteList classes={classes} />
                                    <Grid item xs={12} sm={12} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadNotes: getNotes(response => {
            dispatch(loadNotes(response.data))
        })
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(style)(connect(null, mapDispatchToProps)(App))
