import { useState, useEffect, useCallback } from "react";
import {
  ContentItem,
  ContentStatus,
  ContentCategory,
  CreateContentInput,
} from "@/types/content";
import {
  getAllContentItems,
  createContentItem,
  updateContentItem,
  deleteContentItem,
  searchContentItems,
  markContentAsDone,
  markContentAsTodo,
  getContentItemsCount,
} from "@/db/contentOperations";
import { openDatabase } from "@/db/database";

/**
 * Hook for managing content items
 */
export function useContent(status?: ContentStatus, category?: ContentCategory) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await openDatabase(); // Ensure database is initialized
      const data = await getAllContentItems(status, category);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load items");
      console.error("Error loading content items:", err);
    } finally {
      setLoading(false);
    }
  }, [status, category]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const addItem = useCallback(
    async (input: CreateContentInput) => {
      try {
        const newItem = await createContentItem(input);
        await loadItems(); // Reload to get fresh data
        return newItem;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add item");
        throw err;
      }
    },
    [loadItems]
  );

  const updateItem = useCallback(
    async (id: number, updates: Partial<Omit<ContentItem, "id" | "dateAdded">>) => {
      try {
        const updated = await updateContentItem(id, updates);
        await loadItems(); // Reload to get fresh data
        return updated;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update item");
        throw err;
      }
    },
    [loadItems]
  );

  const removeItem = useCallback(
    async (id: number) => {
      try {
        await deleteContentItem(id);
        await loadItems(); // Reload to get fresh data
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete item");
        throw err;
      }
    },
    [loadItems]
  );

  const markAsDone = useCallback(
    async (id: number) => {
      try {
        await markContentAsDone(id);
        await loadItems(); // Reload to get fresh data
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to mark as done");
        throw err;
      }
    },
    [loadItems]
  );

  const markAsTodo = useCallback(
    async (id: number) => {
      try {
        await markContentAsTodo(id);
        await loadItems(); // Reload to get fresh data
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to mark as todo");
        throw err;
      }
    },
    [loadItems]
  );

  return {
    items,
    loading,
    error,
    refresh: loadItems,
    addItem,
    updateItem,
    removeItem,
    markAsDone,
    markAsTodo,
  };
}

/**
 * Hook for searching content items
 */
export function useContentSearch() {
  const [results, setResults] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    async (query: string, status?: ContentStatus, category?: ContentCategory) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        await openDatabase(); // Ensure database is initialized
        const data = await searchContentItems(query, status, category);
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to search");
        console.error("Error searching content items:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    search,
    clearResults,
  };
}

/**
 * Hook for getting content statistics
 */
export function useContentStats() {
  const [stats, setStats] = useState({
    total: 0,
    done: 0,
    todo: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        await openDatabase(); // Ensure database is initialized
        const [total, done, todo] = await Promise.all([
          getContentItemsCount(),
          getContentItemsCount(ContentStatus.DONE),
          getContentItemsCount(ContentStatus.TODO),
        ]);
        setStats({ total, done, todo });
      } catch (err) {
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return { stats, loading };
}
