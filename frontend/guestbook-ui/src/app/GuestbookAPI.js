import axios from "axios"

axios.defaults.baseURL = "http://localhost:3002"

export const getNotes = (
    onSuccess = response => {},
    onFailure = error => {}
) => {
    axios
        .get("/notes")
        .then(function(response) {
            onSuccess(response)
        })
        .catch(function(error) {
            onFailure(error)
            console.log(error)
        })
}

export const postNote = (
    note,
    onSuccess = response => {},
    onFailure = error => {}
) => {
    console.log(note)
    axios
        .post("/notes", note)
        .then(function(response) {
            console.log(response)
            onSuccess(response)
        })
        .catch(function(error) {
            onFailure(error)
            console.log(error)
        })
}
