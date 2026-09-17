import React, { useEffect, useState } from "react";
import { getServerData, deleteServerData } from "../helper/helper";
import ConfirmModal from "./ConfirmModal";

export default function ResultTable({ email }) {
  const [data, setData] = useState([]);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    const url = email
      ? `/api/result?email=${encodeURIComponent(email)}`
      : `/api/result`;
    getServerData(url, (res) => {
      setData(res);
    });
  }, [email]);

  async function confirmDelete() {
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    await deleteServerData(`/api/result/${id}`);
    setData((prev) => prev.filter((v) => v._id !== id));
  }

  return (
    <div>
      <div className="table-wrapper">
        <table>
          <thead className="table-header">
            <tr className="table-raw">
              <td>Name</td>
              <td>Date</td>
              <td>Attempts</td>
              <td>Earn Points</td>
              <td>Result</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6}>No Data Found</td>
              </tr>
            ) : (
              data.map((v, i) => (
                <tr className="table-body" key={v?._id || i}>
                  <td>{v?.username || ""}</td>
                  <td>
                    {v?.createdAt ? new Date(v.createdAt).toLocaleString() : ""}
                  </td>
                  <td>{v?.attempts || 0}</td>
                  <td>{v?.points || 0}</td>
                  <td>{v?.achieved || ""}</td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => setPendingDeleteId(v._id)}
                      aria-label="Delete entry"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={!!pendingDeleteId}
        title="Delete Result"
        message="Are you sure you want to delete this quiz result? This cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
