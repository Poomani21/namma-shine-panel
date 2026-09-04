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
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Search,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return <LoginCard />;
  if (!isAdmin) return <NotAuthorised email={user.email ?? ""} />;
  return <Dashboard user={user} />;
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-20">
      <Toaster position="top-center" />
      {children}
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
      toast.success("Signed in");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell>
      <div className="card-elegant rounded-lg border bg-card p-7 shadow-sm">
        <h1 className="font-display text-2xl">Namma Laundry Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to manage services and pricing. Changes go live on the website immediately.
        </p>
        <div className="rule-gold mt-5" />
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : null} Sign in
          </Button>
        </form>
      </div>
    </AdminShell>
  );
}

function NotAuthorised({ email }: { email: string }) {
  return (
    <AdminShell>
      <div className="card-elegant rounded-lg border bg-card p-7 text-center shadow-sm">
        <ShieldAlert className="mx-auto size-8 text-primary" />
        <h1 className="mt-4 font-display text-xl">Not an admin account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {email} is signed in but has no admin record. Add a document with this account's UID to the
          <code className="mx-1 rounded bg-muted px-1">admins</code> collection in Firestore.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={async () => signOut(await getFirebaseAuth())}
        >
          <LogOut className="size-4" /> Sign out
        </Button>
      </div>
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
      toast.success("Website data imported into Firestore");
      await reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Import failed");
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
      <Toaster position="top-center" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl">Services &amp; Pricing</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as {user.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ExternalLink className="size-4" /> View website
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={async () => signOut(await getFirebaseAuth())}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </div>
      <div className="rule-gold mt-5" />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {isEmpty && (
            <div className="card-elegant mt-6 rounded-lg border bg-muted/40 p-6">
              <h2 className="flex items-center gap-2 font-display text-lg">
                <DatabaseZap className="size-5 text-primary" /> Import the current website data
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Firestore is empty, so the website is showing its built-in catalogue. Import it once
                and every price and service becomes editable here.
              </p>
              <Button className="mt-4" onClick={seed}>
                Import {staticPriceList.length} prices and {serviceDefs.length} services
              </Button>
            </div>
          )}

          <Tabs defaultValue="prices" className="mt-8">
            <TabsList>
              <TabsTrigger value="prices">Pricing ({prices.length})</TabsTrigger>
              <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
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
    toast.success("Price deleted");
    await onChanged();
  };

  const save = async (item: PriceDoc) => {
    const id = item.id.trim();
    if (!id || !item.name.trim() || !item.group.trim()) {
      toast.error("ID, name and group are required");
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
    toast.success("Price saved");
    setEditing(null);
    await onChanged();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search prices..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setIsNew(true);
            setEditing({ ...emptyPrice, group: groups[0] ?? "" });
          }}
        >
          <Plus className="size-4" /> Add price
        </Button>
      </div>

      <ul className="card-elegant mt-5 divide-y divide-border rounded-lg border bg-card shadow-sm">
        {filtered.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{p.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {p.group} · {p.unit} · id: {p.id}
              </p>
            </div>
            <span className="font-display text-base font-bold text-primary">₹{p.price}</span>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setIsNew(false);
                  setEditing(p);
                }}
                aria-label={`Edit ${p.name}`}
              >
                <Pencil className="size-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => remove(p)} aria-label={`Delete ${p.name}`}>
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-6 py-10 text-center text-sm text-muted-foreground">No prices found.</li>
        )}
      </ul>

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
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "Add price" : "Edit price"}</DialogTitle>
          <DialogDescription>This price updates everywhere it appears on the website.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="p-id">ID</Label>
            <Input
              id="p-id"
              value={draft.id}
              disabled={!isNew}
              onChange={(e) => setDraft({ ...draft, id: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-name">Item name</Label>
            <Input id="p-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="p-price">Price (₹)</Label>
              <Input
                id="p-price"
                type="number"
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-unit">Unit</Label>
              <Input id="p-unit" value={draft.unit} onChange={(e) => setDraft({ ...draft, unit: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-group">Group</Label>
            <Input
              id="p-group"
              list="price-groups"
              value={draft.group}
              onChange={(e) => setDraft({ ...draft, group: e.target.value })}
            />
            <datalist id="price-groups">
              {groups.map((g) => (
                <option key={g} value={g} />
              ))}
            </datalist>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              await onSave(draft);
              setBusy(false);
            }}
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : null} Save
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
    if (!confirm(`Delete the "${s.name}" service page?`)) return;
    const db = await getDb();
    await deleteDoc(doc(db, COLLECTIONS.services, s.slug));
    toast.success("Service deleted");
    await onChanged();
  };

  const save = async (s: ServiceDoc) => {
    const slug = s.slug.trim();
    if (!slug || !s.name.trim()) {
      toast.error("Slug and name are required");
      return;
    }
    const db = await getDb();
    const { slug: _slug, order, ...rest } = s;
    await setDoc(doc(db, COLLECTIONS.services, slug), {
      ...rest,
      order: isNew ? services.length : (order ?? 0),
    });
    toast.success("Service saved");
    setEditing(null);
    await onChanged();
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsNew(true);
            setEditing({ ...emptyService });
          }}
        >
          <Plus className="size-4" /> Add service
        </Button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const price = prices.find((p) => p.id === s.priceId);
          return (
            <div key={s.slug} className="card-elegant flex flex-col rounded-lg border bg-card p-5 shadow-sm">
              <h3 className="font-display text-lg">{s.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.category}</p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{s.short}</p>
              <p className="mt-3 text-sm">
                From <span className="font-display font-bold text-primary">₹{price?.price ?? "—"}</span>{" "}
                <span className="text-xs text-muted-foreground">{price?.unit ?? `(price id: ${s.priceId})`}</span>
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsNew(false);
                    setEditing(s);
                  }}
                >
                  <Pencil className="size-4" /> Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => remove(s)}>
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          );
        })}
        {services.length === 0 && (
          <p className="text-sm text-muted-foreground">No services in Firestore yet.</p>
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
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "Add service" : `Edit ${draft.name}`}</DialogTitle>
          <DialogDescription>
            Shown on the home page, the services list and the service detail page.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="s-slug">Slug (URL)</Label>
              <Input id="s-slug" value={draft.slug} disabled={!isNew} onChange={(e) => set({ slug: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-name">Name</Label>
              <Input id="s-name" value={draft.name} onChange={(e) => set({ name: e.target.value })} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="s-price">Price ID (from Pricing tab)</Label>
              <Input
                id="s-price"
                list="price-ids"
                value={draft.priceId}
                onChange={(e) => set({ priceId: e.target.value })}
              />
              <datalist id="price-ids">
                {prices.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ₹{p.price}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-category">Category</Label>
              <select
                id="s-category"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={draft.category}
                onChange={(e) => set({ category: e.target.value as ServiceDoc["category"] })}
              >
                <option value="everyday">everyday</option>
                <option value="garment">garment</option>
                <option value="home">home</option>
                <option value="specialist">specialist</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-short">Short description</Label>
            <Input id="s-short" value={draft.short} onChange={(e) => set({ short: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-headline">Headline</Label>
            <Input id="s-headline" value={draft.headline} onChange={(e) => set({ headline: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-intro">Intro paragraph</Label>
            <Textarea id="s-intro" rows={3} value={draft.intro} onChange={(e) => set({ intro: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-frequency">Recommended frequency</Label>
            <Input id="s-frequency" value={draft.frequency} onChange={(e) => set({ frequency: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-benefits">Benefits (one per line)</Label>
            <Textarea
              id="s-benefits"
              rows={4}
              value={draft.benefits.join("\n")}
              onChange={(e) => set({ benefits: linesToArray(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-process">Process steps (one per line)</Label>
            <Textarea
              id="s-process"
              rows={4}
              value={draft.process.join("\n")}
              onChange={(e) => set({ process: linesToArray(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-faqs">FAQs — one per line as: Question | Answer</Label>
            <Textarea
              id="s-faqs"
              rows={4}
              value={draft.faqs.map((f) => `${f.q} | ${f.a}`).join("\n")}
              onChange={(e) =>
                set({
                  faqs: linesToArray(e.target.value).map((line) => {
                    const [q, ...rest] = line.split("|");
                    return { q: (q ?? "").trim(), a: rest.join("|").trim() };
                  }),
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              await onSave(draft);
              setBusy(false);
            }}
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : null} Save service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
