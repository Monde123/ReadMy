const ENTITY = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

export function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (char) => ENTITY[char]);
}

export function assertWellFormedXml(source) {
  if (typeof source !== "string" || source.trim() === "") {
    return ["XML_EMPTY"];
  }
  if (source.includes("<!DOCTYPE") || /<script[\s>]/i.test(source) || /<foreignObject[\s>]/i.test(source)) {
    return ["XML_FORBIDDEN"];
  }
  const withoutDecl = source.replace(/<\?xml[^?]*\?>/, "");
  const tokens = withoutDecl.match(/<!--[\s\S]*?-->|<\/?[^>]+>/g);
  if (!tokens) return ["XML_NO_TAGS"];
  const stack = [];
  for (const token of tokens) {
    if (token.startsWith("<!--")) continue;
    const closing = token.startsWith("</");
    const name = token.replace(/^<\/?/, "").replace(/[\s/>].*$/, "").replace(/\/?>$/, "");
    if (!/^[A-Za-z_][\w.-]*$/.test(name)) return ["XML_INVALID_NAME"];
    const selfClosing = /\/>$/.test(token);
    if (closing) {
      if (stack.pop() !== name) return ["XML_UNCLOSED_TAG"];
    } else if (!selfClosing) {
      stack.push(name);
    }
  }
  if (stack.length !== 0) return ["XML_UNCLOSED_TAG"];
  if (!source.includes('xmlns="http://www.w3.org/2000/svg"')) return ["XML_MISSING_XMLNS"];
  if (!/<title>[\s\S]*<\/title>/.test(source)) return ["XML_MISSING_TITLE"];
  return [];
}
