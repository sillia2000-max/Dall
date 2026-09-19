import { AppServerData, Student, TaskDescriptions } from '../types';

export async function fetchAppData(): Promise<AppServerData> {
  const res = await fetch('/api/data', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data from server');
  }
  return res.json();
}

export async function updateStudent(id: number, updates: Partial<Student>): Promise<{ success: boolean; student: Student }> {
  const res = await fetch(`/api/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    throw new Error('Failed to update student');
  }
  return res.json();
}

export async function addStudent(data: { num?: number; name: string; avatar?: string; pin?: string }): Promise<{ success: boolean; student: Student }> {
  const res = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to add student');
  }
  return res.json();
}

export async function deleteStudentApi(id: number): Promise<{ success: boolean }> {
  const res = await fetch(`/api/students/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete student');
  }
  return res.json();
}

export async function resetStudentPinApi(id: number): Promise<{ success: boolean; student: Student }> {
  const res = await fetch(`/api/students/${id}/reset-pin`, {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to reset student PIN');
  }
  return res.json();
}

export async function resetAllTasksApi(): Promise<{ success: boolean; students: Student[] }> {
  const res = await fetch('/api/students/reset-all-tasks', {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to reset all tasks');
  }
  return res.json();
}

export async function updateSettingsApi(settings: { adminPin?: string; taskDescriptions?: Partial<TaskDescriptions> }): Promise<{ success: boolean; adminPin: string; taskDescriptions: TaskDescriptions }> {
  const res = await fetch('/api/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!res.ok) {
    throw new Error('Failed to update settings');
  }
  return res.json();
}

export async function verifyAdminPinApi(pin: string): Promise<boolean> {
  const res = await fetch('/api/admin/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin }),
  });
  return res.ok;
}
