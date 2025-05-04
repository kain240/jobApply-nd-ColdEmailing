import React from 'react';
import { Edit, Trash2, Copy } from 'lucide-react';

const EmailTemplateCard = ({ template, onCopy, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
          {template.category}
        </span>
            </div>

            <div className="mt-3">
                <p className="text-sm text-gray-600 line-clamp-3">{template.content}</p>
            </div>

            <div className="mt-4 flex justify-between">
                <p className="text-xs text-gray-500">Created: {new Date(template.dateCreated).toLocaleDateString()}</p>

                <div className="flex space-x-2">
                    <button
                        onClick={() => onCopy(template.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="Copy template"
                    >
                        <Copy size={18} />
                    </button>
                    <button
                        onClick={() => onEdit(template.id)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
                        title="Edit template"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(template.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        title="Delete template"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplateCard;