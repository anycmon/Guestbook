import React from "react"
import { shallow } from "enzyme"
import configureStore from "redux-mock-store"
import NoteList from "../../app/containers/NoteList"

describe("NoteList", () => {
	const classes = {
		root: {}
	}
	const initialState = {
		notes: [
			{
				id: "1",
				author: "foobar",
				message: "HI",
				createdAt: "2015-01-01"
			},
			{
				id: "1",
				author: "foobar",
				message: "HI",
				createdAt: "2015-01-01"
			}
		]
	}

	let mockStore = configureStore()
	let store = mockStore(initialState)
	const wrapper = shallow(<NoteList store={store} classes={classes} />)

	describe("Grid container node", () => {
		const a = wrapper.dive()
		const gridContainerNode = a.find("[container]")

		it("should be present", () => {
			expect(gridContainerNode).to.have.length(1)
		})

		describe("Grid item nodes", () => {
			const gridKeyNodes = gridContainerNode.find("[item]")
			it("should be present and equal to count of notes", () => {
				expect(gridKeyNodes).to.have.length(
					initialState.notes.length + 1
				)
			})
		})
	})
})
