"import { useRef, useState } from \"react\";
import { UploadCloud, FileText } from \"lucide-react\";

export default function UploadZone({ onUpload, loading, compact = false }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(\".csv\")) return;
    onUpload(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  return (
    <div
      data-testid={compact ? \"upload-zone-compact\" : \"upload-zone\"}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={openPicker}
      role=\"button\"
      tabIndex={0}
      className={`cursor-pointer border-2 border-dashed rounded-xl text-center transition-colors bg-white ${
        dragging
          ? \"border-indigo-500 bg-indigo-50/40\"
          : \"border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30\"
      } ${compact ? \"p-6\" : \"p-10\"}`}
    >
      <input
        ref={inputRef}
        type=\"file\"
        accept=\".csv\"
        className=\"hidden\"
        onChange={(e) => {
          const f = e.target.files?.[0];
          handleFile(f);
          e.target.value = \"\";
        }}
        data-testid={compact ? \"upload-zone-compact-input\" : \"upload-zone-input\"}
      />
      {compact ? (
        <div className=\"flex items-start gap-3 text-left\">
          <div className=\"h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0\">
            <UploadCloud size={18} />
          </div>
          <div>
            <div className=\"text-sm font-medium text-slate-800 font-display\">Upload new CSV</div>
            <div className=\"text-xs text-slate-500 mt-0.5\">
              Drop a file or click to browse. Replaces current data.
            </div>
          </div>
        </div>
      ) : (
        <>
          <UploadCloud size={32} className=\"text-indigo-500 mx-auto mb-3\" />
          <div className=\"text-sm font-medium text-slate-800 font-display\">
            Drop your customers CSV here
          </div>
          <div className=\"text-xs text-slate-500 mt-1\">
            or <span className=\"text-indigo-600 underline\">browse from your computer</span>
          </div>
          <div className=\"mt-3 inline-flex items-center gap-1 text-[11px] text-slate-400\">
            <FileText size={12} /> .csv up to a few MB
          </div>
        </>
      )}
      {loading && (
        <div className=\"mt-3 text-xs text-indigo-600\">Processing…</div>
      )}
    </div>
  );
}
"