import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchService {
  /** GET helper that returns `{ data }` to loosely mimic Axios’ response shape */
  async get<T = any>(url: string, init?: RequestInit): Promise<{ data: T }> {
    const res = await fetch(url, { method: 'GET', ...init });
    if (!res.ok) {
      // Normalise error handling (optional)
      throw new Error(`Fetch error ${res.status}: ${await res.text()}`);
    }
    const data = (await res.json()) as T;
    return { data };
  }

  // Extra verbs can be added when needed
  async post<T = any>(
    url: string,
    body: any,
    init?: RequestInit,
  ): Promise<{ data: T }> {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      ...init,
    });
    if (!res.ok)
      throw new Error(`Fetch error ${res.status}: ${await res.text()}`);
    return { data: (await res.json()) as T };
  }
}
