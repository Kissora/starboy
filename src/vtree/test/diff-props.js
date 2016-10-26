var test = require("tape")
var diffProps = require("../diff-props")

describe('diff-props', () => {
    test("add attributes to empty attributes", () => {
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
