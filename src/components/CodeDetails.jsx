import { useState } from "react";

const tokenPattern = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|`(?:\\.|[^`])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|<\/?[A-Za-z][\w.-]*|\/?\>|(?<![\w])\.[A-Za-z_-][\w-]*|@[A-Za-z-]+|\b(?:import|from|export|default|function|const|let|return|if|else|new|true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$-]*(?=\s*[:=]))/g;

function tokenType(token) {
  if (token.startsWith("//") || token.startsWith("/*")) return "comment";
  if (/^["'`]/.test(token)) return "string";
  if (/^\d/.test(token)) return "number";
  if (token.startsWith("<") || token === ">" || token === "/>") return "tag";
  if (token.startsWith(".") || token.startsWith("@")) return "selector";
  if (/^(import|from|export|default|function|const|let|return|if|else|new|true|false|null|undefined)$/.test(token)) return "keyword";
  return "property";
}

function HighlightedCode({ children }) {
  const parts = [];
  let cursor = 0;

  for (const match of children.matchAll(tokenPattern)) {
    if (match.index > cursor) parts.push(children.slice(cursor, match.index));
    parts.push(
      <span className={`code-${tokenType(match[0])}`} key={`${match.index}-${match[0]}`}>
        {match[0]}
      </span>,
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < children.length) parts.push(children.slice(cursor));

  return <code>{parts}</code>;
}

export default function CodeDetails({ sections, defaultOpen = false }) {
  const [copiedTitle, setCopiedTitle] = useState("");
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const copyCode = async (title, code) => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(code);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }
    setCopiedTitle(title);
    window.setTimeout(() => setCopiedTitle(""), 1400);
  };

  return (
    <details className="code-details" open={isOpen} onToggle={(event) => setIsOpen(event.currentTarget.open)}>
      <summary>View core implementation</summary>
      <div className="code-grid">
        {sections.map(({ title, code }) => (
          <section key={title}>
            <div className="code-heading">
              <h4>{title}</h4>
              <button type="button" onClick={() => copyCode(title, code)}>{copiedTitle === title ? "Copied" : "Copy"}</button>
            </div>
            <pre><HighlightedCode>{code.trim()}</HighlightedCode></pre>
          </section>
        ))}
      </div>
    </details>
  );
}
