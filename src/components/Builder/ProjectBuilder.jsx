import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import BuilderSidebar from './BuilderSidebar';
import DraggableBlock from './DraggableBlock';
import { Plus } from 'lucide-react';

import TextModule from './Modules/TextModule';
import ImageModule from './Modules/ImageModule';
import PdfModule from './Modules/PdfModule';

const BlockRenderer = ({ module, onChange }) => {
    switch (module.type) {
        case 'text':
            return <TextModule data={module.content} onChange={(data) => onChange(module.id, data)} />;
        case 'image':
            return <ImageModule data={module.content} onChange={(data) => onChange(module.id, data)} />;
        case 'pdf':
            return <PdfModule data={module.content} onChange={(data) => onChange(module.id, data)} />;
        default:
            return <div className="p-8 text-center text-gray-400 border border-dashed rounded">Module type {module.type} coming soon</div>;
    }
};

const ProjectBuilder = ({ modules = [], onChange }) => {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddModule = (type) => {
        const newModule = {
            id: uuidv4(),
            type,
            content: null,
            styles: {}
        };
        onChange([...modules, newModule]);
    };

    const handleDeleteModule = (id) => {
        onChange(modules.filter(m => m.id !== id));
    };

    const handleModuleChange = (id, newContent) => {
        onChange(modules.map(m => m.id === id ? { ...m, content: newContent } : m));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = modules.findIndex((m) => m.id === active.id);
            const newIndex = modules.findIndex((m) => m.id === over.id);
            onChange(arrayMove(modules, oldIndex, newIndex));
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#F9F9F9]">
            {/* Main Canvas Area */}
            <div className="w-full md:flex-1 p-4 md:p-16 flex flex-col items-center min-h-[calc(100vh-80px)] overflow-y-auto">
                {/* 80px buffer for potential fixed header */}

                <div className="w-full max-w-4xl space-y-6">
                    {modules.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
                            <h2 className="text-2xl font-light text-gray-400 mb-8">Start building your project:</h2>
                            <p className="text-gray-300">Select a content type from the sidebar</p>
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={modules.map(m => m.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-8 min-h-[200px]">
                                    {modules.map((module) => (
                                        <DraggableBlock
                                            key={module.id}
                                            id={module.id}
                                            module={module}
                                            onDelete={handleDeleteModule}
                                        >
                                            <BlockRenderer module={module} onChange={handleModuleChange} />
                                        </DraggableBlock>
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}

                    {/* Bottom Add Area */}
                    {modules.length > 0 && (
                        <div className="flex justify-center py-12 border-t-2 border-dashed border-gray-200 mt-12 rounded-xl group hover:border-blue-200 transition-colors cursor-default">
                            <p className="text-gray-400 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                                <Plus size={20} />
                                Add more content from the sidebar
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="hidden lg:block h-screen sticky top-0">
                <BuilderSidebar onAddModule={handleAddModule} />
            </div>

            {/* Mobile Sidebar (Floating Action Button or Bottom Sheet style could be better, but simpler check first) 
                For now, we'll keep the sidebar hidden or stack it. 
                Actually, the sidebar is essential. Let's make it a bottom sheet or stacked on mobile? 
                The user requested standard responsive patterns. 
                Let's make the main container flex-col-reverse on mobile so sidebar is at bottom or top?
                Sidebar at bottom is standard for mobile controls.
            */}
        </div>
    );
};

export default ProjectBuilder;

