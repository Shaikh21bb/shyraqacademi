"use client";

import { useCallback, useRef, useSyncExternalStore } from 'react';

// Сравниваем «форму» значения из хранилища с initialValue, чтобы повреждённые
// или несовместимые данные не сломали UI. Проверяем по типу и, для массивов, по
// типу элементов.
function isShapeCompatible<T>(parsed: unknown, initial: T): boolean {
  // Примитивы: сравниваем typeof. null/undefined учитываем отдельно (typeof === 'object'/'undefined').
  if (initial === null || initial === undefined) return parsed === initial;
  if (typeof initial !== 'object') return typeof parsed === typeof initial;

  // Массивы: parsed тоже должен быть массивом, и элементы — того же типа.
  if (Array.isArray(initial)) {
    if (!Array.isArray(parsed)) return false;
    const elemType = initial.length > 0 ? typeof initial[0] : undefined;
    if (elemType === undefined) return true;
    return parsed.every((el) => typeof el === elemType);
  }

  // Объекты: проверяем совпадение набора ключей
  if (typeof parsed !== 'object' || parsed === null) return false;
  const initKeys = Object.keys(initial as Record<string, unknown>);
  return initKeys.every((k) => k in (parsed as Record<string, unknown>));
}

type Listener = () => void;

// Глобальный простейший pub/sub для оповещения подписчиков об изменениях
// localStorage (в т.ч. из других вкладок через событие 'storage').
const listeners = new Set<Listener>();
const subscribe = (cb: Listener) => {
  listeners.add(cb);
  const onStorage = () => cb();
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
};
const notify = () => listeners.forEach((l) => l());

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Храним initialValue в ref, чтобы getSnapshot мог читать его без пересоздания
  const initialRef = useRef(initialValue);

  // Читаем текущее значение из localStorage (или initialValue).
  const getSnapshot = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed: unknown = JSON.parse(item);
        if (isShapeCompatible(parsed, initialRef.current)) {
          return parsed as T;
        }
        // Несовместимые данные — удаляем, чтобы не копить мусор
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    return initialRef.current;
  }, [key]);

  const getServerSnapshot = useCallback((): T => initialRef.current, []);

  const storedValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(getSnapshot()) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        notify();
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, getSnapshot],
  );

  return [storedValue, setValue] as const;
}
