import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'styled-components';

interface SortableElementBoxProps {
  id: string;
  children: React.ReactNode;
}

const SortableElementBox = ({ id, children }: SortableElementBoxProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
  });

  const adjustedTransform = transform
    ? { ...transform, scaleX: 1, scaleY: 1, scaleZ: 1 } // 스케일 고정
    : undefined;

  const style: CSSProperties = {
    transform: adjustedTransform ? CSS.Transform.toString(adjustedTransform) : undefined,
    transition,
    zIndex: isDragging ? 999 : 'auto',
    width: isDragging ? 'auto' : undefined,
    minWidth: isDragging ? 'fit-content' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} data-draggable="true" data-dragging={isDragging}>
      {children}
    </div>
  );
};

export default SortableElementBox;
