import { OpenAI } from "npm:openai@4.24.1";
import { createClient } from "npm:@supabase/supabase-js@2.39.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { goal, userId } = await req.json();

    if (!goal || !userId) {
      throw new Error("Missing required parameters");
    }

    const openai = new OpenAI({
      apiKey: Deno.env.get("OPENAI_API_KEY"),
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const prompt = `Create a 4-week learning curriculum for the following goal: "${goal}"
    Format the response as a JSON object with the following structure:
    {
      "weeks": [
        {
          "title": "Week title",
          "description": "Week description",
          "tasks": ["task1", "task2", "task3"],
          "resources": ["resource1", "resource2"]
        }
      ]
    }
    Make the plan practical, achievable, and include specific tasks and relevant learning resources.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const curriculum = JSON.parse(completion.choices[0].message.content ?? "{}");

    // Save to Firestore
    const { error } = await supabase
      .from("curriculums")
      .insert({
        user_id: userId,
        goal,
        curriculum,
        created_at: new Date().toISOString(),
      });

    if (error) throw error;

    return new Response(JSON.stringify(curriculum), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});