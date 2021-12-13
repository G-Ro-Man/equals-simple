export default function equals(a, b) {
  if (a === b) {
    return true;
  }
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    return a.every((el, i) => equals(el, b[i]));
  }

  if (
    typeof a === "object" &&
    typeof b === "object" &&
    a !== null &&
    b !== null &&
    !Array.isArray(a) &&
    !Array.isArray(b) &&
    Object.keys(a).length === Object.keys(b).length
  ) {
    const objectSymbolsA = Object.getOwnPropertySymbols(a);
    const objectSymbolsB = Object.getOwnPropertySymbols(b);
    if (Object.keys(a).length === 0) {
      return true;
    }

    if (objectSymbolsA.length !== objectSymbolsB.length) {
      return false;
    }
    for (let i = 0; i < Object.keys(a).length; i += 1) {
      if (
        !equals(Object.keys(a)[i], Object.keys(b)[i]) ||
        !equals(Object.values(a)[i], Object.values(b)[i])
      ) {
        return false;
      }
    }
    for (let i = 0; i < objectSymbolsA.length; i += 1) {
      if (
        !equals(objectSymbolsA[i], objectSymbolsB[i]) ||
        !equals(a[objectSymbolsA[i]], a[objectSymbolsB[i]])
      ) {
        return false;
      }
    }
    return true;
  }
  return false;
}
