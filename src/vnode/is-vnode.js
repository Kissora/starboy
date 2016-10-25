import version from './version';

export default function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}
