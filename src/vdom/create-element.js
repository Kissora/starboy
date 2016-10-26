// import doc from './global/document';
import applyProperties from './apply-properties';
import { isVirtualNode }  from '../utilities/conditions';
import { isVirtualText }  from '../utilities/conditions';
import { isWidget } from '../utilities/conditions';
import handleThunk  from '../vnode/handle-thunk';

export default function createElement(vnode, opts) {
    // var doc = opts ? opts.document || document : doc
    var doc = document;
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVirtualText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVirtualNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}
