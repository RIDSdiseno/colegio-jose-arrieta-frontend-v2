import { useCallback, useEffect, useState } from "react";
import { toArray } from "../lib/utils";

/**
 * Manages shared state for admin list pages: items, loading, error, and delete confirm.
 * @param {() => Promise<any>} fetchFn - module-level function that fetches the list
 */
export function useAdminList(fetchFn) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(toArray(await fetchFn()));
    } catch (err) {
      setError(err.message ?? "Error al cargar.");
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => { cargar(); }, [cargar]);

  /**
   * @param {string|number} id
   * @param {(id: any) => Promise<void>} deleteFn
   * @param {() => void} [afterDelete] - optional side-effect after successful delete (e.g. storage cleanup)
   */
  const eliminar = useCallback(async (id, deleteFn, afterDelete) => {
    setDeleting(true);
    try {
      await deleteFn(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      afterDelete?.();
    } catch (err) {
      setError(err.message ?? "Error al eliminar.");
    } finally {
      setDeleting(false);
      setConfirmId(null);
    }
  }, []);

  return { items, setItems, loading, error, setError, confirmId, setConfirmId, deleting, cargar, eliminar };
}
