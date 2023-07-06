"use client";
import { Task } from "@/types/tasks";
import { getDuration } from "@/utils/date";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

type EditTaskFormProps = {
  open: boolean;
  task: Task;
  onClose: () => void;
  onSaved: (task: Task) => void;
};

export default function EditTaskForm(props: EditTaskFormProps) {
  const { onClose, onSaved, open, task } = props;

  const [innerTask, setInnerTask] = useState(task);

  const handleEditTask = (task: Partial<Task>) => {
    setInnerTask((prev) => ({ ...prev, ...task }));
  };

  const handleSaveTask = () => {
    onSaved(innerTask);
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={() => {
        onClose();
      }}
      backdrop="blur"
      className="bg-white rounded-xl shadow-3xl border-none"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <span className="text-lg font-bold">Editar tarea</span>
            </ModalHeader>
            <ModalBody>
              <Input
                size="xs"
                name="task_title"
                label="Título de la tarea"
                value={innerTask.title}
                onChange={(e) => {
                  const title = e.target.value;
                  handleEditTask({ title });
                }}
              />
              <span className="text-xs font-bold ">
                Duración:{" "}
                {getDuration(
                  new Date(innerTask.startDate),
                  new Date(innerTask.endDate)
                )}
              </span>
              <div className="flex gap-3">
                <Input
                  size="xs"
                  type="date"
                  label="Fecha de inicio"
                  value={
                    new Date(innerTask.startDate).toISOString().split("T")[0]
                  }
                  onChange={(e) => {
                    const startDate = e.target.valueAsDate;
                    handleEditTask({ startDate: startDate?.getTime() });
                  }}
                />
                <Input
                  size="xs"
                  type="date"
                  label="Fecha de finalización"
                  value={
                    new Date(innerTask.endDate).toISOString().split("T")[0]
                  }
                  onChange={(e) => {
                    const endDate = e.target.valueAsDate;
                    handleEditTask({ endDate: endDate?.getTime() });
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="secondary" onPress={handleSaveTask}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
