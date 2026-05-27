import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ImagePlus, Clipboard } from 'lucide-react';
import NavbarTwo from '../components/NavebarTwo';
import Footer from '../components/Footer';

const makeSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const downloadFile = (content, filename, type = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

const UploadProject = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [behanceLink, setBehanceLink] = useState('');
  const [toolsText, setToolsText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const slug = useMemo(() => makeSlug(title || 'new-project'), [title]);
  const imageFilename = useMemo(() => {
    if (!imageFile) return `${slug}.jpg`;
    const extension = imageFile.name.match(/\.[a-z0-9]+$/i)?.[0] || '.jpg';
    return `${slug}${extension}`;
  }, [imageFile, slug]);

  const tools = useMemo(
    () =>
      toolsText
        .split(',')
        .map((tool) => tool.trim())
        .filter(Boolean),
    [toolsText]
  );

  const projectEntry = useMemo(() => {
    return {
      id: slug || 'new-project',
      title: title || 'New Project',
      shortDescription: shortDescription || 'Add a short description for this project.',
      description: description || '<p>Describe the project here.</p>',
      thumbnailUrl: `/assets/${imageFilename}`,
      category: 'Case Study',
      year: new Date().getFullYear().toString(),
      role: 'Designer & Developer',
      tools,
      tags: [],
      liveLink: behanceLink || '',
      repoLink: '',
      pdfUrl: '',
      images: [],
      contentModules: [],
    };
  }, [slug, title, shortDescription, description, imageFilename, tools, behanceLink]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result || '');
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadImage = () => {
    if (!imageFile) return;
    downloadFile(imageFile, imageFilename, imageFile.type || 'application/octet-stream');
  };

  const handleDownloadProjectSnippet = () => {
    const jsContent = `// Copy this object into src/data/projects.js inside the projects array\n
${JSON.stringify(projectEntry, null, 2)}\n`;
    downloadFile(jsContent, `${slug || 'new-project'}-project-entry.js`, 'text/javascript');
  };

  const handleCopySnippet = async () => {
    const snippet = `// Copy this object into src/data/projects.js inside the projects array\n\n${JSON.stringify(
      projectEntry,
      null,
      2
    )}`;
    await navigator.clipboard.writeText(snippet);
    setCopyStatus('Copied to clipboard!');
    window.setTimeout(() => setCopyStatus(''), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <NavbarTwo />

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-20">
        <div className="mb-10 flex items-center gap-4 text-sm text-gray-400">
          <Link to="/" className="inline-flex items-center gap-2 hover:text-white transition">
            <ArrowLeft size={18} /> Back to site
          </Link>
          <span className="px-3 py-1 rounded-full bg-white/5 text-xs uppercase tracking-[0.3em]">
            Dev helper
          </span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111118] p-8 shadow-xl shadow-black/30">
          <h1 className="text-4xl font-bold mb-4">Upload a New Project</h1>
          <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
            This form generates a project object and the case study image file for your portfolio.
            After downloading, move the image into <span className="text-blue-300">public/assets/</span> and paste the generated object into <span className="text-blue-300">src/data/projects.js</span>.
          </p>

          <div className="grid gap-6">
            <label className="space-y-2 text-sm font-medium">
              Project title
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g. Modern landing page redesign"
                className="w-full rounded-2xl border border-white/10 bg-[#09090f] px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </label>

            <label className="space-y-2 text-sm font-medium">
              Short description
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="A one-line summary for the project card"
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-[#09090f] px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </label>

            <label className="space-y-2 text-sm font-medium">
              Full description / case study text
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Use HTML or plain text. Example: <p>Project summary...</p>"
                rows={6}
                className="w-full rounded-2xl border border-white/10 bg-[#09090f] px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </label>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                Behance link
                <input
                  value={behanceLink}
                  onChange={(e) => setBehanceLink(e.target.value)}
                  placeholder="https://www.behance.net/your-project"
                  className="w-full rounded-2xl border border-white/10 bg-[#09090f] px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </label>

              <label className="space-y-2 text-sm font-medium">
                Tools used (comma-separated)
                <input
                  value={toolsText}
                  onChange={(e) => setToolsText(e.target.value)}
                  placeholder="Figma, React, Tailwind CSS"
                  className="w-full rounded-2xl border border-white/10 bg-[#09090f] px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium">
              Case study image
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#09090f] px-4 py-3">
                <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-gray-300" />
              </div>
            </label>

            {previewUrl && (
              <div className="rounded-3xl border border-white/10 bg-[#08080e] p-4">
                <p className="text-sm text-gray-400 mb-3">Image preview</p>
                <img src={previewUrl} alt="Preview" className="w-full rounded-3xl object-cover" />
              </div>
            )}

            <div className="rounded-3xl border border-white/10 bg-[#09090f] p-6 space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Generated project entry</span>
                <div className="rounded-2xl bg-black/70 border border-white/10 p-4 font-mono text-sm text-green-200">
                  <p>id: <span className="text-white">{projectEntry.id}</span></p>
                  <p>thumbnailUrl: <span className="text-white">{projectEntry.thumbnailUrl}</span></p>
                  <p>tools: <span className="text-white">{JSON.stringify(projectEntry.tools)}</span></p>
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-3">
                <button
                  type="button"
                  onClick={handleDownloadImage}
                  disabled={!imageFile}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ImagePlus size={18} /> Download Image
                </button>

                <button
                  type="button"
                  onClick={handleDownloadProjectSnippet}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                >
                  <Download size={18} /> Download Project Snippet
                </button>

                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
                >
                  <Clipboard size={18} /> Copy Snippet
                </button>
              </div>

              {copyStatus && <p className="text-sm text-emerald-300">{copyStatus}</p>}

              <div className="rounded-2xl border border-white/10 bg-[#08080e] p-4 text-sm leading-relaxed text-gray-300">
                <p className="font-semibold text-white">Important</p>
                <ul className="mt-3 space-y-2 list-disc pl-5">
                  <li>
                    Place the downloaded image file in <span className="text-blue-300">public/assets/</span> or <span className="text-blue-300">src/assets/</span>.
                  </li>
                  <li>
                    Paste the downloaded project object into <span className="text-blue-300">src/data/projects.js</span> inside the <code>projects</code> array.
                  </li>
                  <li>
                    If you use <span className="text-blue-300">public/assets/</span>, keep <span className="text-white">thumbnailUrl</span> as <span className="text-green-300">/assets/{imageFilename}</span>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadProject;
