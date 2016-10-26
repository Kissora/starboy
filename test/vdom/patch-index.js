import VNode from '../../src/vnode/vnode';
import VText from '../../src/vnode/vtext';
import diff from '../../src/vtree/diff';
import createElement from '../../src/vdom/create-element';
import patch from '../../src/vdom/patch';

describe("patch-index", function() {
    it('overrided patch function is correctly used and received correct options', () => {
        function patchCustom(rootNode, patches, renderOptions) {
            return {
                rootNode: rootNode,
                patches: patches,
                renderOptions: renderOptions
            }
        }

        function createElementCustom(vnode) {}

        const rootNode = new VNode("div")
        const patches = {}
        const renderOptions = { patch: patchCustom, render: createElementCustom }
        const result = patch(rootNode, patches, renderOptions)
        
        expect(result.rootNode).to.equal(rootNode)
        expect(result.patches).to.equal(patches)
        expect(result.renderOptions).to.equal(renderOptions)
    })
})
