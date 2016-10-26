import VNode from '../../src/vnode/vnode';
import VText from '../../src/vnode/vtext';
import diff from '../../src/vtree/diff';
import createElement from '../../src/vdom/create-element';
import patch from '../../src/vdom/patch';


const createElementCustom = function(vnode) {
    const created = createElement(vnode);
    created.customCreation = true;
    return created;
}

function assertPachedNodeIsMarked(leftNode, rightNode) {
    const elementCustom = createElementCustom(leftNode);
    const patches = diff(leftNode, rightNode);
    const newRoot = patch(elementCustom, patches, {
        render: createElementCustom
    });

    return newRoot.childNodes[0].customCreation;
}


describe("patch-op-index", function() {
    it("overrided createElement is used on node insertion", () => {
        const leftNode = new VNode("div");
        const rightNode = new VNode("div", {}, [new VNode("div")]);

        expect(assertPachedNodeIsMarked(leftNode, rightNode)).to.equal(true);
    })

    it("overrided createElement is used for patching vnodes", () => {
        const leftNode = new VNode("div", {}, [new VNode("div")]);
        const rightNode = new VNode("div", {}, [new VNode("span")]);

        expect(assertPachedNodeIsMarked(leftNode, rightNode)).to.equal(true);
    })

    it("overrided createElement is used for patching text nodes", () => {
        const leftNode = new VNode("div", {}, [new VNode("div")]);
        const rightNode = new VNode("div", {}, [new VText("hello")]);

        expect(assertPachedNodeIsMarked(leftNode, rightNode)).to.equal(true);
    })

    it("overrided createElement is used for patching widget nodes", () => {
        const Widget = function() {};
        Widget.prototype.type = "Widget";
        Widget.prototype.init = function() {
            return document.createElement("div"); }
        Widget.prototype.update = function(previous, domNode) {
            return null; }
        Widget.prototype.destroy = function(domNode) {}

        const leftNode = new VNode("div", {}, [new VNode("div")]);
        const rightNode = new VNode("div", {}, [new Widget()]);

        expect(assertPachedNodeIsMarked(leftNode, rightNode)).to.equal(true);
    })
});
