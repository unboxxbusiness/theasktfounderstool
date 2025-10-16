export function MarkdownReport({ content }: { content: string }) {
  // Simple renderer for basic markdown
  const renderContent = () => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold mt-6 mb-3 border-b pb-2">{line.substring(3)}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-8 mb-4 border-b pb-2">{line.substring(2)}</h1>;
      }
      if (line.startsWith('* ')) {
        return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      // Replace **bold** with <strong>
      const boldedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={index} dangerouslySetInnerHTML={{ __html: boldedLine }} />;
    });
  };

  return (
    <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
      {renderContent()}
    </div>
  );
}
