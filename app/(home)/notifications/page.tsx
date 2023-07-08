import { getProjects } from "@/services/db/project";

export const revalidate = 0;

type Notification = {
  id: string;
  title: string;
  description: string;
};

export default async function notificationsPages() {
  const projects = await getProjects();

  const notifications: Notification[] = projects
    .map((project) => {
      const notifications = [];
      const daysLeft = Math.floor(
        (project.endDate - Date.now()) / (1000 * 60 * 60 * 24)
      );
      if (daysLeft <= 0) {
        notifications.push({
          id: project.id,
          title: "Proyecto atrasado",
          description: `El proyecto ${project.title} esta atrasado por ${daysLeft} dias`,
        });
      }

      for (const task of project.tasks) {
        const daysLeft = Math.floor(
          (task.endDate - Date.now()) / (1000 * 60 * 60 * 24)
        );

        if (daysLeft <= 0) {
          notifications.push({
            id: task.id,
            title: "Tarea atrasada",
            description: `La tarea ${task.title}, del projecto ${project.title} esta atrasada por ${daysLeft} dias`,
          });
        }
      }

      return notifications;
    })
    .flat();

  return (
    <div className="w-full flex flex-col gap-4 h-full p-2">
      {notifications.map((notification) => {
        return (
          <div key={notification.id} className="w-full p-3 rounded-xl bg-white">
            <h3 className="text-xs font-bold">{notification.title}</h3>
            <p className="text-xs">{notification.description}</p>
          </div>
        );
      })}
      {notifications.length === 0 && (
        <div className="w-full p-3 rounded-xl bg-white">
          <h3 className="text-xs font-bold">Sin notificaciones</h3>
          <p className="text-xs">No tienes notificaciones</p>
        </div>
      )}
    </div>
  );
}
