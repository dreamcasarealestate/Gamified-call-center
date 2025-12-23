"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Download, Eye, Pencil, Trash2 } from "lucide-react";
import apiClient from "@/Utils/apiClient";
import TableToolbar from "@/commonComponents/TableSearchBar";
import CreateDealModal from "./CreateDealModal.tsx";
import Loader from "@/commonComponents/Loader/";
import Pagination from "@/commonComponents/Pagination";
import toast from "react-hot-toast";

type DealRow = {
  id: string | number;
  dealNo: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  applicantsCount: number;
  career: string;
  closedAt: string;
  agentId: string;
  agentName: string;
  createdByName: string;
  createdAt: string;
  coverageTypes?: string[];
  ffm?: string;
  typeOfWork?: string;
  monthlyIncome?: number;
  documentsNeeded?: string;
  socialProvided?: string;
  customerLanguage?: string;
  notes?: string;
  status?: string;
};

type ListResponse = {
  items: DealRow[];
  total: number;
  page: number;
  limit: number;
};

type SelectOption = { label: string; value: string; disabled?: boolean };

/** ========= Helpers ========= */
const pad2 = (n: number) => String(n).padStart(2, "0");

function formatDateTime(dt: string) {
  const d = new Date(dt);
  return d.toLocaleString(undefined, {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toDateOnly(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function isoToDateTimeLocal(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(
    d.getDate()
  )}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

const LIMIT = 10;

const AraDealsView = () => {
  const [q, setQ] = useState("");
  const [from, setFrom] = useState(
    toDateOnly(new Date(Date.now() - 19 * 24 * 3600 * 1000))
  );
  const [to, setTo] = useState(toDateOnly(new Date()));

  const [page, setPage] = useState(1);

  const [items, setItems] = useState<DealRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [agents, setAgents] = useState<
    { label: string; value: string }[]
  >([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"CREATE" | "EDIT">("CREATE");
  const [editing, setEditing] = useState<DealRow | null>(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / LIMIT)),
    [total]
  );

  /** ---- API calls (swap endpoints to yours) ---- */
  const fetchDeals = async () => {
    setLoading(true);
    try {
      const res: any = await apiClient.get(apiClient.URLS.deals, {}, true);


      const list = Array.isArray(res.body) ? res.body : [];

      setItems(list);
      setTotal(list.length);
    } catch (e) {
      console.error(e);
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    setLoading(true);

    try {
      const res = await apiClient.get(apiClient.URLS.user, {}, true);


      if (res.body && Array.isArray(res.body)) {
        console.log("Agents options:", res.body);
        const options = res.body.map((d: any) => ({
          label: d.firstName,
          value: d.id,
        }));


        setAgents(options);
      }
    } catch (e) {
      console.error(e);


    } finally {
      setLoading(false);
    }
  };

  const createDeal = async (dto: any) => {
    await apiClient.post(apiClient.URLS.deals, dto);
  };
  console.log(agents)

  const updateDeal = async (id: string | number, dto: any) => {
    await apiClient.put(`${apiClient.URLS.deals}/${id}`, dto);
  };

  const removeDeal = async (id: string | number) => {
    await apiClient.delete(`/deals/${id}`);
  };

  /** ---- initial loads ---- */
  useEffect(() => {
    fetchAgents();
  }, []);

  // refetch whenever page changes
  useEffect(() => {
    fetchDeals();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [from, to, q]);

  useEffect(() => {
    fetchDeals();
  }, [from, to, q]);

  /** ---- open modal actions ---- */
  const openCreate = () => {
    setMode("CREATE");
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (deal: DealRow) => {
    setMode("EDIT");
    setEditing(deal);
    setModalOpen(true);
  };

  /** ---- edit prefill (map row -> modal form) ---- */
  const initialValues = useMemo(() => {
    if (!editing) return undefined;

    return {
      coverageTypes: editing.coverageTypes ?? [],
      firstName: editing.firstName ?? "",
      lastName: editing.lastName ?? "",
      numberOfApplicants: String(editing.applicantsCount ?? ""),
      ffm: editing.ffm ?? "",
      career: editing.career ?? "",
      typeOfWork: editing.typeOfWork ?? "",
      monthlyIncome: editing.monthlyIncome ? String(editing.monthlyIncome) : "",
      documentsNeeded: editing.documentsNeeded ?? "",
      socialProvided: editing.socialProvided ?? "",
      customerLanguage: editing.customerLanguage ?? "",
      closedDate: editing.closedAt ? isoToDateTimeLocal(editing.closedAt) : "",
      agentId: editing.agentId ? String(editing.agentId) : "",
      notes: editing.notes ?? "",
      files: [],
    };
  }, [editing]);

  /** ---- submit (create or update) ---- */
  const handleSubmit = async (payload: any) => {
    try {
      const dto = {
        typeOfCoverage: payload.coverageTypes,
        applicantFirstName: payload.firstName,
        applicantLastName: payload.lastName,
        numberOfApplicants: Number(payload.numberOfApplicants || 0),
        ffm: !!payload.ffm,
        carrier: payload.career || "",
        typeOfWork: payload.typeOfWork || "",
        monthlyIncome: Number(payload.monthlyIncome || 0),
        documentsNeeded: payload.documentsNeeded || "",
        socialProvider: payload.socialProvided || "",
        customerLanguage: payload.customerLanguage || "",
        closedDate: payload.closedDate
          ? new Date(payload.closedDate).toISOString()
          : null,
        agentId: payload.agentId || "",
        notes: payload.notes || "",
        status: mode === "EDIT" && editing?.status ? editing.status : "OPEN",
      };

      if (mode === "CREATE") {
        await createDeal(dto);
        toast.success("Deal created successfully!");
      } else if (mode === "EDIT" && editing) {
        await updateDeal(editing.id, dto);
        toast.success("Deal updated successfully!");
      }

      setModalOpen(false);
      await fetchDeals();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };



  const handleDelete = async (deal: DealRow) => {
    try {
      const res = await apiClient.delete(`${apiClient.URLS.deals}/${deal.id}`, {}, true);
      if (res.status === 200) {
        toast.success("Agent deleted successfully");
      }
      await fetchDeals();
    } catch (e) {
      console.error(e);
      toast.error("something went worong");
    }
  };

  const showingText = useMemo(() => {
    if (total === 0) return "Showing 0 entries";
    const start = (page - 1) * LIMIT + 1;
    const end = Math.min(page * LIMIT, total);
    return `Showing ${start} to ${end} of ${total} entries`;
  }, [page, total]);
  if (loading) {
    return (
      <div className="w-full h-full items-center flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-md shadow-2xl p-4 bg-white">
        <TableToolbar
          search={{
            value: q,
            onChange: (v: any) => setQ(v),
            placeholder: "Search...",
            debounceMs: 350,
          }}
          dateRange={{
            value: { from, to },
            onChange: (r: any) => {
              setFrom(r.from);
              setTo(r.to);
            },
          }}
          actionsSlot={
            <>
              <button className="rounded-xl flex items-center gap-2  px-4 py-2 text-sm bg-[#80d26e] font-semibold text-white hover:bg-emerald-600">
                <Download className="w-4 h-4" />
                Excel
              </button>
              <button
                onClick={openCreate}
                className="rounded-xl bg-[#477891] px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                + Create New Deal
              </button>
            </>
          }
        />

        {/* Table */}

        <div className="overflow-auto rounded-md shadow-2xl  min-h-full border border-slate-200  bg-white">
          <table className="min-w-275 min-h-100 w-full text-sm">
            <thead className="bg-slate-50  dark:bg-gray-300 ">
              <tr>
                <th className="px-4 py-3 text-left">Deal #</th>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left"># Applicants</th>
                <th className="px-4 py-3 text-left">Career</th>
                <th className="px-4 py-3 text-left">Closed Date</th>
                <th className="px-4 py-3 text-left">Agent</th>
                <th className="px-4 py-3 text-left">Created By</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No deals found
                  </td>
                </tr>
              ) : (
                items.map((d) => (
                  <tr key={d.id} className="border-t dark:border-slate-800">
                    <td className="px-4 py-3">{d.dealNo}</td>
                    <td className="px-4 py-3">
                      {(d.fullName && d.fullName.trim()) ||
                        `${d.firstName} ${d.lastName}`}
                    </td>
                    <td className="px-4 py-3">{d.applicantsCount}</td>
                    <td className="px-4 py-3">{d.career}</td>
                    <td className="px-4 py-3">{formatDateTime(d.closedAt)}</td>
                    <td className="px-4 py-3">{d.agentName}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{d.createdByName}</div>
                      <div className="text-xs text-slate-500">
                        {formatDateTime(d.createdAt)}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="rounded-md bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                          title="Edit"
                          onClick={() => openEdit(d)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600"
                          title="Delete"
                          onClick={() => handleDelete(d)}
                        >
                          <Trash2 size={16} />
                        </button>

                        <button
                          className="rounded-md bg-cyan-500 p-2 text-white hover:bg-cyan-600"
                          title="View"
                          onClick={() => {
                            // You can route to details page later
                            alert(`View deal ${d.dealNo}`);
                          }}
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="">
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={items.length}
            limit={LIMIT}
            onPageChange={setPage}
          />
        </div>
      </div>

      <CreateDealModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={mode}
        agents={agents}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AraDealsView;
