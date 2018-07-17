import guestBookReducer from "../../app/reducers/Guestbook"
import deepFreeze from "deep-freeze"
import {
	addNote,
	updateMessage,
	updateAuthor,
	loadNotes
} from "../../app/actions/Guestbook"

describe("guestBookReducer", () => {
	describe("ADD_NOTE", () => {
		let state = { notes: [] }
		const dispatchedNote = { author: "Foobar", message: "HI" }
		const action = addNote(dispatchedNote)
		deepFreeze(state)
		deepFreeze(action)
		const { notes } = guestBookReducer(state, action)

		it("should add note to notes", () => {
			expect(notes).to.have.lengthOf(1)
		})

		it("added note should be equal to dispatched note", () => {
			expect(notes[0]).to.deep.equal(dispatchedNote)
		})
	})

	describe("UPDATE_MSG", () => {
		let state = { message: "" }
		const dispatchedMessage = "HI"
		const action = updateMessage(dispatchedMessage)
		deepFreeze(state)
		deepFreeze(action)
		const { message } = guestBookReducer(state, action)

		it("message should be equal to dispatched message", () => {
			expect(message).to.be.equal(dispatchedMessage)
		})
	})

	describe("UPDATE_AUTHOR", () => {
		let state = { author: "" }
		const dispatchedAuthor = "Foobar"
		const action = updateAuthor(dispatchedAuthor)
		deepFreeze(state)
		deepFreeze(action)
		const { author } = guestBookReducer(state, action)

		it("author should be equal to dispatched author", () => {
			expect(author).to.be.equal(dispatchedAuthor)
		})
	})

	describe("LOAD_NOTES", () => {
		let state = { notes: [] }
		const dispatchedNotes = [
			{ author: "Foobar", message: "HI" },
			{ author: "Foobar", message: "HI" }
		]
		const action = loadNotes(dispatchedNotes)
		deepFreeze(state)
		deepFreeze(action)
		const { notes } = guestBookReducer(state, action)

		it("notes should be equal to loaded notes", () => {
			expect(notes).to.be.deep.equal(dispatchedNotes)
		})
	})
})
