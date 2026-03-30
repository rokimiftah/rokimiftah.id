import type { Code, Root } from "mdast";
import type { Plugin } from "unified";
import type { Node } from "unist";

interface HtmlNode extends Node {
  type: "html";
  value: string;
}

/**
 * Remark plugin to transform code blocks with title metadata into CodeBlockFrame HTML.
 *
 * For Astro content collections, generating raw HTML is the recommended approach
 * because Astro components cannot be provided via MDX's provideMdxComponents.
 *
 * Input:
 * ```typescript title: convex/file.ts
 * const code = "here";
 * ```
 *
 * Output:
 * Raw HTML string with CodeBlockFrame structure
 */
export const remarkCodeblockFrame: Plugin<[], Root> = () => (tree: Root) => {
  const nodes = tree.children as Node[];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.type === "code") {
      const codeNode = node as Code;
      const meta = codeNode.meta;

      if (meta) {
        // Extract title from meta
        const titleMatch = meta.match(/title:\s*["']?([^"'\s]+)["']?/i);
        const title = titleMatch?.[1];

        if (title) {
          // Extract lang from meta or use code lang
          const langMatch = meta.match(/lang(?:uage)?:\s*["']?([^"'\s]+)["']?/i);
          const lang = langMatch?.[1] || codeNode.lang || null;

          // Generate HTML structure
          const htmlString = createCodeBlockFrameHTML(title, codeNode.value, lang);

          // Replace code node with raw HTML
          nodes[i] = {
            type: "html",
            value: htmlString
          } as HtmlNode;
        }
      }
    }
  }
};

function createCodeBlockFrameHTML(title: string, codeContent: string, lang: string | null): string {
  const langClass = lang ? ` class="language-${escapeHtml(lang)}"` : "";

  return `<div class="frame-code">
  <div class="-mb-6 truncate rounded-md bg-[#011711] p-1 pr-10 pl-1 text-sm text-neutral-50 antialiased">
    &nbsp; ${escapeHtml(title)}
  </div>
  <button type="button" aria-label="Copy code to clipboard" class="copy-code text-neutral-300">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#ffffff" fill="none">
      <path d="M3.5 9.36842C3.5 5.89491 3.5 4.15816 4.52513 3.07908C5.55025 2 7.20017 2 10.5 2H13.5C16.7998 2 18.4497 2 19.4749 3.07908C20.5 4.15816 20.5 5.89491 20.5 9.36842V14.6316C20.5 18.1051 20.5 19.8418 19.4749 20.9209C18.4497 22 16.7998 22 13.5 22H10.5C7.20017 22 5.55025 22 4.52513 20.9209C3.5 19.8418 3.5 18.1051 3.5 14.6316V9.36842Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M8 2L8.0822 2.4932C8.28174 3.69044 8.38151 4.28906 8.80113 4.64453C9.22075 5 9.82762 5 11.0414 5H12.9586C14.1724 5 14.7793 5 15.1989 4.64453C15.6185 4.28906 15.7183 3.69044 15.9178 2.4932L16 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M8 16H12M8 11H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
    </svg>
  </button>
  <pre><code${langClass}>${escapeHtml(codeContent)}</code></pre>
</div>`;
}

function escapeHtml(text: string | null | undefined): string {
  if (!text) return "";
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
