interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Input({ label, value, onChange, placeholder }: InputProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink-soft mb-1 block">{label}</span>
      <input
        className="border border-border rounded-lg px-4 py-3 text-ink placeholder:text-ink-soft w-full focus:outline-none focus:ring-2 focus:ring-primary-tint focus:border-primary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
