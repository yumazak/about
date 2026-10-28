import { useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";

import claudeIcon from "@lobehub/icons-static-svg/icons/claude.svg?raw";
import geminiIcon from "@lobehub/icons-static-svg/icons/gemini.svg?raw";
import grokIcon from "@lobehub/icons-static-svg/icons/grok.svg?raw";
import openaiIcon from "@lobehub/icons-static-svg/icons/openai.svg?raw";
import perplexityIcon from "@lobehub/icons-static-svg/icons/perplexity.svg?raw";

const aiPrompt = encodeURIComponent(
  "山崎悠雅（Yuma Yamazaki / yumazak）について、教えてください。\n\nhttps://yumazak.dev/about.md",
);

const aiServices = [
  { name: "ChatGPT", icon: openaiIcon, url: `https://chatgpt.com/?q=${aiPrompt}` },
  { name: "Claude", icon: claudeIcon, url: `https://claude.ai/new?q=${aiPrompt}` },
  { name: "Gemini", icon: geminiIcon, url: `https://www.google.com/search?udm=50&q=${aiPrompt}` },
  {
    name: "Perplexity",
    icon: perplexityIcon,
    url: `https://www.perplexity.ai/search?q=${aiPrompt}`,
  },
  { name: "Grok", icon: grokIcon, url: `https://grok.com/?q=${aiPrompt}` },
];

function SparklesIcon() {
  return (
    <svg
      className="ai-menu__spark"
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      aria-hidden="true"
    >
      <path d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 8.279 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" />
    </svg>
  );
}

export function AskAiMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const getItems = () =>
    itemRefs.current.filter((item): item is HTMLAnchorElement => item !== null);

  const focusItem = (index: number) => {
    requestAnimationFrame(() => {
      const items = getItems();
      const nextIndex = (index + items.length) % items.length;
      items[nextIndex]?.focus();
    });
  };

  const openMenu = (focus: "first" | "last" | "none" = "first") => {
    setOpen(true);

    if (focus !== "none") {
      focusItem(focus === "first" ? 0 : aiServices.length - 1);
    }
  };

  const closeMenu = (restoreFocus = true) => {
    setOpen(false);

    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };

  const handleTriggerClick = () => {
    if (open) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    openMenu(event.key === "ArrowDown" ? "first" : "last");
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  const handleRootKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !open) return;

    event.preventDefault();
    closeMenu();
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = getItems();

    if (items.length === 0) return;

    if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();

    const currentIndex = items.indexOf(document.activeElement as HTMLAnchorElement);
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex =
      currentIndex < 0 ? 0 : (currentIndex + direction + items.length) % items.length;
    items[nextIndex]?.focus();
  };

  return (
    <div className="ai-menu" ref={rootRef} onBlur={handleBlur} onKeyDown={handleRootKeyDown}>
      <button
        ref={triggerRef}
        className="ai-menu__trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        data-open={open}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="ai-menu__label">
          <SparklesIcon />
          Ask AI about me
        </span>
      </button>
      <div
        id={panelId}
        className="ai-menu__panel"
        data-open={open}
        role="presentation"
        aria-hidden={!open}
        inert={!open}
        onKeyDown={handleMenuKeyDown}
      >
        <ul className="ai-menu__list" role="menu" aria-label="AI services">
          {aiServices.map((service, index) => (
            <li key={service.name} role="none">
              <a
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                role="menuitem"
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                title={service.name}
                onClick={() => closeMenu()}
              >
                <span
                  className="ai-menu__icon"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: service.icon }}
                />
                <span>{service.name}</span>
                <span className="ai-menu__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
