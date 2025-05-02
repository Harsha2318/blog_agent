function createPrompt(topic) {
  return `
You are a professional AI blog writer.

Your task is to write a well-structured, SEO-optimized, and fact-checked article on the topic: "${topic}".

Instructions:
- Use Markdown formatting.
- Include a title, introduction, subheadings, bullet points (if needed), and a conclusion.
- Highlight key terms for SEO.
- Add a **Mermaid.js** diagram if relevant (wrap it in \`\`\`mermaid).
- Use a friendly, engaging tone.
- Avoid hallucinated facts.
- Verify all facts using reliable sources and cite them if possible.
- If uncertain about a fact, clearly state the uncertainty or omit it.

Only output the final article in Markdown.
  `;
}

export default createPrompt;
