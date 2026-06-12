'use client';

import { useEffect, useRef, useState } from 'react';
import { Bold, Italic, Underline, Heading2, Heading3, Pilcrow, List, ListOrdered, Link as LinkIcon, Quote, Eraser, Eye, Code } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Nhập nội dung bài viết...',
  error,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isVisual, setIsVisual] = useState(true);

  // Sync internal HTML with value when value is updated externally (e.g. initial load)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, arg: string = '') => {
    if (typeof document !== 'undefined') {
      document.execCommand(command, false, arg);
      handleInput();
    }
  };

  const addLink = () => {
    const url = prompt('Nhập URL liên kết:', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        executeCommand('bold');
      } else if (e.key.toLowerCase() === 'i') {
        e.preventDefault();
        executeCommand('italic');
      } else if (e.key.toLowerCase() === 'u') {
        e.preventDefault();
        executeCommand('underline');
      }
    }
  };

  return (
    <div
      className={`w-full rounded-2xl border bg-zinc-950 overflow-hidden transition-all duration-300 ${
        error
          ? 'border-red-500 ring-2 ring-red-500/10'
          : 'border-zinc-800 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10'
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-zinc-900 border-b border-zinc-800">
        <div className="flex flex-wrap items-center gap-1">
          {/* Bold */}
          <button
            type="button"
            onClick={() => executeCommand('bold')}
            className="p-1.5 min-w-[32px] h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center font-bold"
            title="Đậm (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          
          {/* Italic */}
          <button
            type="button"
            onClick={() => executeCommand('italic')}
            className="p-1.5 min-w-[32px] h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center italic"
            title="Nghiêng (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>

          {/* Underline */}
          <button
            type="button"
            onClick={() => executeCommand('underline')}
            className="p-1.5 min-w-[32px] h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center underline"
            title="Gạch chân (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-zinc-800 mx-1" />

          {/* H2 */}
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', 'h2')}
            className="p-1.5 min-w-[32px] h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center"
            title="Tiêu đề lớn (H2)"
          >
            <Heading2 className="w-4 h-4" />
          </button>

          {/* H3 */}
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', 'h3')}
            className="p-1.5 min-w-[32px] h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center"
            title="Tiêu đề nhỏ (H3)"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          {/* P */}
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', 'p')}
            className="p-1.5 min-w-[32px] h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center"
            title="Đoạn văn (P)"
          >
            <Pilcrow className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-zinc-800 mx-1" />

          {/* Unordered List */}
          <button
            type="button"
            onClick={() => executeCommand('insertUnorderedList')}
            className="p-1.5 px-2.5 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center text-xs font-semibold gap-1.5"
            title="Danh sách dấu chấm"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Danh sách</span>
          </button>

          {/* Ordered List */}
          <button
            type="button"
            onClick={() => executeCommand('insertOrderedList')}
            className="p-1.5 px-2.5 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center text-xs font-semibold gap-1.5"
            title="Danh sách số"
          >
            <ListOrdered className="w-4 h-4" />
            <span className="hidden sm:inline">Thứ tự</span>
          </button>

          <span className="w-px h-5 bg-zinc-800 mx-1" />

          {/* Link */}
          <button
            type="button"
            onClick={addLink}
            className="p-1.5 px-2 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center text-xs font-bold gap-1.5"
            title="Chèn liên kết"
          >
            <LinkIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Link</span>
          </button>

          {/* Quote block */}
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', 'blockquote')}
            className="p-1.5 min-w-[32px] h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center"
            title="Trích dẫn"
          >
            <Quote className="w-4 h-4" />
          </button>

          {/* Clear Format */}
          <button
            type="button"
            onClick={() => executeCommand('removeFormat')}
            className="p-1.5 min-w-[32px] h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center"
            title="Xóa định dạng"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>

        {/* View Toggle */}
        <button
          type="button"
          onClick={() => setIsVisual(!isVisual)}
          className="px-3.5 h-8 rounded-lg text-[10px] font-black font-oswald uppercase tracking-widest transition-all border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-primary hover:border-primary/20 hover:bg-zinc-900 active:scale-95 flex items-center justify-center"
        >
          {isVisual ? (
            <span className="flex items-center gap-1.5"><Code className="w-3.5 h-3.5" /> HTML Code</span>
          ) : (
            <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Visual Editor</span>
          )}
        </button>
      </div>

      {/* Editable Container */}
      {isVisual ? (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className="w-full min-h-[320px] max-h-[600px] overflow-y-auto p-4 text-zinc-300 text-sm focus:outline-none leading-relaxed rich-editor-content"
          data-placeholder={placeholder}
          style={{ outline: 'none' }}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[320px] max-h-[600px] p-4 bg-zinc-950 text-zinc-300 font-mono text-xs leading-relaxed focus:outline-none resize-y border-0 border-t border-zinc-900/60"
          placeholder="Nhập mã HTML trực tiếp..."
        />
      )}
    </div>
  );
}
