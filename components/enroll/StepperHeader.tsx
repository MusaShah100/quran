'use client';

import React from 'react';

export function StepperHeader({ step, total = 4 }: { step: number; total?: number }) {
  const items = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium">Step {step} of {total}</p>
      </div>
      <div className="flex items-center gap-2">
        {items.map((n, idx) => {
          const isDone = n < step;
          const isActive = n === step;
          return (
            <React.Fragment key={n}>
              <div
                aria-current={isActive ? 'step' : undefined}
                className={
                  `flex h-8 w-8 items-center justify-center rounded-full border text-sm ` +
                  (isActive
                    ? 'bg-blue-500 border-blue-500 text-white shadow-sm'
                    : isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-muted border-muted-foreground/20 text-muted-foreground')
                }
              >
                {n}
              </div>
              {idx < items.length - 1 && (
                <div
                  className={
                    `h-0.5 flex-1 rounded ` +
                    (n < step ? 'bg-emerald-600' : 'bg-muted')
                  }
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
