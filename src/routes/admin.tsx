import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import {
  DatabaseZap,
  ExternalLink,
  IndianRupee,
  Layers,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Search,
  ShieldAlert,
  Sparkles,
  Tag,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { priceList as staticPriceList } from "@/data/pricing";
import { serviceDefs } from "@/data/services";
import type { PriceDoc, ServiceDoc } from "@/lib/catalog";
import { COLLECTIONS, getDb, getFirebaseAuth } from "@/lib/firebase";
import { slugify } from "@/lib/slug";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — Services & Pricing | Namma Laundry" },
      { name: "description", content: "Namma Laundry staff area for managing services and prices." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

/* -------------------------------------------------------------- auth ---- */

type AuthState = { user: User | null; isAdmin: boolean; ready: boolean };

function useAdminAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, isAdmin: false, ready: false });

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;
    void (async () => {
      const auth = await getFirebaseAuth();
      if (cancelled) return;
      unsub = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          setState({ user: null, isAdmin: false, ready: true });
          return;
        }
        let isAdmin = false;
        try {
          const db = await getDb();
          isAdmin = (await getDoc(doc(db, COLLECTIONS.admins, user.uid))).exists();
        } catch {
          isAdmin = false;
        }
        setState({ user, isAdmin, ready: true });
      });
    })();
    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  return state;
}

/* ------------------------------------------------------------- data ----- */

