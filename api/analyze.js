export default async function handler(req, res) {
  const API_KEY = process.env.CLAUDE_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: "Analyze HVAC construction plans and estimate system type, unit count, and rough piping."
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.content[0].text
    });

  } catch (error) {
    res.status(500).json({ error: "Something broke" });
  }
}
