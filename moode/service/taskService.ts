import { createBrowserClient } from "@supabase/ssr";
import { startOfDay, endOfDay } from "date-fns";
import { Task } from "@/hooks/useStore";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const taskService = {
  // Fetch Dashboard
  getDashboardTasks: async () => {
    const { data: { user } } = await supabase.auth.getUser();

    // DEMO MODE
    if (!user) {
      return [
        {
          id: "demo-1",
          title: "👋 Welcome to Demo Mode!",
          completed: false,
          created_at: new Date().toISOString(),
          user_id: "demo",
        },
        {
          id: "demo-2",
          title: "Try the ambient sounds 🎧",
          completed: false,
          created_at: new Date().toISOString(),
          user_id: "demo",
        }
      ];
    }

    // User Login
    const todayISO = startOfDay(new Date()).toISOString();
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .or(`completed.eq.false,completed_at.gte.${todayISO}`)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  getTasksByDate: async (date: Date) => {
    const start = startOfDay(date).toISOString();
    const end = endOfDay(date).toISOString();

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("completed", true)
      .gte("completed_at", start)
      .lte("completed_at", end)
      .order("completed_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  // Fetch History
  getHistoryTasks: async ({ pageParam = 0 }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const pageSize = 20;
    const from = pageParam * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("completed", true)
      .order("completed_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return data;
  },

  addTask: async (title: string, userId: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateTaskStatus: async (id: string, completed: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("DEMO_MODE");
    const completedAt = completed ? new Date().toISOString() : null;
    const { data, error } = await supabase
      .from("tasks")
      .update({ completed, completed_at: completedAt })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteTask: async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("DEMO_MODE");
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) throw error;
    return id;
  },
};
