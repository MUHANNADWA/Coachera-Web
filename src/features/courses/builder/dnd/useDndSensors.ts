// features/courses/builder/dnd/useDndSensors.ts
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

export function useDndSensors() {
  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );
}
