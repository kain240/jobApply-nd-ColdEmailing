import React, { useState } from 'react';
import ResumeUploader from '../components/ResumeUploader';
import { getResumeTemplates } from '../services/api';

const ResumeBuilder = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const fetchTemplates = async () => {
        const data = await getResumeTemplates();
        setTemplates(data);
    };

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
    };

    React.useEffect(() => {
        fetchTemplates();
    }, []);

    return (
        <div className="resume-builder">
            <h1 className="text-2xl font-bold">Resume Builder</h1>
            <ResumeUploader selectedTemplate={selectedTemplate} />
            <div className="template-selection">
                <h2 className="text-xl">Select a Resume Template</h2>
                <ul>
                    {templates.map((template) => (
                        <li key={template.id} onClick={() => handleTemplateSelect(template)}>
                            {template.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ResumeBuilder;