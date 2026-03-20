import React, { useMemo, useState } from "react";
import "../styles/profile-panel.css";
import { readJson, writeJson } from "../utils/storage";

function getInitials(email) {
  const first = (email || "?").trim().charAt(0).toUpperCase();
  return first || "?";
}

export default function ProfilePanel({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const profileKey = useMemo(
    () => (user?.email ? `profile_${user.email}` : "profile_unknown"),
    [user?.email]
  );

  const [draft, setDraft] = useState(() => {
    const stored = readJson(profileKey, {});
    return {
      name: stored?.name || "",
      mobile: stored?.mobile || user?.mobile || "",
      email: user?.email || "",
      address: stored?.address || "",
    };
  });

  const save = () => {
    writeJson(profileKey, {
      name: draft.name.trim(),
      mobile: draft.mobile.trim(),
      address: draft.address.trim(),
    });
    setOpen(false);
  };

  return (
    <div className="profile-wrap">
      <button
        type="button"
        className="profile-icon"
        onClick={() => setOpen(true)}
        aria-label="Open profile"
        title="Profile"
      >
        {getInitials(user?.email)}
      </button>

      {open && (
        <div className="profile-backdrop" onClick={() => setOpen(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <div className="profile-modal-title">Profile</div>
                <div className="profile-modal-sub">
                  Update your details. Email cannot be changed.
                </div>
              </div>
              <button
                type="button"
                className="profile-close"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="profile-grid">
              <label className="profile-field">
                <span>Name</span>
                <input
                  value={draft.name}
                  onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your name"
                />
              </label>

              <label className="profile-field">
                <span>Mobile</span>
                <input
                  value={draft.mobile}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, mobile: e.target.value }))
                  }
                  placeholder="Mobile number"
                />
              </label>

              <label className="profile-field">
                <span>Email</span>
                <input value={draft.email} disabled />
              </label>

              <label className="profile-field full">
                <span>Address</span>
                <textarea
                  value={draft.address}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="Your address"
                />
              </label>
            </div>

            <div className="profile-actions">
              <button type="button" className="profile-btn ghost" onClick={onLogout}>
                Logout
              </button>
              <button type="button" className="profile-btn" onClick={save}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

