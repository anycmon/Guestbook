import React from "react"
import { shallow } from "enzyme"
import configureStore from "redux-mock-store"
import { App } from "../../app/containers/App"

describe("App", () => {
	const classes = {
		root: ""
	}
	const initialState = {
		classes: classes,
		loadNotes: notes => {}
	}
	let mockStore = configureStore()
	let store = mockStore(initialState)
	const appComponent = shallow(
		<App
			store={store}
			classes={classes}
			loadNotes={initialState.loadNotes}
		/>
	)

	console.log(appComponent.name())
	describe("MuiThemeProvider node", () => {
		const muiThemeProvider = appComponent.find("MuiThemeProvider")
		it("should be present", () => {
			expect(muiThemeProvider).to.have.length(1)
		})

		describe("AppBar  node", () => {
			const appBarNode = muiThemeProvider.find("WithStyles(AppBar)")

			it("should be present", () => {
				expect(appBarNode).to.have.length(1)
			})

			describe("Toolbar node", () => {
				const toolbarNode = appBarNode.find("WithStyles(Toolbar)")

				it("should be present", () => {
					expect(toolbarNode).to.have.length(1)
				})

				describe("Typography node", () => {
					const typographyNode = toolbarNode.find(
						"WithStyles(Typography)"
					)

					it("should be present", () => {
						expect(typographyNode).to.have.length(1)
					})

					it("should have 'Guestbook' as child", () => {
						expect(typographyNode.contains("Guestbook")).to.be.true
					})
				})
			})
		})

		describe("Grid container node", () => {
			const gridContainer = muiThemeProvider.find({
				container: true,
				direction: "column"
			})

			it("should be present", () => {
				expect(gridContainer).to.have.length(1)
			})

			describe("NoteForm node", () => {
				const noteFormNode = gridContainer.find("Connect(NoteForm)")

				it("should be present", () => {
					expect(noteFormNode).to.have.length(1)
				})
			})

			describe("NoteListNode", () => {
				const noteListNode = gridContainer.find("Connect(NoteList)")

				it("should be present", () => {
					expect(noteListNode).to.have.length(1)
				})
			})
		})
	})
})
