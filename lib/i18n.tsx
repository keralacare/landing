"use client";

import React, { createContext } from "react";

import en from "@/locales/en.json";
import ml from "@/locales/ml.json";

const dictionaries = { en, ml } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof dictionaries.en;

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${P extends "" ? "" : "."}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...0[]];

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
          : never;
      }[keyof T]
    : "";

export type TranslationKey = Paths<Dictionary>;

// Get the type of a nested property in an object type using a dot-notation path
type PathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? PathValue<T[K], R>
      : never
    : never;

export const languages = [
  { display: "English", code: "en" },
  { display: "മലയാളം", code: "ml" },
] as const satisfies { display: string; code: Locale }[];

const getDictionary = (locale: Locale) => dictionaries[locale];

type TranslationFunction = <K extends TranslationKey>(
  key: K,
) => PathValue<Dictionary, K>;

interface I18nContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: TranslationFunction;
}

export const I18nContext = createContext<I18nContextType | undefined>(
  undefined,
);

interface I18nProviderProps {
  children: React.ReactNode;
  initialLanguage?: Locale;
}

export const I18nProvider = ({
  children,
  initialLanguage = "en",
}: I18nProviderProps) => {
  const [language, setLanguage] = React.useState<Locale>(
    () => (localStorage.getItem("language") as Locale) || initialLanguage,
  );

  const currentDict = getDictionary(language);
  const englishDict = getDictionary("en");

  const t: TranslationFunction = (key) => {
    const keys = key.split(".");
    let result: unknown = currentDict;
    let fallback: unknown = englishDict;

    for (const k of keys) {
      result = (result as Record<string, unknown>)?.[k];
      fallback = (fallback as Record<string, unknown>)?.[k];
    }

    return (result || fallback || key) as PathValue<Dictionary, typeof key>;
  };

  const handleSetLanguage = (lang: Locale) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <I18nContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = React.useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
