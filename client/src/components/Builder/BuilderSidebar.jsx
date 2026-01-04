import React from 'react';
import {
    Image, Type, Grid, PlayCircle, Code, Aperture, MousePointer, Box,
    Palette, Settings, Link, Download, ChevronRight
} from 'lucide-react';

const BuilderSidebar = ({ onAddModule }) => {

    const tools = [
        { id: 'image', label: 'Image', icon: <Image size={24} /> },
        { id: 'text', label: 'Text', icon: <Type size={24} /> },
        { id: 'photo-grid', label: 'Photo Grid', icon: <Grid size={24} /> },
        { id: 'video', label: 'Video/Audio', icon: <PlayCircle size={24} /> },
        { id: 'embed', label: 'Embed', icon: <Code size={24} /> },
        { id: 'lightroom', label: 'Lightroom', icon: <Aperture size={24} /> },
        { id: 'prototype', label: 'Prototype', icon: <MousePointer size={24} /> },
        { id: '3d', label: '3D', icon: <Box size={24} /> },
    ];

    return (
        <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 lg:h-screen sticky lg:top-0 p-6 flex flex-col gap-8 shadow-xl z-40 order-first lg:order-last">

            {/* Add Content Section */}
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Add Content</h3>
                <div className="grid grid-cols-4 lg:grid-cols-2 gap-4">
                    {tools.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => onAddModule(tool.id)}
                            className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-200 group border border-transparent hover:border-gray-100 hover:shadow-sm"
                        >
                            <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                                {tool.icon}
                            </div>
                            <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 hidden md:block">{tool.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Edit Project Section */}
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Edit Project</h3>
                <div className="grid grid-cols-2 gap-4 hidden lg:grid">
                    <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                        <Palette size={20} className="text-gray-400 mb-2" />
                        <span className="text-xs font-medium text-gray-700">Styles</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                        <Settings size={20} className="text-gray-400 mb-2" />
                        <span className="text-xs font-medium text-gray-700">Settings</span>
                    </button>
                </div>
            </div>

            {/* Custom Button Section */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <button className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                    <Link size={16} />
                    Custom Button
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-2">Customize the call to action on your project</p>
            </div>

            {/* Assets Section */}
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Assets</h3>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 hover:bg-blue-50 hover:border-blue-200 transition-colors text-gray-500 hover:text-blue-600">
                    <Download size={18} />
                    <span className="text-sm font-medium">Attach Files</span>
                </button>
            </div>

            {/* Actions (Floating at bottom usually, but here inline for now) */}
            <div className="mt-auto space-y-3 pt-6 border-t border-gray-100">
                <button className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                    Continue <ChevronRight size={18} />
                </button>
                <div className="grid grid-cols-2 gap-3">
                    <button className="py-2.5 px-4 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition">
                        Save Draft
                    </button>
                    <button className="py-2.5 px-4 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition">
                        Preview
                    </button>
                </div>
            </div>

        </div>
    );
};

export default BuilderSidebar;
