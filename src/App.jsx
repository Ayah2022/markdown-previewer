import React, { useState, useMemo } from "react";
import { marked } from "marked";

// Set marked options for FCC (line breaks behave like GitHub)
marked.setOptions({ breaks: true });

const initialMarkdown = `# Welcome to my Markdown Previewer!

## Subheading

Here's some inline code: \`<div></div>\`

\`\`\`
// Code block
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

- List item 1
- List item 2
- List item 3

> Block quote

**Bold text** and _italic text_.

[FreeCodeCamp](https://www.freecodecamp.org)

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;
const toggleExpand = (e) => {
  const panel = e.target.closest(".panel");
  const icon = e.target;
  const container = panel.parentElement; // wrapper holding both panels

  // If the clicked panel is already maximized, reset both panels
  if (panel.classList.contains("maximized")) {
    panel.classList.remove("maximized");
    icon.classList.remove("fa-arrows-alt");
    icon.classList.add("fa-compress");
    container.querySelectorAll(".panel").forEach(p => p.classList.remove("hide"));
    return;
  } else {
    icon.classList.remove("fa-compress");
    icon.classList.add("fa-arrows-alt");
    // First reset all panels
    container.querySelectorAll(".panel").forEach(p => {
      p.classList.remove("maximized", "hide");
    });

    // Maximize clicked panel
    panel.classList.add("maximized");

  }



  // Hide siblings
  container.querySelectorAll(".panel").forEach(p => {
    if (p !== panel) {
      p.classList.add("hide");
    }
  });
};

export default function App() {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  // Convert only when markdown changes
  const html = useMemo(() => marked(markdown), [markdown]);

  return (
    <div className="container">
      <div className="panels">

        <h1>Markdown Previewer</h1>

        <div className="panel">
          <div class="toolbar">
            <span><i class="fa fa-free-code-camp" title="no-stack-dub-sack">
            </i>Editor
            </span>
            <i class="fa fa-compress" onClick={toggleExpand}></i>
          </div>
          <textarea
            id="editor"
            className="editorWrap"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            aria-label="Markdown editor"
          />
        </div>


        <div className="panel">
          <div class="toolbar">
            <span><i class="fa fa-free-code-camp" title="no-stack-dub-sack">
            </i>Previewer
            </span>
            <i class="fa fa-compress" onClick={toggleExpand}></i>
          </div>
          <div
            id="preview"
            className="previewWrap"
            dangerouslySetInnerHTML={{ __html: html }}
            aria-live="polite"
          />
        </div>
      </div>

    </div>
  );
}
