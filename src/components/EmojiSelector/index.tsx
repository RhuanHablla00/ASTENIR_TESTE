import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import Lucide from "@/components/Base/Lucide";
import { useAppSelector } from "@/stores/hooks";
import { selectDarkMode } from "@/stores/darkModeSlice";

interface EmojiSelectorProps {
  onEmojiSelect: (emoji: EmojiClickData) => void;
}

export default function EmojiSelector({ onEmojiSelect }: EmojiSelectorProps) {
  const isDark = useAppSelector(selectDarkMode);

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button className="hover:scale-110 transition-transform rounded-md p-2 border-primary border-[0.5px]">
            <Lucide icon="SmilePlus" className="w-4 h-4 text-slate-500" />
          </Popover.Button>

          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute z-2 bottom-full mb-2">
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  onEmojiSelect(emoji);
                  close();
                }}
                previewConfig={{ showPreview: false }}
                skinTonesDisabled
                height={350}
                width={300}
                theme={isDark ? Theme.DARK : Theme.LIGHT}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
