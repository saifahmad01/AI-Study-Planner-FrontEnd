import React, { useState, useCallback } from 'react';
import './App.css';
import mascot from './assets/mascot.png';
import { userApi, subjectApi, planApi } from './api/api';

// ─── Toast ───────────────────────────────────────────────────────────────────
function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          <span>{t.type === 'error' ? '✗' : '✓'}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);
  return { toasts, show };
}

// ─── Modal shell ─────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <h2 className="modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
function Spinner() { return <span className="spinner" />; }

// ═══════════════════════════════════════════════════════════════════════════════
// USER SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function UserSection({ show }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // 'create' | 'edit'
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const openCreate = () => { setForm({ name: '', email: '', password: '' }); setModal('create'); };
  const openEdit = u => { setEditTarget(u); setForm({ name: u.name, email: u.email, password: '' }); setModal('edit'); };
  const closeModal = () => { setModal(null); setEditTarget(null); };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await userApi.getAll();
      setUsers(data);
    } catch (e) { show(e.message, 'error'); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === 'create') {
        const u = await userApi.create(form);
        setUsers(prev => [u, ...prev]);
        show(`User "${u.name}" created!`);
      } else {
        const payload = { name: form.name, email: form.email, ...(form.password ? { password: form.password } : {}) };
        const u = await userApi.update(editTarget.id, payload);
        setUsers(prev => prev.map(x => x.id === u.id ? u : x));
        show(`User "${u.name}" updated!`);
      }
      closeModal();
    } catch (e) { show(e.message, 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (u) => {
    if (!window.confirm(`Delete user "${u.name}"?`)) return;
    setDeleting(u.id);
    try {
      await userApi.delete(u.id);
      setUsers(prev => prev.filter(x => x.id !== u.id));
      show(`User "${u.name}" deleted.`);
    } catch (e) { show(e.message, 'error'); }
    finally { setDeleting(null); }
  };

  return (
    <div className="dashboard-section" id="user-section">
      <div className="section-header">
        <span className="section-title">👤 Users</span>
        <div className="section-actions">
          <button id="btn-load-users" className="btn-action btn-outline" onClick={loadUsers} disabled={loading}>
            {loading ? <Spinner /> : '↻ Load Users'}
          </button>
          <button id="btn-create-user" className="btn-action" onClick={openCreate}>+ Create User</button>
        </div>
      </div>

      {loading && <p className="loading-row">Loading users…</p>}

      {users.length > 0 && (
        <ul className="data-list">
          {users.map(u => (
            <li key={u.id} className="data-item" id={`user-item-${u.id}`}>
              <div className="data-item-info">
                <span className="data-item-name">{u.name}</span>
                <span className="data-item-meta">{u.email}</span>
              </div>
              <div className="data-item-actions">
                <button id={`btn-edit-user-${u.id}`} className="btn-action btn-outline btn-sm" onClick={() => openEdit(u)}>Edit</button>
                <button id={`btn-delete-user-${u.id}`} className="btn-action btn-danger btn-sm" onClick={() => handleDelete(u)} disabled={deleting === u.id}>
                  {deleting === u.id ? <Spinner /> : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && users.length === 0 && <p className="empty-state">No users loaded. Click "Load Users" to fetch.</p>}

      {modal && (
        <Modal title={modal === 'create' ? 'Create User' : 'Edit User'} onClose={closeModal}>
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input id="input-user-name" className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input id="input-user-email" className="form-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">{modal === 'edit' ? 'New Password (leave blank to keep)' : 'Password *'}</label>
            <input id="input-user-password" className="form-input" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Min 8 characters" />
          </div>
          <div className="form-footer">
            <button className="btn-action btn-outline" onClick={closeModal} disabled={saving}>Cancel</button>
            <button id="btn-submit-user" className="btn-action" onClick={handleSave} disabled={saving}>
              {saving ? <Spinner /> : (modal === 'create' ? 'Create' : 'Save Changes')}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUBJECT SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function SubjectSection({ show }) {
  const [userId, setUserId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', colorHex: '#6B7280' });
  const [saving, setSaving] = useState(false);
  const [working, setWorking] = useState(null);

  const openCreate = () => { setForm({ name: '', category: '', colorHex: '#6B7280' }); setModal('create'); };
  const openEdit = s => { setEditTarget(s); setForm({ name: s.name, category: s.category || '', colorHex: s.colorHex || '#6B7280' }); setModal('edit'); };
  const closeModal = () => { setModal(null); setEditTarget(null); };

  const loadSubjects = async () => {
    if (!userId.trim()) { show('Enter a User ID first.', 'error'); return; }
    setLoading(true);
    try {
      const data = await subjectApi.getByUser(userId.trim());
      setSubjects(data);
    } catch (e) { show(e.message, 'error'); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    if (!userId.trim()) { show('Enter a User ID first.', 'error'); return; }
    setSaving(true);
    try {
      if (modal === 'create') {
        const s = await subjectApi.create(userId.trim(), form);
        setSubjects(prev => [s, ...prev]);
        show(`Subject "${s.name}" created!`);
      } else {
        const s = await subjectApi.update(editTarget.id, form);
        setSubjects(prev => prev.map(x => x.id === s.id ? s : x));
        show(`Subject "${s.name}" updated!`);
      }
      closeModal();
    } catch (e) { show(e.message, 'error'); }
    finally { setSaving(false); }
  };

  const handleArchive = async (s) => {
    setWorking(s.id + '_arch');
    try {
      const updated = await subjectApi.archive(s.id);
      setSubjects(prev => prev.map(x => x.id === updated.id ? updated : x));
      show(`"${updated.name}" archived.`);
    } catch (e) { show(e.message, 'error'); }
    finally { setWorking(null); }
  };

  const handleDelete = async (s) => {
    if (!window.confirm(`Delete subject "${s.name}"?`)) return;
    setWorking(s.id + '_del');
    try {
      await subjectApi.delete(s.id);
      setSubjects(prev => prev.filter(x => x.id !== s.id));
      show(`Subject "${s.name}" deleted.`);
    } catch (e) { show(e.message, 'error'); }
    finally { setWorking(null); }
  };

  return (
    <div className="dashboard-section" id="subject-section">
      <div className="section-header">
        <span className="section-title">📚 Subjects</span>
        <div className="section-actions">
          <input id="input-subject-userid" className="form-input" style={{ width: 220, marginBottom: 0 }}
            value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID (UUID)" />
          <button id="btn-load-subjects" className="btn-action btn-outline" onClick={loadSubjects} disabled={loading}>
            {loading ? <Spinner /> : '↻ Load'}
          </button>
          <button id="btn-create-subject" className="btn-action" onClick={openCreate}>+ Add Subject</button>
        </div>
      </div>

      {loading && <p className="loading-row">Loading subjects…</p>}

      {subjects.length > 0 && (
        <ul className="data-list">
          {subjects.map(s => (
            <li key={s.id} className="data-item" id={`subject-item-${s.id}`}>
              <div className="data-item-info">
                <span className="data-item-name">
                  {s.colorHex && <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: s.colorHex, marginRight: 6, verticalAlign: 'middle' }} />}
                  {s.name}
                </span>
                <span className="data-item-meta">{s.category || 'No category'}</span>
              </div>
              <div className="data-item-actions">
                {s.isArchived
                  ? <span className="badge badge-archived">Archived</span>
                  : <button id={`btn-archive-subject-${s.id}`} className="btn-action btn-outline btn-sm" onClick={() => handleArchive(s)} disabled={working === s.id + '_arch'}>
                    {working === s.id + '_arch' ? <Spinner /> : 'Archive'}
                  </button>
                }
                <button id={`btn-edit-subject-${s.id}`} className="btn-action btn-outline btn-sm" onClick={() => openEdit(s)}>Edit</button>
                <button id={`btn-delete-subject-${s.id}`} className="btn-action btn-danger btn-sm" onClick={() => handleDelete(s)} disabled={working === s.id + '_del'}>
                  {working === s.id + '_del' ? <Spinner /> : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!loading && subjects.length === 0 && <p className="empty-state">Enter a User ID and click Load.</p>}

      {modal && (
        <Modal title={modal === 'create' ? 'Add Subject' : 'Edit Subject'} onClose={closeModal}>
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input id="input-subject-name" className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Mathematics" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <input id="input-subject-category" className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Science" />
            </div>
            <div className="form-group">
              <label className="form-label">Color</label>
              <input id="input-subject-color" className="form-input" type="color" value={form.colorHex} onChange={e => setForm(f => ({ ...f, colorHex: e.target.value }))} style={{ padding: '4px 8px', height: 44 }} />
            </div>
          </div>
          <div className="form-footer">
            <button className="btn-action btn-outline" onClick={closeModal} disabled={saving}>Cancel</button>
            <button id="btn-submit-subject" className="btn-action" onClick={handleSave} disabled={saving}>
              {saving ? <Spinner /> : (modal === 'create' ? 'Create' : 'Save')}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STUDY PLAN SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function StudyPlanSection({ show }) {
  const [userId, setUserId] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // 'create'|'edit'|'sessions'|'complete'
  const [editTarget, setEditTarget] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [sessLoading, setSessLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [working, setWorking] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  const blankPlan = { title: '', goal: '', subjectId: '', startDate: today, endDate: '', dailyHours: 2, difficulty: 'MEDIUM', topics: '' };
  const [form, setForm] = useState(blankPlan);

  const [completeForm, setCompleteForm] = useState({ actualDurationMinutes: '', focusScore: '', notes: '' });
  const [completeTarget, setCompleteTarget] = useState(null);

  const openCreate = () => { setForm(blankPlan); setModal('create'); };
  const openEdit = p => { setEditTarget(p); setForm({ title: p.title, goal: p.goal || '', subjectId: p.subjectId || '', startDate: p.startDate, endDate: p.endDate, dailyHours: p.dailyHours, difficulty: p.difficulty, topics: '' }); setModal('edit'); };
  const closeModal = () => { setModal(null); setEditTarget(null); setSessions([]); setCompleteTarget(null); };

  const loadPlans = async () => {
    if (!userId.trim()) { show('Enter a User ID first.', 'error'); return; }
    setLoading(true);
    try {
      const data = await planApi.getByUser(userId.trim());
      setPlans(data);
    } catch (e) { show(e.message, 'error'); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        title: form.title, goal: form.goal,
        subjectId: form.subjectId || null,
        startDate: form.startDate, endDate: form.endDate,
        dailyHours: parseInt(form.dailyHours, 10),
        difficulty: form.difficulty,
        topics: form.topics ? form.topics.split(',').map(t => t.trim()).filter(Boolean) : [],
      };
      if (modal === 'create') {
        if (!userId.trim()) { show('Enter a User ID first.', 'error'); return; }
        const p = await planApi.create(userId.trim(), payload);
        setPlans(prev => [p, ...prev]);
        show(`Plan "${p.title}" created with ${p.totalSessions} sessions!`);
      } else {
        const p = await planApi.update(editTarget.id, payload);
        setPlans(prev => prev.map(x => x.id === p.id ? p : x));
        show(`Plan "${p.title}" updated!`);
      }
      closeModal();
    } catch (e) { show(e.message, 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete plan "${p.title}"?`)) return;
    setWorking(p.id + '_del');
    try {
      await planApi.delete(p.id);
      setPlans(prev => prev.filter(x => x.id !== p.id));
      show(`Plan "${p.title}" deleted.`);
    } catch (e) { show(e.message, 'error'); }
    finally { setWorking(null); }
  };

  const openSessions = async (p) => {
    setEditTarget(p); setModal('sessions'); setSessLoading(true); setSessions([]);
    try {
      const data = await planApi.getSessions(p.id);
      setSessions(data);
    } catch (e) { show(e.message, 'error'); }
    finally { setSessLoading(false); }
  };

  const openComplete = (sess) => {
    setCompleteTarget(sess);
    setCompleteForm({ actualDurationMinutes: sess.durationMinutes || '', focusScore: '', notes: '' });
    setModal('complete');
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      const body = {
        actualDurationMinutes: completeForm.actualDurationMinutes ? parseInt(completeForm.actualDurationMinutes, 10) : null,
        focusScore: completeForm.focusScore ? parseInt(completeForm.focusScore, 10) : null,
        notes: completeForm.notes || null,
      };
      const updated = await planApi.completeSession(completeTarget.id, body);
      setSessions(prev => prev.map(s => s.id === updated.id ? updated : s));
      // update completedSessions count in plan list
      setPlans(prev => prev.map(p => p.id === editTarget?.id ? { ...p, completedSessions: (p.completedSessions || 0) + 1 } : p));
      show('Session marked complete! 🎉');
      setModal('sessions');
    } catch (e) { show(e.message, 'error'); }
    finally { setSaving(false); }
  };

  const badgeClass = s => {
    if (s === 'ACTIVE') return 'badge-active';
    if (s === 'PAUSED') return 'badge-paused';
    if (s === 'COMPLETED') return 'badge-done';
    return 'badge-archived';
  };

  return (
    <div className="dashboard-section" id="plan-section">
      <div className="section-header">
        <span className="section-title">📋 Study Plans</span>
        <div className="section-actions">
          <input id="input-plan-userid" className="form-input" style={{ width: 220, marginBottom: 0 }}
            value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID (UUID)" />
          <button id="btn-load-plans" className="btn-action btn-outline" onClick={loadPlans} disabled={loading}>
            {loading ? <Spinner /> : '↻ Load'}
          </button>
          <button id="btn-create-plan" className="btn-action" onClick={openCreate}>+ New Plan</button>
        </div>
      </div>

      {loading && <p className="loading-row">Loading plans…</p>}

      {plans.length > 0 && (
        <ul className="data-list">
          {plans.map(p => {
            const pct = p.totalSessions > 0 ? Math.round((p.completedSessions / p.totalSessions) * 100) : 0;
            return (
              <li key={p.id} className="data-item" id={`plan-item-${p.id}`}>
                <div className="data-item-info">
                  <span className="data-item-name">{p.title}</span>
                  <span className="data-item-meta">
                    {p.startDate} → {p.endDate} · {p.completedSessions}/{p.totalSessions} sessions · {p.difficulty}
                  </span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="data-item-actions">
                  <span className={`badge ${badgeClass(p.status)}`}>{p.status}</span>
                  <button id={`btn-view-sessions-${p.id}`} className="btn-action btn-outline btn-sm" onClick={() => openSessions(p)}>Sessions</button>
                  <button id={`btn-edit-plan-${p.id}`} className="btn-action btn-outline btn-sm" onClick={() => openEdit(p)}>Edit</button>
                  <button id={`btn-delete-plan-${p.id}`} className="btn-action btn-danger btn-sm" onClick={() => handleDelete(p)} disabled={working === p.id + '_del'}>
                    {working === p.id + '_del' ? <Spinner /> : 'Delete'}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {!loading && plans.length === 0 && <p className="empty-state">Enter a User ID and click Load.</p>}

      {/* ── Create / Edit Plan Modal ── */}
      {(modal === 'create' || modal === 'edit') && (
        <Modal title={modal === 'create' ? 'New Study Plan' : 'Edit Plan'} onClose={closeModal}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input id="input-plan-title" className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Math Exam Prep" />
          </div>
          <div className="form-group">
            <label className="form-label">Goal</label>
            <textarea id="input-plan-goal" className="form-textarea" value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))} placeholder="What do you want to achieve?" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input id="input-plan-start" className="form-input" type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">End Date *</label>
              <input id="input-plan-end" className="form-input" type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Daily Hours</label>
              <input id="input-plan-hours" className="form-input" type="number" min="1" max="16" value={form.dailyHours} onChange={e => setForm(f => ({ ...f, dailyHours: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select id="input-plan-difficulty" className="form-select" value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Topics (comma-separated, optional)</label>
            <input id="input-plan-topics" className="form-input" value={form.topics} onChange={e => setForm(f => ({ ...f, topics: e.target.value }))} placeholder="e.g. Algebra, Geometry, Calculus" />
          </div>
          <div className="form-footer">
            <button className="btn-action btn-outline" onClick={closeModal} disabled={saving}>Cancel</button>
            <button id="btn-submit-plan" className="btn-action" onClick={handleSave} disabled={saving}>
              {saving ? <Spinner /> : (modal === 'create' ? 'Generate Plan' : 'Save')}
            </button>
          </div>
        </Modal>
      )}

      {/* ── Sessions Modal ── */}
      {modal === 'sessions' && (
        <Modal title={`Sessions — ${editTarget?.title}`} onClose={closeModal}>
          {sessLoading && <p className="loading-row">Loading sessions…</p>}
          {!sessLoading && sessions.length === 0 && <p className="empty-state">No sessions found.</p>}
          <ul className="data-list">
            {sessions.map(s => (
              <li key={s.id} className="data-item" id={`session-item-${s.id}`}>
                <div className="data-item-info">
                  <span className="data-item-name">{s.topic}</span>
                  <span className="data-item-meta">{s.scheduledDate} · {s.durationMinutes} min</span>
                </div>
                <div className="data-item-actions">
                  {s.completed
                    ? <span className="badge badge-done">✓ Done</span>
                    : <button id={`btn-complete-session-${s.id}`} className="btn-action btn-sm" onClick={() => openComplete(s)}>Complete</button>
                  }
                </div>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {/* ── Complete Session Modal ── */}
      {modal === 'complete' && completeTarget && (
        <Modal title={`Complete: ${completeTarget.topic}`} onClose={() => setModal('sessions')}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Actual Duration (min)</label>
              <input id="input-complete-duration" className="form-input" type="number" min="1" value={completeForm.actualDurationMinutes} onChange={e => setCompleteForm(f => ({ ...f, actualDurationMinutes: e.target.value }))} placeholder={completeTarget.durationMinutes} />
            </div>
            <div className="form-group">
              <label className="form-label">Focus Score (1–10)</label>
              <input id="input-complete-focus" className="form-input" type="number" min="1" max="10" value={completeForm.focusScore} onChange={e => setCompleteForm(f => ({ ...f, focusScore: e.target.value }))} placeholder="8" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea id="input-complete-notes" className="form-textarea" value={completeForm.notes} onChange={e => setCompleteForm(f => ({ ...f, notes: e.target.value }))} placeholder="How did the session go?" />
          </div>
          <div className="form-footer">
            <button className="btn-action btn-outline" onClick={() => setModal('sessions')} disabled={saving}>Back</button>
            <button id="btn-submit-complete" className="btn-action" onClick={handleComplete} disabled={saving}>
              {saving ? <Spinner /> : 'Mark Complete ✓'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════
function App() {
  const { toasts, show } = useToast();
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="app-wrapper">
      <div className="app-container">

        {/* ── Navbar ─────────────────────────────────── */}
        <nav className="navbar" id="navbar">
          <div className="nav-logo" id="nav-logo">
            <span className="logo-icon">💡</span>
            <span className="logo-text">AI Study</span>
          </div>
          <div className="nav-links">
            <a href="#dashboard" className="nav-link" id="nav-dashboard"
              onClick={e => { e.preventDefault(); setShowDashboard(true); }}>
              •Dashboard•
            </a>
            <a href="#about" className="nav-link" id="nav-about">•About•</a>
            <button className="btn-signup" id="btn-signup" onClick={() => setShowDashboard(true)}>Sign Up</button>
          </div>
        </nav>

        {/* ── Hero Section ───────────────────────────── */}
        <section className="hero" id="hero-section">
          <div className="hero-bg-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-dot shape-dot-1">💛</div>
            <div className="shape shape-dot shape-dot-2">💛</div>
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                AI Smart <span className="text-highlight">Study</span>
                <br />Planner
              </h1>
              <p className="hero-subtitle">Boost your study efficiency with AI!</p>
              <button className="btn-get-started" id="btn-get-started" onClick={() => setShowDashboard(true)}>
                Get Started
              </button>
            </div>
            <div className="hero-image">
              <img src={mascot} alt="AI Study Planner Robot Mascot" className="mascot-img" />
            </div>
          </div>
        </section>

        {/* ── Features Section ───────────────────────── */}
        <section className="features" id="features-section">
          <FeatureCard
            icon="📋" iconBg="feature-icon-blue"
            title="Personalized Study Plans"
            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy"
          />
          <FeatureCard
            icon="🔔" iconBg="feature-icon-orange"
            title="Task Reminders"
            description="Lorem ipsum dolor sit amet, csectetuer adipiscing elit, sed diam nonummy"
          />
          <FeatureCard
            icon="📊" iconBg="feature-icon-teal"
            title="Progress Tracking"
            description="Lorem ipsum dolor sit amet, ossectetuer adipiscing elit, sed diam nonummy"
          />
        </section>

        {/* ── Dashboard (shown after Get Started) ─────── */}
        {showDashboard && (
          <section id="dashboard" className="dashboard">
            <UserSection show={show} />
            <SubjectSection show={show} />
            <StudyPlanSection show={show} />
          </section>
        )}

      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

function FeatureCard({ icon, iconBg, title, description }) {
  return (
    <div className="feature-card">
      <div className={`feature-icon ${iconBg}`}>
        <span className="feature-emoji">{icon}</span>
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  );
}

export default App;
