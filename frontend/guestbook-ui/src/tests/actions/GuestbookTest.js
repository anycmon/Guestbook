import {
	addNote,
	updateMessage,
	updateAuthor,
	loadNotes
} from "../../app/actions/Guestbook"
import * as Const from "../../app/actions/Const"
describe("action creator", () => {
	describe("addNote", () => {
		const data = { author: "foobar", message: "Hi" }

		it("should return action with type of ADD_NOTE", () => {
			const action = addNote(data)
			expect(action.type).to.be.equal(Const.ADD_NOTE)
		})

		it("should return action with data equal to provided", () => {
			const action = addNote(data)
			expect(action.data).to.be.equal(data)
		})
	})

	describe("updateMessage", () => {
		const message = "Hi"

		it("should return action with type of UPDATE_MSG", () => {
			const action = updateMessage(message)
			expect(action.type).to.be.equal(Const.UPDATE_MSG)
		})

		it("should return action with message equal to provided", () => {
			const action = updateMessage(message)
			expect(action.message).to.be.equal(message)
		})
	})

	describe("updateAuthor", () => {
		const author = "foobar"

		it("should return action with type of UPDATE_AUTHOR", () => {
			const action = updateAuthor(author)
			expect(action.type).to.be.equal(Const.UPDATE_AUTHOR)
		})

		it("should return action with author equal to provided", () => {
			const action = updateAuthor(author)
			expect(action.author).to.be.equal(author)
		})
	})

	describe("loadNotes", () => {
		const notes = [
			{ author: "foobar", message: "HI" },
			{ author: "foobar", message: "HI" }
		]

		it("should return action with type of LOAD_NOTES", () => {
			const action = loadNotes(notes)
			expect(action.type).to.be.equal(Const.LOAD_NOTES)
		})

		it("should return action with notes equal to provided", () => {
			const action = loadNotes(notes)
			expect(action.notes).to.be.equal(notes)
		})
	})
})
