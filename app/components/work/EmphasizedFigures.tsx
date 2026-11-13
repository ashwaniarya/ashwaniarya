const figurePattern = /((?<![\w.])~?\$?\d[\d,.]*[kKM%x]?)/g;

export function EmphasizedFigures({ text }: Readonly<{ text: string }>) {
  return text.split(figurePattern).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-accentPrimary">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
