"use client";

import React, { useEffect, useMemo, useState } from "react";
import apiClient from "@/Utils/apiClient";
import { useRouter } from "next/navigation";
import { ChevronLeft, MessageSquare, Search, Hash, User2 } from "lucide-react";
import { toast } from "react-hot-toast";

type ThreadKind = "dm" | "channel";

type ThreadItem = {
  id: string;
  kind: ThreadKind;
  title?: string;
  memberCount?: number;
  unreadCount?: number;
  lastMessage?: string;
  timestamp?: string;
};

type MessageItem = {
  id: string;
  content: string;
  senderId: string;
  senderName?: string;
  timestamp: string;
};

const formatTime = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(d)
    .replace(",", " |");
};

const KindIcon = ({ kind }: { kind: ThreadKind }) => {
  return kind === "channel" ? (
    <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/70 dark:border-emerald-800/40">
      <Hash className="h-4 w-4 text-emerald-700 dark:text-emerald-200" />
    </div>
  ) : (
    <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200/70 dark:border-blue-800/40">
      <User2 className="h-4 w-4 text-blue-700 dark:text-blue-200" />
    </div>
  );
};

export default function UserChatHistoryView({ userId }: { userId: string }) {
  const router = useRouter();

  const [loadingThreads, setLoadingThreads] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [threads, setThreads] = useState<ThreadItem[]>([]);
  const [activeTab, setActiveTab] = useState<ThreadKind>("dm");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedThread, setSelectedThread] = useState<ThreadItem | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const loadThreads = async () => {
    if (!userId) return;
    setLoadingThreads(true);
    try {
      const url = `${apiClient.URLS.chat}/threads/?userId=${encodeURIComponent(
        userId
      )}`;
      const res: any = await apiClient.get(url);

      const list: any[] = res?.body ?? [];
      const mapped: ThreadItem[] = list.map((t) => ({
        id: t.id,
        kind: t.kind,
        title: t.title ?? (t.kind === "channel" ? "Channel" : "DM"),
        memberCount: t.memberCount ?? 0,
        unreadCount: t.unreadCount ?? 0,
        lastMessage: t.lastMessage ?? "",
        timestamp: t.timestamp ?? "",
      }));

      setThreads(mapped);

      // nice default: auto-open first thread of active tab
      // (optional — comment out if you don't want it)
      // const first = mapped.find((x) => x.kind === activeTab);
      // if (first && !selectedThread) openThread(first);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load threads");
    } finally {
      setLoadingThreads(false);
    }
  };

  const loadMessages = async (threadId: string) => {
    if (!userId || !threadId) return;
    setLoadingMessages(true);
    try {
      const url =
        `${apiClient.URLS.chat}/threads/${threadId}/messages` +
        `?userId=${encodeURIComponent(userId)}&limit=200`;
      const res: any = await apiClient.get(url);

      const list = (res?.body?.data ?? res?.body ?? []) as any[];
      const mapped: MessageItem[] = list.map((m) => ({
        id: m.id,
        content: m.content,
        senderId: m.senderId,
        senderName: m.senderName ?? "Unknown",
        timestamp: m.timestamp,
      }));

      setMessages(mapped);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  };

  const openThread = async (t: ThreadItem) => {
    setSelectedThread(t);
    setMessages([]);
    await loadMessages(t.id);
  };

  useEffect(() => {
    if (!userId) return;
    loadThreads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const filteredThreads = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return threads
      .filter((t) => t.kind === activeTab)
      .filter((t) => {
        if (!q) return true;
        const hay = `${t.title ?? ""} ${t.lastMessage ?? ""}`.toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => (b.timestamp || "").localeCompare(a.timestamp || ""));
  }, [threads, activeTab, searchQuery]);

  return (
    <div className="h-screen w-full app-bg">
      {/* Top bar */}
      <div className="app-card border-b app-border">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.push("/chat-history")}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border app-border hover:bg-gray-50 dark:hover:bg-gray-800/40 transition app-card"
            >
              <ChevronLeft className="w-4 h-4 app-text" />
              <span className="btn-text app-text">Back</span>
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>

              <div className="min-w-0">
                <div className="heading-text app-text truncate">
                  Chat History
                  <span className="ml-2 align-middle text-[11px] font-semibold px-2 py-0.5 rounded-full border app-border app-muted">
                    view-only
                  </span>
                </div>
                <div className="sublabel-text app-muted truncate">
                  User: <span className="font-medium">{userId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right slot: you can later add user name/email here */}
          <div className="hidden md:flex items-center gap-2">
            <div className="px-3 py-2 rounded-xl border app-border app-card">
              <span className="sublabel-text app-muted">Admin Inspector</span>
            </div>
          </div>
        </div>

        {/* Tabs + search row */}
        <div className="px-4 md:px-6 pb-3 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("dm")}
              className={`px-4 py-2 rounded-xl btn-text border transition ${
                activeTab === "dm"
                  ? "border-blue-300/60 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-500"
                  : "app-card app-border app-text hover:bg-gray-50 dark:hover:bg-gray-800/40"
              }`}
            >
              Chats
            </button>

            <button
              onClick={() => setActiveTab("channel")}
              className={`px-4 py-2 rounded-xl btn-text border transition ${
                activeTab === "channel"
                  ? "border-emerald-300/60 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-500"
                  : "app-card app-border app-text hover:bg-gray-50 dark:hover:bg-gray-800/40"
              }`}
            >
              Channels
            </button>
          </div>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 app-muted" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search threads by title or last message…"
              className="w-full pl-9 pr-3 py-2 rounded-xl border app-border app-bg label-text focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
        </div>
      </div>

      {/* Main split */}
      <div className="h-[calc(100vh-124px)] flex">
        {/* Left list */}
        <aside className="w-full max-w-md border-r app-border app-card flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
            {loadingThreads ? (
              <div className="p-4 rounded-2xl border app-border app-bg">
                <div className="label-text app-muted">Loading threads…</div>
              </div>
            ) : filteredThreads.length === 0 ? (
              <div className="p-4 rounded-2xl border app-border app-bg">
                <div className="label-text app-muted">No threads found.</div>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredThreads.map((t) => {
                  const isActive = selectedThread?.id === t.id;

                  return (
                    <button
                      key={t.id}
                      onClick={() => openThread(t)}
                      className={`w-full text-left rounded-2xl border p-3 transition ${
                        isActive
                          ? "border-blue-300/70 dark:border-blue-800/60 bg-blue-50/70 dark:bg-blue-900/15"
                          : "app-border hover:bg-gray-50 dark:hover:bg-gray-800/35"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <KindIcon kind={t.kind} />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-medium app-text truncate">
                              {t.title}
                            </div>
                            <div className="sublabel-text app-muted whitespace-nowrap mt-0.5">
                              {formatTime(t.timestamp)}
                            </div>
                          </div>

                          <div className="sublabel-text app-muted truncate mt-1">
                            {t.lastMessage || "—"}
                          </div>

                          <div className="mt-2 flex items-center gap-2">
                            {t.kind === "channel" && (
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200/70 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-900/15 text-emerald-700 dark:text-emerald-400">
                                {t.memberCount ?? 0} members
                              </span>
                            )}

                            {!!t.unreadCount && (
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border border-blue-200/70 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-900/15 text-blue-700 dark:text-blue-200">
                                {t.unreadCount} unread
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Right transcript */}
        <main className="flex-1 min-w-0 flex flex-col">
          {!selectedThread ? (
            <div className="h-full flex items-center justify-center">
              <div className="rounded-2xl border app-border app-card p-6 text-center max-w-md">
                <div className="heading-text app-text">No thread selected</div>
                <div className="label-text app-muted mt-2">
                  Pick a thread from the left to view the full transcript.
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Thread header */}
              <div className="app-card border-b app-border px-5 py-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-medium app-text truncate">
                    {selectedThread.title}
                  </div>
                  <div className="sublabel-text app-muted mt-1">
                    Thread ID:{" "}
                    <span className="font-medium">{selectedThread.id}</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border app-border app-muted">
                    view-only
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-3">
                {loadingMessages ? (
                  <div className="rounded-2xl border app-border app-card p-4">
                    <div className="label-text app-muted text-center">
                      Loading messages…
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="rounded-2xl border app-border app-card p-4">
                    <div className="label-text app-muted">No messages.</div>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className="rounded-2xl border app-border app-card p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-medium app-text truncate">
                            {m.senderName || "Unknown"}
                          </div>
                          <div className="sublabel-text app-muted mt-0.5">
                            Sender ID: {m.senderId}
                          </div>
                        </div>
                        <div className="sublabel-text app-muted whitespace-nowrap mt-0.5">
                          {formatTime(m.timestamp)}
                        </div>
                      </div>

                      <div className="label-text app-text mt-3 whitespace-pre-wrap leading-relaxed">
                        {m.content}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="app-card border-t app-border px-5 py-3">
                <div className="sublabel-text app-muted">
                  View-only mode — sending/editing/deleting is disabled.
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
