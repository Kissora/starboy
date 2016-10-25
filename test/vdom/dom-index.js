
import VNode from "../../src/vnode/vnode";
import VText from "../../src/vnode/vtext";
import diff from "../../src/vtree/diff";
import createElement from '../../src/vdom/create-element';
import patch from '../../src/vdom/patch';

// import { mulitply, divide } from '../src/arithmetic';

// describe('mulitply', ()=> {
//   it('should mulitply two numbers', ()=> {
//     const value = mulitply(16, 16);
//     expect(value === 256);
//   });
// });

// describe('divide', ()=> {
//   it('should divide a by b', ()=> {
//     const value = divide(512, 8);
//     expect(value === 64);
//   });
// });



describe("dom-index", function () {
   it('Should equal right', ()=> {
    var leftThunk = {
        type: "Thunk",
        render: function () {
            return new VNode("div", {
                className:"test"
            }, [new VText("Left")])
        }
    }

    var rightThunk = {
        type: "Thunk",
        render: function () {
            return new VNode("div", {
                className: "test"
            }, [new VText("Right")])
        }
    }

    var root = createElement(leftThunk)
    var patches = diff(leftThunk, rightThunk)
    var newRoot = patch(root, patches)

    expect(newRoot.childNodes[0].data, "Right");
});
});