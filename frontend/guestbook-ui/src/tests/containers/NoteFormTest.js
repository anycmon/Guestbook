import React from "react"
import { shallow } from "enzyme"
import configureStore from "redux-mock-store"
import { NoteForm } from "../../app/containers/NoteForm"

describe("NoteForm", () => {
	const classes = {
		root: ""
	}
	const author = "Foobar"
	const message = "HI"
	let postNote = chai.spy(note => {})
	let updateMessage = chai.spy()
	let updateAuthor = chai.spy()

	const wrapper = shallow(
		<NoteForm
			classes={classes}
			author={author}
			message={message}
			postNote={postNote}
			updateMessage={updateMessage}
			updateAuthor={updateAuthor}
		/>
	)
	console.log(wrapper.debug())

	describe("TextField Author node", () => {
		const authorPaperNode = wrapper.find({
			label: "Author"
		})

		it("should be present", () => {
			expect(authorPaperNode).to.have.length(1)
		})

		it("should have value equal to provided author", () => {
			expect(authorPaperNode.prop("value")).to.be.equal(author)
		})
	})

	describe("TextField Note node", () => {
		const notePaperNode = wrapper.find({
			label: "Note"
		})

		it("should be present", () => {
			expect(notePaperNode).to.have.length(1)
		})

		it("should have value equal to provided message", () => {
			expect(notePaperNode.prop("value")).to.be.equal(message)
		})
	})

	describe("Button Submit node", () => {
		const buttonPaperNode = wrapper.find("WithStyles(Button)")

		it("should be present", () => {
			expect(buttonPaperNode).to.have.length(1)
		})

		it("should have value child 'Submit'", () => {
			expect(buttonPaperNode.contains("Submit")).to.be.true
		})

		it("should invoke postNote when is clicked", () => {
			//buttonPaperNode.simulate("click")
			expect(postNote).to.have.been.called()
		})
	})
})
