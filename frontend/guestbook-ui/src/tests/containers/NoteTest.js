import React from "react"
import { shallow } from "enzyme"
import configureStore from "redux-mock-store"
import Note from "../../app/containers/Note"

describe("Note", () => {
	const props = {
		id: "1",
		author: "Foobar",
		message: "HI",
		createdAt: "2015-01-01",
		classes: {
			card: {}
		}
	}
	const wrapper = shallow(<Note {...props} />)

	describe("Paper node", () => {
		const paperNode = wrapper.find("WithStyles(Paper)")
		it("should be present", () => {
			expect(paperNode).to.have.length(1)
		})

		describe("Card node", () => {
			const cardNode = paperNode.find("WithStyles(Card)")
			it("should be present", () => {
				expect(cardNode).to.have.length(1)
			})

			describe("CardHeader node", () => {
				const cardHeader = cardNode.find("WithStyles(CardHeader)")
				cardHeader.prop("id")
				it("should be present", () => {
					expect(cardHeader).to.have.length(1)
				})

				it("should have id prop equal to provided", () => {
					expect(cardHeader.prop("id")).to.be.equal(props.id)
				})

				it("should have title prop equal to provided author", () => {
					expect(cardHeader.prop("title")).to.be.equal(props.author)
				})

				it("should have subheader prop equal to provided createdAt", () => {
					expect(cardHeader.prop("subheader")).to.be.equal(
						props.createdAt
					)
				})
			})

			describe("CardContent node", () => {
				const cardContent = cardNode.find("WithStyles(CardContent)")
				it("should be present", () => {
					expect(cardContent).to.have.length(1)
				})

				describe("Typography node", () => {
					const typographyNode = cardContent.find(
						"WithStyles(Typography)"
					)
					it("should be present", () => {
						expect(typographyNode).to.have.length(1)
					})

					it("should have message as child node", () => {
						expect(typographyNode.contains(props.message)).to.be
							.true
					})
				})
			})
		})
	})
})
