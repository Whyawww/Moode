import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { taskService } from "@/service/taskService";
import { toast } from "sonner";
import { createBrowserClient } from "@supabase/ssr";
import { Task } from "@/hooks/useStore";

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
      if (!user) {
        throw new Error("DEMO_RESTRICTION");
      }
      return taskService.addTask(title, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", "dashboard"] });
      toast.success("Task added!");
    },
    onError: (err: Error) => {
      if (err.message && err.message.includes("DEMO_RESTRICTION")) {
        toast.error("Demo mode only allows adding tasks. Please log in.");
      } else if (err.message && err.message.includes("Focus limit reached")) {
        toast.error(
          "Whoops! Database says you have too many tasks. Finish some first!"
        );
      } else {
        toast.error(err.message || "Failed to add task");
      }
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      taskService.updateTaskStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", "dashboard"] });

      const previousTasks = queryClient.getQueryData<Task[]>([
        "tasks",
        "dashboard",
      ]);

      if (previousTasks) {
        queryClient.setQueryData<Task[]>(["tasks", "dashboard"], (old) => {
          return old?.map((t) =>
            t.id === id
              ? {
                  ...t,
                  completed: status,
                  completedAt: status ? new Date() : undefined,
                }
              : t
          );
        });
      }

      return { previousTasks };
    },

    onError: (err: Error, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks", "dashboard"], context.previousTasks);
      }

      if (err.message && err.message.includes("Focus limit reached")) {
        toast.error("Limit reached! You can't uncheck this task.");
      } else {
        toast.error("Sync failed. Reverting changes.");
      }
      
      if (err.message && err.message.includes("DEMO_RESTRICTION")) {
        toast.info("Demo Mode: Changes won't be saved.");
      } else {
        toast.error("Sync failed.");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", "dashboard"] });
      const previousTasks = queryClient.getQueryData<Task[]>([
        "tasks",
        "dashboard",
      ]);

      queryClient.setQueryData<Task[]>(["tasks", "dashboard"], (old) =>
        old?.filter((t) => t.id !== id)
      );

      return { previousTasks };
    },

    onError: (err, id, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks", "dashboard"], context.previousTasks);
      }
      toast.error("Delete failed. Restoring task.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onSuccess: () => {
      toast.info("Task deleted");
    },
  });

  return { addTaskMutation, toggleTaskMutation, deleteTaskMutation };
};