async function fetchAdminData() {
  const db = await getDb();
  const [priceSnap, serviceSnap] = await Promise.all([
    getDocs(collection(db, COLLECTIONS.prices)),
    getDocs(collection(db, COLLECTIONS.services)),
  ]);
  const prices = priceSnap.docs
    .map((d) => ({ ...(d.data() as PriceDoc), id: d.id }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const services = serviceSnap.docs
    .map((d) => ({ ...(d.data() as ServiceDoc), slug: d.id }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return { prices, services };
}

const emptyPrice: PriceDoc = { id: "", name: "", price: 0, unit: "per piece", group: "" };

/* -------------------------------------------------------------- page ---- */

function AdminPage() {
  const { user, isAdmin, ready } = useAdminAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#03150e]">
        <Loader2 className="size-8 animate-spin text-[#d9a74a]" />
        <p className="text-sm font-medium text-[#d9a74a]/80 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) return <LoginCard />;
  if (!isAdmin) return <NotAuthorised email={user.email ?? ""} />;
  return <Dashboard user={user} />;
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-[#03150e] overflow-hidden">
      {/* Background Poster Image */}
      <img
        src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80"
        alt="Background texture"
        className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay pointer-events-none"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03150e]/90 via-[#072a1d]/85 to-[#03150e] pointer-events-none" />

      {/* Outer Decorative Gold Frame Line */}
      <div className="absolute inset-4 border border-[#d9a74a]/30 pointer-events-none rounded-xl" />

      <Toaster position="top-center" />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const auth = await getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success("Signed in successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell>
      <Card className="shadow-2xl border border-[#d9a74a]/40 bg-[#072a1d]/95 backdrop-blur-md overflow-hidden rounded-2xl text-white">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#d9a74a] via-[#f1cb72] to-[#d9a74a]" />
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-[#d9a74a]/10 text-[#d9a74a] border border-[#d9a74a]/40 shadow-[0_0_15px_rgba(217,167,74,0.25)]">
            <Sparkles className="size-6" />
          </div>
          <CardTitle className="font-display text-2xl tracking-tight text-white">Namma Laundry Portal</CardTitle>
          <CardDescription className="text-balance text-xs text-emerald-100/70">
            Sign in to manage active catalog items, service workflows, and pricing schedules.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-[#d9a74a]">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="staff@nammalaundry.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40 focus-visible:ring-[#d9a74a]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold text-[#d9a74a]">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40 focus-visible:ring-[#d9a74a]"
              />
            </div>
            <Button type="submit" className="w-full font-semibold shadow-lg bg-[#d9a74a] hover:bg-[#c49339] text-[#03150e] transition-all" disabled={busy}>
              {busy ? <Loader2 className="mr-2 size-4 animate-spin text-[#03150e]" /> : null}
              Sign in to Admin Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </AdminShell>
  );
}

function NotAuthorised({ email }: { email: string }) {
  return (
    <AdminShell>
      <Card className="shadow-2xl border border-red-500/30 bg-[#072a1d]/95 backdrop-blur-md text-center rounded-2xl text-white">
        <CardHeader className="pb-2">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            <ShieldAlert className="size-6" />
          </div>
          <CardTitle className="font-display text-xl text-white">Access Restricted</CardTitle>
          <CardDescription className="text-xs text-emerald-100/70">
            Account authorized, but administrative privileges are missing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-2">
          <p className="text-sm text-emerald-100">
            Logged in as <span className="font-semibold text-white">{email}</span>. To grant access, add this user ID document into the <code className="rounded bg-[#03150e] px-1.5 py-0.5 text-xs font-mono text-[#d9a74a]">admins</code> collection in Firestore.
          </p>
        </CardContent>
        <CardFooter className="justify-center border-t border-[#0e523b] bg-[#03150e]/40 pt-4 rounded-b-2xl">
          <Button
            variant="outline"
            size="sm"
            className="border-[#d9a74a]/40 text-[#d9a74a] hover:bg-[#d9a74a] hover:text-[#03150e]"
            onClick={async () => signOut(await getFirebaseAuth())}
          >
            <LogOut className="mr-2 size-4" /> Sign out
          </Button>
        </CardFooter>
      </Card>
    </AdminShell>
  );
}

function Dashboard({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-catalog"],
    queryFn: fetchAdminData,
  });

  const reload = async () => {
    await refetch();
    await queryClient.invalidateQueries({ queryKey: ["catalog"] });
  };

  const prices = data?.prices ?? [];
  const services = data?.services ?? [];
  const isEmpty = !isLoading && prices.length === 0 && services.length === 0;

  const seed = async () => {
    try {
      const db = await getDb();
      const batchA = writeBatch(db);
      staticPriceList.forEach((p, i) => {
        batchA.set(doc(db, COLLECTIONS.prices, p.id), { ...p, order: i });
      });
      await batchA.commit();
      const batchB = writeBatch(db);
      serviceDefs.forEach((s, i) => {
        batchB.set(doc(db, COLLECTIONS.services, s.slug), { ...s, order: i });
      });
      await batchB.commit();
      toast.success("Static catalog imported to Firestore");
      await reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Import failed");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03150e] text-emerald-50 pb-20 overflow-hidden">
      {/* Laundromat Background Image */}
      <img
        src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80"
        alt="Laundromat Background"
        className="fixed inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
      />

      {/* Dark Vignette Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#03150e]/90 via-[#072a1d]/85 to-[#03150e] pointer-events-none" />

      {/* Gold Border Frame */}
      <div className="fixed inset-3 border border-[#d9a74a]/25 pointer-events-none rounded-xl z-10" />

      <Toaster position="top-center" />

      {/* Header Banner */}
      <header className="border-b border-[#d9a74a]/30 bg-[#03150e]/90 backdrop-blur-lg sticky top-0 z-20 shadow-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#072a1d] border border-[#d9a74a]/40 p-2 shadow-[0_0_12px_rgba(217,167,74,0.2)]">
              <img
                src="/favicon.png"
                alt="Namma Laundry Logo"
                className="size-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                Namma Laundry Admin
              </h1>
              <p className="text-xs text-emerald-100/70">
                Connected as <span className="font-medium text-[#d9a74a]">{user.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="h-9 border-[#d9a74a]/40 text-[#d9a74a] hover:bg-[#d9a74a] hover:text-[#03150e] bg-transparent transition-all">
              <Link to="/">
                <ExternalLink className="mr-1.5 size-3.5" /> View Main Site
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 text-emerald-100/70 hover:text-white hover:bg-[#072a1d]"
              onClick={async () => signOut(await getFirebaseAuth())}
            >
              <LogOut className="mr-1.5 size-3.5" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-8">
        {isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-[#d9a74a]" />
          </div>
        ) : (
          <>
            {isEmpty && (
              <Card className="border-[#d9a74a]/40 bg-[#d9a74a]/10 backdrop-blur-md shadow-lg mb-6 rounded-2xl text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-[#d9a74a]">
                    <DatabaseZap className="size-5" />
                    <CardTitle className="font-display text-lg">Initial Catalog Setup Required</CardTitle>
                  </div>
                  <CardDescription className="text-emerald-100/80">
                    Firestore collections appear to be unpopulated. Load default items to publish the database.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={seed} className="bg-[#d9a74a] hover:bg-[#c49339] text-[#03150e] font-semibold">
                    Import Defaults ({staticPriceList.length} prices, {serviceDefs.length} services)
                  </Button>
                </CardFooter>
              </Card>
            )}

            <Tabs defaultValue="prices" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-[#072a1d] backdrop-blur-md border border-[#0e523b] rounded-xl">
                <TabsTrigger value="prices" className="text-xs sm:text-sm data-[state=active]:bg-[#d9a74a] data-[state=active]:text-[#03150e] text-emerald-100/70 font-semibold rounded-lg transition-all">
                  <Tag className="mr-2 size-3.5" />
                  Pricing ({prices.length})
                </TabsTrigger>
                <TabsTrigger value="services" className="text-xs sm:text-sm data-[state=active]:bg-[#d9a74a] data-[state=active]:text-[#03150e] text-emerald-100/70 font-semibold rounded-lg transition-all">
                  <Layers className="mr-2 size-3.5" />
                  Services ({services.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="prices" className="mt-6">
                <PricesTab prices={prices} onChanged={reload} />
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <ServicesTab services={services} prices={prices} onChanged={reload} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------ prices ---- */

function PricesTab({ prices, onChanged }: { prices: PriceDoc[]; onChanged: () => Promise<void> }) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<PriceDoc | null>(null);
  const [isNew, setIsNew] = useState(false);

  const groups = useMemo(() => {
    const list: string[] = [];
    for (const p of prices) if (!list.includes(p.group)) list.push(p.group);
    return list;
  }, [prices]);

  const filtered = prices.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.group.toLowerCase().includes(query.toLowerCase()),
  );

  const remove = async (p: PriceDoc) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const db = await getDb();
    await deleteDoc(doc(db, COLLECTIONS.prices, p.id));
    toast.success("Price item removed");
    await onChanged();
  };

  const save = async (item: PriceDoc) => {
    const id = item.id.trim();
    if (!id || !item.name.trim() || !item.group.trim()) {
      toast.error("ID, name and group are required fields");
      return;
    }
    const db = await getDb();
    const order = isNew ? prices.length : (item.order ?? 0);
    await setDoc(doc(db, COLLECTIONS.prices, id), {
      name: item.name.trim(),
      price: Number(item.price) || 0,
      unit: item.unit.trim() || "per piece",
      group: item.group.trim(),
      order,
    });
    toast.success("Price updated");
    setEditing(null);
    await onChanged();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#d9a74a]/70" />
          <Input
            className="pl-9 bg-[#072a1d] border-[#0e523b] text-white placeholder:text-emerald-100/40 focus-visible:ring-[#d9a74a]"
            placeholder="Search price entries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setIsNew(true);
            setEditing({ ...emptyPrice, group: groups[0] ?? "General" });
          }}
          className="shadow-md bg-[#d9a74a] hover:bg-[#c49339] text-[#03150e] font-semibold"
        >
          <Plus className="mr-1.5 size-4" /> Add Price Item
        </Button>
      </div>

      <Card className="overflow-hidden border border-[#0e523b] bg-[#072a1d]/90 backdrop-blur-md shadow-2xl rounded-2xl">
        <div className="divide-y divide-[#0e523b]">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-[#03150e]/50"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{p.name}</span>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-[#d9a74a]/10 border-[#d9a74a]/30 text-[#d9a74a]">
                    {p.group}
                  </Badge>
                </div>
                <p className="text-xs text-emerald-100/60 font-mono">
                  ID: {p.id} • Unit: {p.unit}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-display font-bold text-lg text-[#d9a74a]">₹{p.price}</div>
                  <div className="text-[10px] text-emerald-100/60">{p.unit}</div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setIsNew(false);
                      setEditing(p);
                    }}
                    aria-label={`Edit ${p.name}`}
                    className="size-8 text-emerald-100/70 hover:text-white hover:bg-[#0b3d2b]"
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => remove(p)}
                    aria-label={`Delete ${p.name}`}
                    className="size-8 text-emerald-100/70 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-12 text-center text-sm text-emerald-100/50">
              No pricing records match your search query.
            </div>
          )}
        </div>
      </Card>

      <PriceDialog
        item={editing}
        isNew={isNew}
        groups={groups}
        onClose={() => setEditing(null)}
        onSave={save}
      />
    </div>
  );
}

function PriceDialog({
  item,
  isNew,
  groups,
  onClose,
  onSave,
}: {
  item: PriceDoc | null;
  isNew: boolean;
  groups: string[];
  onClose: () => void;
  onSave: (p: PriceDoc) => Promise<void>;
}) {
  const [draft, setDraft] = useState<PriceDoc>(emptyPrice);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (item) setDraft(item);
  }, [item]);

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-[#072a1d] border-[#0e523b] text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-white">
            {isNew ? "Add Price Item" : "Edit Price Details"}
          </DialogTitle>
          <DialogDescription className="text-xs text-emerald-100/70">
            Changes to this price schedule reflect immediately across service cards.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="p-id" className="text-xs font-medium text-[#d9a74a]">
              System ID <span className="text-emerald-100/50">(Unique)</span>
            </Label>
            <Input
              id="p-id"
              value={draft.id}
              disabled={!isNew}
              placeholder="e.g. shirt-wash"
              onChange={(e) => setDraft({ ...draft, id: e.target.value })}
              className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="p-name" className="text-xs font-medium text-[#d9a74a]">Item display name</Label>
            <Input
              id="p-name"
              placeholder="e.g. Men's Cotton Shirt"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="p-price" className="text-xs font-medium text-[#d9a74a]">Rate (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#d9a74a]" />
                <Input
                  id="p-price"
                  type="number"
                  className="pl-8 bg-[#0b3d2b] border-[#0e523b] text-white"
                  value={draft.price}
                  onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-unit" className="text-xs font-medium text-[#d9a74a]">Unit</Label>
              <Input
                id="p-unit"
                placeholder="per piece / per kg"
                value={draft.unit}
                onChange={(e) => setDraft({ ...draft, unit: e.target.value })}
                className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="p-group" className="text-xs font-medium text-[#d9a74a]">Category group</Label>
            <Input
              id="p-group"
              list="price-groups"
              placeholder="Select or type new group"
              value={draft.group}
              onChange={(e) => setDraft({ ...draft, group: e.target.value })}
              className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
            />
            <datalist id="price-groups">
              {groups.map((g) => (
                <option key={g} value={g} />
              ))}
            </datalist>
          </div>
        </div>

        <DialogFooter className="pt-2 border-t border-[#0e523b]">
          <Button variant="outline" onClick={onClose} size="sm" className="border-[#0e523b] text-emerald-100 hover:bg-[#0b3d2b] hover:text-white">
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={busy}
            className="bg-[#d9a74a] hover:bg-[#c49339] text-[#03150e] font-semibold"
            onClick={async () => {
              setBusy(true);
              await onSave(draft);
              setBusy(false);
            }}
          >
            {busy ? <Loader2 className="mr-2 size-3.5 animate-spin" /> : null} Save Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------------------------------------------------- services ---- */

const emptyService: ServiceDoc = {
  slug: "",
  name: "",
  short: "",
  headline: "",
  intro: "",
  priceId: "",
  frequency: "",
  benefits: [],
  process: [],
  faqs: [],
  category: "everyday",
};

function ServicesTab({
  services,
  prices,
  onChanged,
}: {
  services: ServiceDoc[];
  prices: PriceDoc[];
  onChanged: () => Promise<void>;
}) {
  const [editing, setEditing] = useState<ServiceDoc | null>(null);
  const [isNew, setIsNew] = useState(false);

  const remove = async (s: ServiceDoc) => {
    if (!confirm(`Delete "${s.name}" service?`)) return;
    const db = await getDb();
    await deleteDoc(doc(db, COLLECTIONS.services, s.slug));
    toast.success("Service removed");
    await onChanged();
  };

  const save = async (s: ServiceDoc) => {
    const slug = slugify(s.slug || s.name);
    if (!slug || !s.name.trim()) {
      toast.error("Service name is required");
      return;
    }
    const db = await getDb();
    const { slug: _slug, order, ...rest } = s;
    await setDoc(doc(db, COLLECTIONS.services, slug), {
      ...rest,
      order: isNew ? services.length : (order ?? 0),
    });
    toast.success("Service updated");
    setEditing(null);
    await onChanged();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-xs text-emerald-100/70">
          Configured service offerings visible on front page and service routes.
        </p>
        <Button
          onClick={() => {
            setIsNew(true);
            setEditing({ ...emptyService });
          }}
          className="shadow-md bg-[#d9a74a] hover:bg-[#c49339] text-[#03150e] font-semibold"
        >
          <Plus className="mr-1.5 size-4" /> Add Service
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const price = prices.find((p) => p.id === s.priceId);
          return (
            <Card key={s.slug} className="flex flex-col justify-between border border-[#0e523b] bg-[#072a1d]/90 backdrop-blur-md shadow-xl rounded-2xl text-white transition-all hover:border-[#d9a74a]/60 hover:shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge className="bg-[#d9a74a]/10 border-[#d9a74a]/30 text-[#d9a74a] text-[10px] uppercase tracking-wider">
                    {s.category}
                  </Badge>
                  <span className="font-mono text-[10px] text-emerald-100/50">/{s.slug}</span>
                </div>
                <CardTitle className="font-display text-lg tracking-tight pt-2 text-white">{s.name}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs text-emerald-100/70">{s.short}</CardDescription>
              </CardHeader>

              <CardContent className="py-2">
                <div className="rounded-xl bg-[#03150e] border border-[#0e523b] p-3 text-xs">
                  <span className="text-emerald-100/70">From </span>
                  <span className="font-display font-bold text-[#d9a74a] text-sm">₹{price?.price ?? "—"}</span>{" "}
                  <span className="text-[10px] text-emerald-100/60">
                    {price?.unit ?? `(ID: ${s.priceId || "none"})`}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="pt-2 border-t border-[#0e523b] flex justify-end gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsNew(false);
                    setEditing(s);
                  }}
                  className="h-8 text-xs text-emerald-100/80 hover:text-white hover:bg-[#0b3d2b]"
                >
                  <Pencil className="mr-1 size-3" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => remove(s)}
                  className="h-8 text-xs text-emerald-100/60 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="mr-1 size-3" /> Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })}

        {services.length === 0 && (
          <div className="col-span-full py-12 text-center text-sm text-emerald-100/50">
            No service records found.
          </div>
        )}
      </div>

      <ServiceDialog
        item={editing}
        isNew={isNew}
        prices={prices}
        onClose={() => setEditing(null)}
        onSave={save}
      />
    </div>
  );
}

const linesToArray = (value: string) => value.split("\n").map((l) => l.trim()).filter(Boolean);

function ServiceDialog({
  item,
  isNew,
  prices,
  onClose,
  onSave,
}: {
  item: ServiceDoc | null;
  isNew: boolean;
  prices: PriceDoc[];
  onClose: () => void;
  onSave: (s: ServiceDoc) => Promise<void>;
}) {
  const [draft, setDraft] = useState<ServiceDoc>(emptyService);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (item) setDraft(item);
  }, [item]);

  const set = (patch: Partial<ServiceDoc>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto bg-[#072a1d] border-[#0e523b] text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-white">
            {isNew ? "Add Service Offering" : `Edit Service — ${draft.name}`}
          </DialogTitle>
          <DialogDescription className="text-xs text-emerald-100/70">
            Configure content displayed on dedicated landing routes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="s-name" className="text-xs font-medium text-[#d9a74a]">
                Service Name
              </Label>
              <Input
                id="s-name"
                placeholder="e.g. Wash & Fold"
                value={draft.name}
                onChange={(e) => set({ name: e.target.value })}
                className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="s-slug" className="text-xs font-medium text-[#d9a74a]">
                URL Slug
              </Label>
              <Input
                id="s-slug"
                placeholder="wash-fold"
                value={draft.slug}
                disabled={!isNew}
                onChange={(e) => set({ slug: e.target.value })}
                className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="s-category" className="text-xs font-medium text-[#d9a74a]">
                Category
              </Label>
              <Input
                id="s-category"
                placeholder="e.g. everyday, express, specialty"
                value={draft.category}
                onChange={(e) => set({ category: e.target.value })}
                className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="s-priceId" className="text-xs font-medium text-[#d9a74a]">
                Base Price ID
              </Label>
              <select
                id="s-priceId"
                value={draft.priceId}
                onChange={(e) => set({ priceId: e.target.value })}
                className="w-full h-9 rounded-md bg-[#0b3d2b] border border-[#0e523b] px-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#d9a74a]"
              >
                <option value="">-- Select Price Reference --</option>
                {prices.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (₹{p.price} / {p.unit})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-short" className="text-xs font-medium text-[#d9a74a]">
              Short Summary
            </Label>
            <Input
              id="s-short"
              placeholder="Brief description for catalog grid cards"
              value={draft.short}
              onChange={(e) => set({ short: e.target.value })}
              className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-headline" className="text-xs font-medium text-[#d9a74a]">
              Page Headline
            </Label>
            <Input
              id="s-headline"
              placeholder="Catchy primary headline on detail view"
              value={draft.headline}
              onChange={(e) => set({ headline: e.target.value })}
              className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-intro" className="text-xs font-medium text-[#d9a74a]">
              Full Introduction
            </Label>
            <Textarea
              id="s-intro"
              rows={3}
              placeholder="Detailed introduction paragraph"
              value={draft.intro}
              onChange={(e) => set({ intro: e.target.value })}
              className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-frequency" className="text-xs font-medium text-[#d9a74a]">
              Recommended Frequency
            </Label>
            <Input
              id="s-frequency"
              placeholder="e.g. Weekly, Bi-weekly, As needed"
              value={draft.frequency}
              onChange={(e) => set({ frequency: e.target.value })}
              className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-benefits" className="text-xs font-medium text-[#d9a74a]">
              Key Benefits <span className="text-emerald-100/50">(One per line)</span>
            </Label>
            <Textarea
              id="s-benefits"
              rows={3}
              placeholder={"Eco-friendly detergents\nNext-day turnaround\nSanitized packaging"}
              value={draft.benefits?.join("\n") ?? ""}
              onChange={(e) => set({ benefits: linesToArray(e.target.value) })}
              className="bg-[#0b3d2b] border-[#0e523b] text-white placeholder:text-emerald-100/40 font-mono text-xs"
            />
          </div>
        </div>

        <DialogFooter className="pt-2 border-t border-[#0e523b]">
          <Button variant="outline" onClick={onClose} size="sm" className="border-[#0e523b] text-emerald-100 hover:bg-[#0b3d2b] hover:text-white">
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={busy}
            className="bg-[#d9a74a] hover:bg-[#c49339] text-[#03150e] font-semibold"
            onClick={async () => {
              setBusy(true);
              await onSave(draft);
              setBusy(false);
            }}
          >
            {busy ? <Loader2 className="mr-2 size-3.5 animate-spin" /> : null} Save Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}