import diffProps from '../../src/vtree/diff-props';

describe('diff-props', () => {
    it("add attributes to empty attributes", () => {
        const propsA = {
          attributes : {}
        }
        const propsB = {
            attributes : {
                class : "standard",
                "e-text" : "custom"
            }
        }
        const diff = diffProps(propsA,propsB)

        expect(diff.attributes.class).to.equal('standard');
        expect(diff.attributes['e-text']).to.equal('custom');
    })
});
