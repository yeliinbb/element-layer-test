import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'styled-components';

interface SortableElementBoxProps {
  id: string;
  children: React.ReactNode;
}

const SortableElementBox = ({ id, children }: SortableElementBoxProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative' as const,
    display: 'flex',
    flexShrink: 0,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} data-draggable="true">
      {children}
    </div>
  );
};

export default SortableElementBox;
