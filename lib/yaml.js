import { fail } from "./errors.js";

function isBlank(line) {
  const trimmed = line.trim();
  return trimmed === "" || trimmed.startsWith("#");
}

function leading(line) {
  let count = 0;
  while (line[count] === " ") count += 1;
  return count;
}

function nextNonBlank(lines, index) {
  let cursor = index;
  while (cursor < lines.length && isBlank(lines[cursor].line)) cursor += 1;
  return cursor;
}

function assertCommentTail(rest, lineNo) {
  const trimmed = rest.trim();
  if (trimmed === "" || trimmed.startsWith("#")) return;
  fail("YAML_STRUCTURE", `trailing content after value, line ${lineNo}`);
}

function readDouble(source, lineNo) {
  let value = "";
  let index = 1;
  while (index < source.length) {
    const char = source[index];
    if (char === "\\") {
      const next = source[index + 1];
      if (next !== '"' && next !== "\\") {
        fail("YAML_STRUCTURE", `unsupported escape sequence, line ${lineNo}`);
      }
      value += next;
      index += 2;
      continue;
    }
    if (char === '"') {
      return { value, rest: source.slice(index + 1) };
    }
    value += char;
    index += 1;
  }
  fail("YAML_STRUCTURE", `unclosed double quote, line ${lineNo}`);
}

function readSingle(source, lineNo) {
  let value = "";
  let index = 1;
  while (index < source.length) {
    if (source[index] === "'") {
      if (source[index + 1] === "'") {
        value += "'";
        index += 2;
        continue;
      }
      return { value, rest: source.slice(index + 1) };
    }
    value += source[index];
    index += 1;
  }
  fail("YAML_STRUCTURE", `unclosed single quote, line ${lineNo}`);
}

