import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const gamificationService = {
  getCurrentStreak: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      console.warn("No active session found for streak calculation");
      return 0;
    }

    const { data, error } = await supabase.rpc("get_current_streak");

    if (error) {
      console.error("RPC Error:", error);
      throw error;
    }

    return data as number;
  },

  getActivityLogs: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("activity_logs")
      .select("date, minutes_focused")
      .eq("user_id", user.id)
      .gte(
        "date",
        new Date(new Date().getFullYear(), 0, 1).toLocaleDateString("en-CA")
      );

    if (error) throw error;
    return data;
  },

  logActivity: async (minutes: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not found");

    const todayStr = new Date().toLocaleDateString("en-CA");

    const { data: existing } = await supabase
      .from("activity_logs")
      .select("minutes_focused")
      .eq("user_id", user.id)
      .eq("date", todayStr)
      .single();

    const currentMinutes = existing ? existing.minutes_focused : 0;

    const { error } = await supabase.from("activity_logs").upsert(
      {
        user_id: user.id,
        date: todayStr, 
        minutes_focused: currentMinutes + minutes,
      },
      { onConflict: "user_id, date" }
    );

    if (error) throw error;
  },
};
