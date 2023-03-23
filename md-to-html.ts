import { writeFileSync, readdirSync } from "fs";
import { read } from "to-vfile";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

(async () => {
  const pages = readdirSync("pages/paslaugos/_page_content").filter((file) =>
    file.endsWith(".md")
  );

  pages.forEach(async (path) => {
    const content = String(
      await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(await read(`pages/paslaugos/_page_content/${path}`))
    ).replaceAll("\n", "");

    writeFileSync(
      `pages/paslaugos/_page_content/${path.replace(".md", ".json")}`,
      `{\n  "__html": "${content.replaceAll('"', '\\"')}"\n}`
    );
  });
})();