export function parseScalar(raw, lineNo) {
  const source = raw.trim();
  if (source === "") fail("YAML_STRUCTURE", `empty scalar, line ${lineNo}`);
  if (source.startsWith('"')) {
    const quoted = readDouble(source, lineNo);
    assertCommentTail(quoted.rest, lineNo);
    return quoted.value;
  }
  if (source.startsWith("'")) {
    const quoted = readSingle(source, lineNo);
    assertCommentTail(quoted.rest, lineNo);
    return quoted.value;
  }
  if (/^[\[\{\|>\*&!]/.test(source)) {
    fail("YAML_UNSUPPORTED_SYNTAX", `syntax rejected, line ${lineNo}`);
  }
  const commentAt = source.search(/\s#/);
  const text = (commentAt === -1 ? source : source.slice(0, commentAt)).trim();
  if (text === "") fail("YAML_STRUCTURE", `empty scalar, line ${lineNo}`);
  if (text === "null" || text === "~") return null;
  if (text === "true") return true;
  if (text === "false") return false;
  if (/^-?\d+$/.test(text)) {
    if (!/^-?(0|[1-9]\d*)$/.test(text)) {
      fail("YAML_INVALID_NUMBER", `leading zeros forbidden, line ${lineNo}`);
    }
    if (text.replace("-", "").length > 9) {
      fail("YAML_NUMBER_TOO_LARGE", `integer too long, line ${lineNo}`);
    }
    return Number(text);
  }
  return text;
}

function keyMatch(source, lineNo) {
  const match = source.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*:(.*)$/);
  if (!match) fail("YAML_STRUCTURE", `invalid key, line ${lineNo}`);
  return { key: match[1], rhs: match[2].trim() };
}

function parseSeq(lines, start, indent) {
  const items = [];
  let cursor = start;
  while (cursor < lines.length) {
    const next = nextNonBlank(lines, cursor);
    if (next >= lines.length) {
      cursor = next;
      break;
    }
    const indentNow = leading(lines[next].line);
    if (indentNow < indent) {
      cursor = next;
      break;
    }
    if (indentNow !== indent) {
      fail("YAML_INDENT", `unexpected list indentation, line ${lines[next].no}`);
    }
    const content = lines[next].line.slice(indent);
    if (!content.startsWith("- ")) {
      fail("YAML_STRUCTURE", `expected list item, line ${lines[next].no}`);
    }
    const rest = content.slice(2).trim();
    if (rest === "") fail("YAML_STRUCTURE", `empty list item, line ${lines[next].no}`);
    if (/^[A-Za-z_][A-Za-z0-9_-]*\s*:/.test(rest)) {
      const parsed = parseListMap(lines, next, indent);
      items.push(parsed.value);
      cursor = parsed.next;
    } else {
      items.push(parseScalar(rest, lines[next].no));
      cursor = next + 1;
    }
  }
  if (items.length === 0) fail("YAML_EMPTY", "empty list");
  return { value: items, next: cursor };
}

function parseListMap(lines, index, dashIndent) {
  const map = {};
  const seen = new Set();
  let cursor = index;
  let first = true;
  while (cursor < lines.length) {
    let lineIndex = cursor;
    if (!first) {
      lineIndex = nextNonBlank(lines, cursor);
      if (lineIndex >= lines.length) {
        cursor = lineIndex;
        break;
      }
      const indentNow = leading(lines[lineIndex].line);
      if (indentNow < dashIndent + 2) {
        cursor = lineIndex;
        break;
      }
      if (indentNow !== dashIndent + 2) {
        fail("YAML_INDENT", `unexpected key indentation, line ${lines[lineIndex].no}`);
      }
      if (lines[lineIndex].line.slice(indentNow).startsWith("- ")) {
        cursor = lineIndex;
        break;
      }
    }
    const body = lines[lineIndex].line.slice(dashIndent + 2);
    const { key, rhs } = keyMatch(body, lines[lineIndex].no);
    if (seen.has(key)) fail("YAML_DUPLICATE_KEY", `${key}, line ${lines[lineIndex].no}`);
    seen.add(key);
    if (rhs === "") {
      const nested = parseSeq(lines, lineIndex + 1, dashIndent + 4);
      map[key] = nested.value;
      cursor = nested.next;
    } else {
      map[key] = parseScalar(rhs, lines[lineIndex].no);
      cursor = lineIndex + 1;
    }
    first = false;
  }
  return { value: map, next: cursor };
}

function parseMap(lines, start, indent) {
  const map = {};
  const seen = new Set();
  let cursor = start;
  let seenKey = false;
  while (cursor < lines.length) {
    const next = nextNonBlank(lines, cursor);
    if (next >= lines.length) {
      cursor = next;
      break;
    }
    const indentNow = leading(lines[next].line);
    if (indentNow < indent) {
      cursor = next;
      break;
    }
    if (indentNow !== indent) {
      fail("YAML_INDENT", `unexpected indentation, line ${lines[next].no}`);
    }
    const content = lines[next].line.slice(indent);
    if (content.startsWith("- ")) {
      fail("YAML_STRUCTURE", `expected key, line ${lines[next].no}`);
    }
    const { key, rhs } = keyMatch(content, lines[next].no);
    if (seen.has(key)) fail("YAML_DUPLICATE_KEY", `${key}, line ${lines[next].no}`);
    seen.add(key);
    seenKey = true;
    if (rhs === "") {
      const child = nextNonBlank(lines, next + 1);
      if (child >= lines.length || leading(lines[child].line) <= indent) {
        map[key] = null;
        cursor = next + 1;
        continue;
      }
      const childIndent = leading(lines[child].line);
      const childText = lines[child].line.slice(childIndent);
      if (childText.startsWith("- ")) {
        const parsed = parseSeq(lines, child, childIndent);
        map[key] = parsed.value;
        cursor = parsed.next;
      } else {
        const parsed = parseMap(lines, child, childIndent);
        map[key] = parsed.value;
        cursor = parsed.next;
      }
    } else {
      map[key] = parseScalar(rhs, lines[next].no);
      cursor = next + 1;
    }
  }
  if (!seenKey) fail("YAML_EMPTY", "empty map");
  return { value: map, next: cursor };
}

export function parseYaml(input) {
  if (typeof input !== "string") {
    fail("YAML_TYPE", "document must be a string");
  }
  const text = input.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (text.trim() === "") fail("YAML_EMPTY", "YAML document is empty");
  if (text.includes("\t")) fail("YAML_TAB", "tabs are forbidden, use spaces");
  const lines = text.split("\n").map((line, index) => ({ line, no: index + 1 }));
  const parsed = parseMap(lines, 0, 0);
  const tail = nextNonBlank(lines, parsed.next);
  if (tail < lines.length) {
    fail("YAML_STRUCTURE", `unexpected trailing content, line ${lines[tail].no}`);
  }
  return parsed.value;
}
