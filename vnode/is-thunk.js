export default function isThunk(t) {
    return t && t.type === "Thunk"
}
