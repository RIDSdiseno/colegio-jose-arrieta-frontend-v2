import { useCallback, useEffect, useRef, useState } from "react";
import { toArray } from "../lib/utils";

/**
 * Manages shared state for admin list pages: items, loading, error, and delete confirm.
 * @param {() => Promise<any>} fetchFn - fetch function (module-level or stable ref)
 */
export function useAdminList(fetchFn) {
  const fetchRef = useRef(fetchFn);
  useEffect(() => { fetchRef.current = fetchFn; });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(toArray(await fetchRef.current()));
    } catch (err) {
      setError(err.message ?? "Error al cargar.");
    } finally {
      setLoading(false);
    }
  }, []);

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
      setConfirmId(null);
    } catch (err) {
      setError(err.message ?? "Error al eliminar.");
    } finally {
      setDeleting(false);
    }
  }, []);

  return { items, setItems, loading, error, setError, confirmId, setConfirmId, deleting, cargar, eliminar };
}
