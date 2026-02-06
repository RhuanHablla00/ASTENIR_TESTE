import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import Lucide from "@/components/Base/Lucide";
import { FormInput } from "@/components/Base/Form";
import { useTranslation } from "react-i18next";


interface SearchBarProps {
  onSearch: (value: string) => void;
  delay?: number;
  minChars?: number;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  delay = 400,
  minChars = 3,
  placeholder,
}: SearchBarProps) {
  const [value, setValue] = useState("");
  
  const { t } = useTranslation(); 

  const inputPlaceholder = placeholder || `${t('search')}...`;

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        if (text.length >= minChars) {
          onSearch(text);
        } else {
          onSearch("");
        }
      }, delay),
    [onSearch, minChars, delay]
  );

  useEffect(() => {
    debouncedSearch(value);
    return () => debouncedSearch.cancel();
  }, [value, debouncedSearch]);

  const clearSearch = () => {
    setValue("");
    debouncedSearch.cancel();
    onSearch("");
  };

  return (
    <div className="relative sm:w-64">
      <Lucide
        icon="Search"
        className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
      />

      <FormInput
        type="text"
        placeholder={inputPlaceholder}
        className="pl-9 pr-8 rounded-[0.5rem]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {value.length > 0 && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 mr-3 flex items-center text-slate-500 hover:text-slate-700"
        >
          <Lucide icon="X" className="w-4 h-4 stroke-[1.3]" />
        </button>
      )}
    </div>
  );
}
