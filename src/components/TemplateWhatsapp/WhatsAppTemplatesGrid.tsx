import { useTranslation } from 'react-i18next';
import { getTemplatesExamples } from './templatesExamples';

interface TemplateGalleryProps {
  onSelect: (template: any) => void;
}

export default function MetaTemplatesGrid({ onSelect }: TemplateGalleryProps) {
  const { t } = useTranslation();
  const templatesExamples = getTemplatesExamples(t);

  const renderBodyText = (text: any) => {
    const parts = text.split(/(\{\{.*?\}\}|\n)/g);
    return parts.map((part: any, index: number) => {
      if (part.match(/^\{\{.*?\}\}$/)) {
        return <span key={index} className="text-[#15803d]">{part}</span>;
      } else if (part === '\n') {
        return <br key={index} />;
      }
      return part;
    });
  };

  return (
    <div className="grid gap-6 bg-white dark:bg-black" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
      {templatesExamples.map((template, idx) => (
        <div
          key={`${template.footerId}-${idx}`}
          className="flex flex-col rounded-lg bg-[#f3efe8] dark:bg-[#0b141a] overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer "
          onClick={() => onSelect(template)}
        >
          <div className="p-4 flex justify-center">
            <div className="bg-white dark:bg-[#202c33] rounded-md shadow-sm w-full max-w-[260px]">
              <div className="px-3 pt-3 pb-2">
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-slate-100 mb-1 leading-snug">
                  {template.title}
                </h3>

                <p className="text-[13px] text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {renderBodyText(template.body)}
                </p>

                <div className="mt-1 text-right">
                  <span className="text-[10px] text-gray-400">
                    {template.timestamp}
                  </span>
                </div>
              </div>

              {template.buttons.length > 0 && (
                <div className="border-t border-gray-200">
                  {template.buttons.map((btn, i) => (
                    <div
                      key={i}
                      className={`
                        flex items-center justify-center gap-1
                        py-2 text-[13px] font-semibold text-[#1877F2]
                        hover:bg-gray-50 hover:dark:bg-[#374248] cursor-pointer
                        ${i > 0 ? "border-t border-gray-200" : ""}
                      `}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M14 3h7v7m0-7L10 14"
                          stroke="#1877F2"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {btn}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-black px-3 py-2 border-t border-gray-200 flex justify-between items-center mt-auto">
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wide">
              {template.category}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              {template.footerId}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}