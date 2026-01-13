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
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) throw error;
    return id;
  },
};
