import React from "react";
import { MugFace, type Emotion } from "mugface";

interface PropShowcaseProps<T> {
  title: string;
  type: string;
  description: string;
  values: T[];
  renderCode: (value: T) => string;
  renderAvatar: (value: T) => React.ReactNode;
  accentColor: string;
}

export function PropShowcase<T>({
  title,
  type,
  description,
  values,
  renderCode,
  renderAvatar,
  accentColor,
}: PropShowcaseProps<T>) {
  return (
    <div className="prop-section mb-24 border-t border-white/20 pt-16">
      <div className="mb-10">
        <h3 className={`text-4xl font-display font-bold mb-4 ${accentColor}`}>
          {title}
        </h3>
        <p className="text-lg opacity-80 font-mono bg-white/10 inline-block px-3 py-1 rounded-sm">
          {type}
        </p>
        <p className="text-xl mt-4 max-w-3xl">{description}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <div
            key={index}
            className="prop-card bg-white/5 p-8 border border-white/10 flex flex-col items-center gap-6 hover:bg-white/10 transition-colors"
          >
            {renderAvatar(value)}
            <code className="font-mono text-lg font-bold">{renderCode(value)}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
