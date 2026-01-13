import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { taskService } from "@/service/taskService";
import { toast } from "sonner";
import { createBrowserClient } from "@supabase/ssr";

const useUserId = () => {
  return "user-id-placeholder";
};

export const useDashboardTasks = () => {
  return useQuery({
    queryKey: ["tasks", "dashboard"],
    queryFn: taskService.getDashboardTasks,
  });
};

export const useTasksByDate = (date: Date | undefined) => {
  return useQuery({
    queryKey: ["tasks", "by-date", date?.toISOString()],

    queryFn: () => {
      if (!date) return [];
      return taskService.getTasksByDate(date);
    },

    enabled: !!date,
  });
};

export const useHistoryTasks = () => {
  return useInfiniteQuery({
    queryKey: ["tasks", "history"],
    queryFn: taskService.getHistoryTasks,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.length : undefined;
    },
  });
};

export const useTaskMutations = () => {
  const queryClient = useQueryClient();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const addTaskMutation = useMutation({
    mutationFn: async (title: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Unauthorized");
      return taskService.addTask(title, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", "dashboard"] });
      toast.success("Task added!");
    },
    onError: (err) => toast.error(err.message),
  });

  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      taskService.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => toast.error("Failed to update task"),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.info("Task deleted");
    },
  });

  return { addTaskMutation, toggleTaskMutation, deleteTaskMutation };
};
