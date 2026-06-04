import type { BladeConfig, BladeStyleConfig } from '../../types/config';
import { BladeEditor } from './BladeEditor';

interface Props {
  blades: BladeConfig[];
  uiMode: 'beginner' | 'advanced';
  onStyleChange: (bladeId: string, style: BladeStyleConfig) => void;
}

export function BladeStyleBuilder({ blades, uiMode, onStyleChange }: Props) {
  return (
    <div className="space-y-4">
      {blades.length === 0 && (
        <p className="text-slate-500 text-sm text-center py-8">Add blades in the Hardware step first.</p>
      )}
      {blades.map((blade, i) => (
        <BladeEditor
          key={blade.id}
          style={blade.style}
          label={`Blade ${i + 1}`}
          uiMode={uiMode}
          onChange={style => onStyleChange(blade.id, style)}
        />
      ))}
    </div>
  );
}
