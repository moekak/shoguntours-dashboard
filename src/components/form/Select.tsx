import { useState, useEffect } from "react"; // useEffectを追加

interface Option {
  value: string;
  label: string;
}

interface SelectProps<T = Option> {
  options: T[];
  placeholder?: string;
  onChange: (value: string, option?: T) => void;
  className?: string;
  value?: string; // ✅ value propを追加
  defaultValue?: string;
  error?: boolean;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  value, // ✅ value propを受け取る
  defaultValue = "",
  error = false,
  disabled = false,
}) => {
  // value propがあればそれを使い、なければ内部状態を使う
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const selectedValue = value !== undefined ? value : internalValue;

  // value propが変更されたら内部状態を更新
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    console.log('🔍 Select onChange:', newValue);
    
    // 内部状態を更新（value propがない場合のみ）
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    const selectedOption = newValue === "" 
      ? undefined 
      : options.find(option => String(option.value) === newValue);
    
    onChange(newValue, selectedOption);
  };

  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent ${
        disabled
          ? "cursor-not-allowed opacity-50 bg-gray-50 dark:bg-gray-800"
          : error
          ? "border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-400 dark:bg-red-900/20 dark:text-red-100 dark:focus:border-red-400"
          : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-800"
      } ${
        selectedValue
          ? "text-gray-800 dark:text-white/90"
          : "text-gray-400 dark:text-gray-400"
      } ${className}`}
      value={selectedValue} // ✅ 同期された値を使用
      onChange={handleChange}
      disabled={disabled}
    >
      <option
        value=""
        disabled
        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </option>
      {options.map((option) => (
        <option
          key={String(option.value)}
          value={String(option.value)}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;