import VNode from "../../src/vnode/vnode";
import VText from "../../src/vnode/vtext";
import diff from "../../src/vtree/diff";
import createElement from '../../src/vdom/create-element';
import patch from '../../src/vdom/patch';

describe("dom-index", function() {
	it('Should equal right', () => {
		const leftThunk = {
			type: "Thunk",
			render: function() {
				return new VNode("div", {
					className: "test"
				}, [new VText("Left")])
			}
		}

		const rightThunk = {
			type: "Thunk",
			render: function() {
				return new VNode("div", {
					className: "test"
				}, [new VText("Right")])
			}
		}

		const root = createElement(leftThunk)
		const patches = diff(leftThunk, rightThunk)
		const newRoot = patch(root, patches)

		expect(newRoot.childNodes[0].data).to.equal('Right');
	});
});
