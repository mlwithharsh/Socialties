import CreatorApplicationsClient from "@/components/admin/CreatorApplicationsClient";
import { auth } from "@/auth";

export const revalidate = 0; // Dynamic creator applications dashboard

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default async function AdminCreatorApplicationsPage() {
  const session = await auth();
  const token = (session?.user as any)?.accessToken;

  let apps = [];
  try {
    const res = await fetch(`${API_BASE}/api/creator-applications`, {
      cache: "no-store",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (res.ok) apps = await res.json();
  } catch {
    // render with empty list on failure
  }


  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-black tracking-tight">Creator Applications</h1>
        <p className="text-sm text-fg-muted">Manage applications from creators seeking representation.</p>
      </div>

      <CreatorApplicationsClient initialApps={apps} />
    </div>
  );
}
