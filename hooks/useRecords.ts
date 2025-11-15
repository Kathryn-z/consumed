import { useState, useEffect, useCallback } from "react";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import { getAllConsumptionRecords } from "@/db/consumptionOperations";
import { openDatabase } from "@/db/database";

/**
 * Hook for managing consumption records
 */
export function useRecords() {
  const [records, setRecords] = useState<ConsumptionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await openDatabase(); // Ensure database is initialized
      const data = await getAllConsumptionRecords();
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load records");
      console.error("Error loading consumption records:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  return {
    records,
    loading,
    error,
    refresh: loadRecords,
  };
}
