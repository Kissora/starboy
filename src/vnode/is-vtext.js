import version from './version';

export default function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}
