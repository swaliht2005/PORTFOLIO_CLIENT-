import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import React from 'react';

const DraggableBlock = ({ id, module, onDelete, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative bg-white border border-transparent hover:border-blue-500 hover:shadow-lg rounded-xl transition-all duration-200"
        >
            {/* Drag Handle & Controls */}
            <div className="absolute -left-12 top-0 bottom-0 w-12 flex flex-col items-end py-4 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                <button
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-white rounded-lg shadow-sm mb-2 cursor-grab active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical size={20} />
                </button>
                <button
                    onClick={() => onDelete(id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg shadow-sm"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Content Area */}
            <div className="p-1 min-h-[50px]">
                {children}
            </div>
        </div>
    );
};

export default DraggableBlock;
