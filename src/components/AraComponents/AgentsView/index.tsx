"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import TableToolbar from "@/commonComponents/TableSearchBar";
import {
  Download,
  Pencil,
  Trash2,
  Key,
  Mail,
  Phone,
  User,
  Lock,
  UserPlus,
  FileSpreadsheet,
  ArrowUp,
  ArrowDown,
  Calendar,
  Check,
} from "lucide-react";
import apiClient from "@/Utils/apiClient";
import Modal from "@/commonComponents/Modal";

import { TextInput } from "@/commonComponents/form/TextInput";
import { Field } from "@/commonComponents/form/Field";
import { MultiSelect } from "@/commonComponents/form/MultiSelect";
import { SingleSelect } from "@/commonComponents/form/SingleSelect";

import {
  DEFAULT_APPS_OPTIONS,
  DEFAULT_ACCESS_OPTIONS,
} from "../../../../src/Utils/constants/ara/constants";
import toast from "react-hot-toast";

export type AgentRole = "Agent" | "Admin" | "SuperAdmin";
// export type AgentAccess = "Training" | "Production" | "QA";
import Papa from "papaparse";
import CSVUploadModal from "./CsvUploadModal";
import Pagination from "@/commonComponents/Pagination";
import Loader from "@/commonComponents/Loader";
import Drawer from "@/commonComponents/Drawers";
export type AgentAccess = "Training" | "FullAccess";

const accessLevelMap: Record<AgentAccess, "TRAINING" | "ALL_ACCESS"> = {
  Training: "TRAINING",
  FullAccess: "ALL_ACCESS",
};

type AgentsRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employee: {
    designation: { name: string; id: number };
  };
  agentProfile: {
    accessLevel: string;
    isActive: boolean;
    id: string;
  };
  userStatus: string;
  password: string;
};

const normalizePhone = (v: string) => v.replace(/[^\d+]/g, "");
const normalizeSSN = (v: string) => v.replace(/[^\d]/g, "").slice(0, 9);

export type AgentForm = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  ssn: string;
  phone: string;
  password: string;

  designation: string;
  npn: string;

  chaseExt: string;
  reportsTo: string;
  chaseDataUsername: string;
  chaseDataPassword: string;
  yearsOfExperience: number | "";
  ahipCertified: boolean;
  stateLicensed: boolean;

  healthSherpaUsername: string;
  healthSherpaPassword: string;

  myMfgUsername: string;
  myMfgPassword: string;

  ffmUsername: string;
  forwarding: string;

  payStructure: string;

  role: AgentRole | "";
  access: AgentAccess | "";
  apps: string[];
};

const emptyForm = (): AgentForm => ({
  firstName: "",
  lastName: "",
  email: "",
  dob: "",
  ssn: "",
  phone: "",

  designation: "",
  reportsTo: "",
  npn: "",
  password: "",
  yearsOfExperience: "",
  ahipCertified: false,
  stateLicensed: false,

  chaseExt: "",
  chaseDataUsername: "",
  chaseDataPassword: "",

  healthSherpaUsername: "",
  healthSherpaPassword: "",

  myMfgUsername: "",
  myMfgPassword: "",

  ffmUsername: "",
  forwarding: "",

  payStructure: "",

  role: "",
  access: "",
  apps: [],
});

export default function AcaAgentsView() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<AgentsRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const LIMIT = 10;
  type SortKey = "firstName" | "lastName" | "email" | "role" | "userStatus";

  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [OpenModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<AgentsRow | null>(null);
  const [designationOptions, setDesignationOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [reportsToOptions, setReportsToOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [form, setForm] = useState<AgentForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = Boolean(editing?.id);

  const [isAgentsLoading, setIsAgentsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openFileModal, setOpenFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [total, setTotal] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<"ACTIVATE" | "DEACTIVATE">(
    "DEACTIVATE"
  );
  const [selectedAgent, setSelectedAgent] = useState<AgentsRow | null>(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [updating, setUpdating] = useState(false);
  const fetchAgents = async () => {
    setLoading(true);

    try {
      const res: any = await apiClient.get(apiClient.URLS.user, {}, true);


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

  // const fetchAgents = async () => {
  //   setLoading(true);
  //   try {
  //     const res: any = await apiClient.get(
  //       apiClient.URLS.user,
  //       { page, limit: LIMIT, q: q.trim() },
  //       true
  //     );
  //     const body = res?.body ?? res;

  //     const list = body?.data?.items || body?.items || body || [];
  //     const totalCount = body?.data?.total || body?.total || list.length;
  //     setItems(Array.isArray(list) ? list : []);
  //     setTotal(totalCount);
  //   } catch (e) {
  //     console.error(e);
  //     setItems([]);
  //     setTotal(0);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchAgents();
  }, [page, q]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setErrors({});
    setOpenModal(true);
  };
  const sortData = (key: SortKey, order: "asc" | "desc") => {
    setSortKey(key);
    setSortOrder(order);
  };
  const sortedItems = useMemo(() => {
    if (!sortKey) return items;

    return [...items].sort((a, b) => {
      const aVal = (a[sortKey as keyof AgentsRow] ?? "")
        .toString()
        .toLowerCase();
      const bVal = (b[sortKey as keyof AgentsRow] ?? "")
        .toString()
        .toLowerCase();

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [items, sortKey, sortOrder]);


  const openEdit = (agent: any) => {
    setEditing(agent);
    setErrors({});

    setForm({
      firstName: agent.firstName || "",
      lastName: agent.lastName || "",
      email: agent.email || "",
      dob: agent.dob || "",
      ssn: agent.ssn || "",
      phone: agent.phone || "",
      password: agent.password || "",


      designation: agent.employee?.designation?.name || "",
      reportsTo: agent.reportsTo || "",


      npn: agent.agentProfile?.npm || "",
      yearsOfExperience: agent.agentProfile?.yearsOfExperience ?? "",
      ahipCertified: Boolean(agent.agentProfile?.ahipCertified),
      stateLicensed: Boolean(agent.agentProfile?.stateLicensed),
      access: agent.agentProfile?.accessLevel || "",


      chaseExt: agent.chaseExt || "",
      chaseDataUsername: agent.chaseDataUsername || "",
      chaseDataPassword: agent.chaseDataPassword || "",
      healthSherpaUsername: agent.healthSherpaUsername || "",
      healthSherpaPassword: agent.healthSherpaPassword || "",
      myMfgUsername: agent.myMfgUsername || "",
      myMfgPassword: agent.myMfgPassword || "",
      ffmUsername: agent.ffmUsername || "",
      forwarding: agent.forwarding || "",
      payStructure: agent.payStructure || "",
      role: agent.systemRole || "",
      apps: agent.apps || [],
    });

    setOpenModal(true);
  };

  // const openEdit = async (agent: AgentsRow) => {
  //   setEditing(agent);
  //   setErrors({});

  //   try {

  //     setForm((p) => ({
  //       ...p,
  //       firstName: agent.firstName || "",
  //       lastName: agent.lastName || "",
  //       email: agent.email || "",

  //     }));
  //   } catch (e) {
  //     console.error(e);

  //     setForm((p) => ({
  //       ...p,
  //       firstName: agent.firstName || "",
  //       lastName: agent.lastName || "",
  //       email: agent.email || "",
  //       // role: (agent.role as any) || "",
  //     }));
  //   }

  //   setOpenModal(true);
  // };

  const isDirty = useMemo(() => {
    const snap = isEditMode ? { ...emptyForm(), ...form } : form;

    if (!isEditMode) {
      const base = emptyForm();
      for (const k of Object.keys(base) as (keyof AgentForm)[]) {
        const a = base[k];
        const b = snap[k];
        if (Array.isArray(a) && Array.isArray(b)) {
          if (a.join("|") !== b.join("|")) return true;
        } else if (String(a ?? "") !== String(b ?? "")) return true;
      }
      return false;
    }

    return true;
  }, [form, isEditMode]);

  const update = <K extends keyof AgentForm>(key: K, value: AgentForm[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key as string]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";

    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      e.email = "Enter valid email";
    if (!form.password) e.password = "password is required";

    if (!form.dob) e.dob = "DOB is required";

    if (form.phone && normalizePhone(form.phone).length < 8) {
      e.phone = "Enter valid contact number";
    }

    if (!form.designation) e.role = "designation is required";
    // if (!form.reportsTo) e.reportsTo = "Reportsto is required";
    if (!form.access) e.access = "Access is required";
    if (!form.apps || form.apps.length === 0)
      e.apps = "Select at least one app";

    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const exportToCSV = (items: AgentsRow[]) => {
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Designation",
      "Access",
      "Status",
    ];

    const rows = items.map((a) => [
      a.firstName,
      a.lastName,
      a.email,
      a.phone ?? "-",
      a.employee?.designation?.name ?? "-",
      a.agentProfile?.accessLevel ?? "-",
      a.userStatus === "Active"
        ? "Active ✅"
        : a.userStatus === "In-Active"
          ? "In-Active ❌"
          : "-",
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "agents.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const res = await apiClient.get(apiClient.URLS.designation, {}, true);

        if (res.body && Array.isArray(res.body)) {
          const options = res.body.map((d: any) => ({
            label: d.name,
            value: d.id,
          }));
          setDesignationOptions(options);
        }
      } catch (err) {
        console.error("Failed to fetch designations", err);
      }
    };

    fetchDesignations();
  }, []);
  useEffect(() => {
    const fetchReportsTo = async (designationId: number) => {
      try {
        const res = await apiClient.get(
          `${apiClient.URLS.employee}/report-to/${designationId}`,
          {},
          true
        );

        if (Array.isArray(res.body)) {
          const options = res.body.map((emp: any) => ({
            label: emp.designation, // DISPLAY
            value: String(emp.id), // SEND
          }));

          setReportsToOptions(options);
        }
      } catch (err) {
        console.error("Failed to fetch reports-to employees", err);
      }
    };

    if (form.designation) {
      fetchReportsTo(Number(form.designation));
    }
  }, [form.designation]);


  const handlePasswordChange = (
    field: "password" | "confirmPassword",
    value: string
  ) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitPassword = async () => {
    if (!selectedAgent) return;
    if (!passwordForm.password || !passwordForm.confirmPassword) {
      toast.error("Both fields are required");
      return;
    }

    if (passwordForm.password !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setUpdating(true);
      const res = await apiClient.patch(
        `${apiClient.URLS.user}/${selectedAgent.id}`,
        {
          user: { password: passwordForm.password },
        }
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("Password updated successfully");
      }

      setPasswordModalOpen(false);
      setPasswordForm({ password: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update password");
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      user: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: normalizePhone(form.phone),
        dob: form.dob,
        password: form.password,
      },

      employee: {
        designationId: form.designation || null,
        reportsToId: form.reportsTo || null,
      },

      agentProfile: {
        npm: form.npn || "TEMP-NPM",
        yearsOfExperience: Number(form.yearsOfExperience || 0),
        ahipCertified: Boolean(form.ahipCertified),
        stateLicensed: Boolean(form.stateLicensed),
        accessLevel: form.access === "FullAccess" ? "ALL_ACCESS" : "TRAINING",
      },
    };

    try {
      setSaving(true);
      let res;

      if (isEditMode && editing) {
        res = await apiClient.patch(
          `${apiClient.URLS.user}/${editing.id}`,
          payload,
          true
        );
      } else {
        res = await apiClient.post(
          `${apiClient.URLS.user}/onboard`,
          payload,
          true
        );
      }

      setOpenModal(false);
      if (res.status === 200 || res.status === 201) {
        toast.success(
          isEditMode && editing
            ? "Agent updated successfully!"
            : "Agent created successfully!"
        );
      }
      setEditing(null);
      setForm(emptyForm());
      await fetchAgents();
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong while saving agent.");
    } finally {
      setSaving(false);
    }
  };
  const openDeactivate = (agent: AgentsRow) => {
    setSelectedAgent(agent);
    setConfirmType("DEACTIVATE");
    setConfirmOpen(true);
  };

  const openActivate = (agent: AgentsRow) => {
    setSelectedAgent(agent);
    setConfirmType("ACTIVATE");
    setConfirmOpen(true);
  };


  const deactivateAgent = async () => {
    if (!selectedAgent) return;

    try {
      await apiClient.patch(
        `${apiClient.URLS.agent}/${selectedAgent.agentProfile?.id}`,
        { isActive: false },
        true
      );

      toast.success("Agent deactivated");
      setConfirmOpen(false);
      await fetchAgents();
    } catch (e) {
      toast.error("Failed to deactivate agent");
    }
  };

  const reactivateAgent = async () => {
    if (!selectedAgent) return;

    try {
      await apiClient.patch(
        `${apiClient.URLS.agent}/${selectedAgent.agentProfile?.id}`,
        { isActive: true },
        true
      );

      toast.success("Agent reactivated");
      setConfirmOpen(false);
      await fetchAgents();
    } catch (e) {
      toast.error("Failed to reactivate agent");
    }
  };


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file");
      return;
    }

    setSelectedFile(file);
  };
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsAgentsLoading(true);
    setUploadProgress(0);

    try {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 20;
        });
      }, 400);

      const formattedData = await parseCSV(selectedFile);

      await sendDataToBackend(formattedData);

      setTimeout(() => {
        setUploadProgress(100);
        setTimeout(() => {
          setOpenFileModal(false); // if you use modal
        }, 800);
      }, 500);
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Error processing CSV file");
    } finally {
      setIsAgentsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const parseCSV = (file: File): Promise<AgentForm[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          try {
            const formattedData: AgentForm[] = result.data.map((row: any) => ({
              firstName: row.firstName || "-",
              lastName: row.lastName || "-",
              email: row.email || "-",
              dob: row.dob || "",
              ssn: row.ssn || "-",
              phone: row.phone || "-",
              designation: row.designation || "-",
              reportsTo: row.reportsTo || "-",
              npn: row.npn || "-",
              password: row.password || "-",

              chaseExt: row.chaseExt || "-",
              chaseDataUsername: row.chaseDataUsername || "-",
              chaseDataPassword: row.chaseDataPassword || "-",

              healthSherpaUsername: row.healthSherpaUsername || "-",
              healthSherpaPassword: row.healthSherpaPassword || "-",
              yearsOfExperience: row.yearsOfExperience
                ? Number(row.yearsOfExperience)
                : "",
              ahipCertified: row.ahipCertified?.toLowerCase() === "true",
              stateLicensed: row.stateLicensed?.toLowerCase() === "true",

              myMfgUsername: row.myMfgUsername || "-",
              myMfgPassword: row.myMfgPassword || "-",

              ffmUsername: row.ffmUsername || "-",
              forwarding: row.forwarding || "-",
              payStructure: row.payStructure || "-",

              role: row.role || "-",
              access: row.access || "-",
              apps: row.apps
                ? row.apps.split("|").map((a: string) => a.trim())
                : [],
            }));

            resolve(formattedData);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => reject(error),
      });
    });
  };
  const sendDataToBackend = async (data: AgentForm[]) => {
    try {
      if (!data.length) {
        toast.error("No valid data found in CSV");
        return;
      }

      const response = await apiClient.post(
        "/agents/bulk",
        { agents: data },
        true
      );

      if (response?.data) {
        toast.success("Agents added successfully");
        await fetchAgents();
      }
    } catch (error) {
      console.error("Error uploading agents:", error);
      toast.error("Failed to upload agents");
      throw error;
    }
  };
  const totalPages = Math.ceil(total / LIMIT);
  if (loading || isAgentsLoading) {
    return (
      <div className="w-full h-full items-center flex justify-center">
        <Loader  />
      </div>
    );
  }
  const SortableTh = ({
    label,
    column,
    className = "",
  }: {
    label: string;
    column: SortKey;
    className?: string;
  }) => {
    const active = sortKey === column;

    return (
      <th
        className={`px-4 md:py-1 py-1 text-left border border-gray-300 ${className}`}
      >
        <div className="flex items-center gap-1 group">
          <span className="font-bold text-black text-nowrap">{label}</span>

          <div className="flex flex-row opacity-0 group-hover:opacity-100 transition">
            <ArrowUp
              size={16}
              className={`cursor-pointer ${active && sortOrder === "asc"
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-black"
                }`}
              onClick={() => sortData(column, "asc")}
            />

            <ArrowDown
              size={16}
              className={`cursor-pointer ${active && sortOrder === "desc"
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-black"
                }`}
              onClick={() => sortData(column, "desc")}
            />
          </div>
        </div>
      </th>
    );
  };

  return (
    <>
      <div className="p-4">
        <div className="overflow-hidden rounded-md shadow-2xl p-4 bg-white">
          <TableToolbar
            search={{
              value: q,
              onChange: (v: any) => setQ(v),
              placeholder: "Search...",
              debounceMs: 350,
            }}
            actionsSlot={
              <>
                <button
                  onClick={() => setOpenFileModal(true)}
                  className="flex items-center gap-2 rounded-xl px-4 py-2 cursor-pointer  text-sm bg-indigo-600 font-semibold text-white hover:bg-indigo-700"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Import CSV
                </button>
                <button
                  className="flex items-center gap-2 rounded-xl px-4 py-2 cursor-pointer  text-sm bg-[#80d26e] font-semibold text-white hover:bg-emerald-600"
                  onClick={() => exportToCSV(items)}
                >
                  <Download className="w-4 h-4" />
                  Excel
                </button>

                <button
                  onClick={openCreate}
                  className="rounded-xl bg-[#477891] cursor-pointer  px-4 py-2 text-sm font-semibold text-white hover:bg-[#3d677c]"
                >
                  + Add New Agent
                </button>
              </>
            }
          />

          <div className="overflow-auto   rounded-md shadow-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <SortableTh label="First Name" column="firstName" />
                  <SortableTh label="Last Name" column="lastName" />
                  <SortableTh
                    label="Email"
                    column="email"
                    className="px-6 py-2 min-w-62.5"
                  />
                  <SortableTh label="Role" column="role" />
                  <SortableTh label="Status" column="userStatus" />
                  <th className="px-4 py-2 text-center border border-gray-300 ">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-black font-bold"
                    >
                      No Agents found
                    </td>
                  </tr>
                ) : (
                  sortedItems.map((a) => (
                    <tr key={a.id} className="border-t text-gray-500">
                      <td className="px-3 md:py-1 py-1 font-medium border text-nowrap border-gray-300 ">
                        {a.firstName}
                      </td>
                      <td className="px-3 md:py-1 py-1 font-medium text-nowrap border border-gray-300 ">
                        {a.lastName}
                      </td>
                      <td className="px-6 md:py-1 py-1 font-medium text-nowrap border border-gray-300 ">
                        {a.email}
                      </td>
                      <td className="px-3 md:py-1 py-1 border text-nowrap border-gray-300 font-medium ">
                        {a?.employee?.designation?.name ?? "-"}
                      </td>

                      <td className="px-3 md:py-1 py-1 border text-nowrap border-gray-300 ">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-nowrap text-sm font-semibold ${a.agentProfile.isActive === true
                              ? "bg-green-500"
                              : "bg-[#ff7f41]"
                            }`}
                        >
                          {a.agentProfile.isActive ? "Active" : "In-active"}
                        </span>
                      </td>

                      <td className="px-4 md:py-1 py-1 border border-gray-300 font-medium ">
                        <div className="flex flex-nowrap items-center justify-center gap-2">
                          <button
                            className="rounded-md bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                            title="Edit"
                            onClick={() => openEdit(a)}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="rounded-md bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                            title="Reset / View Password"
                            onClick={() => {
                              setSelectedAgent(a);
                              setPasswordModalOpen(true);
                            }}
                          >
                            <Key size={16} />
                          </button>
                          {a.agentProfile.isActive ? (
                            <button
                              className="rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600"
                              title="Deactivate"
                              onClick={() => openDeactivate(a)}
                            >
                              <Trash2 size={16} />
                            </button>
                          ) : (
                            <button
                              className="rounded-md bg-green-600 p-2 text-white hover:bg-green-700"
                              title="Activate"
                              onClick={() => openActivate(a)}
                            >
                              <Check size={16} />
                            </button>
                          )}{" "}
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
          {confirmOpen && (
            <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
              <div className="p-6 text-center space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  {confirmType === "DEACTIVATE"
                    ? "Deactivate Agent?"
                    : "Reactivate Agent?"}
                </h3>

                <p className="text-sm text-slate-500">
                  {confirmType === "DEACTIVATE"
                    ? "This agent will be marked as inactive."
                    : "This agent will be reactivated and regain access."}
                </p>

                <div className="flex justify-center gap-3 pt-4">
                  <button
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                    onClick={() => setConfirmOpen(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className={`px-5 py-2 rounded-lg text-white font-medium ${confirmType === "DEACTIVATE"
                        ? "bg-orange-600 hover:bg-orange-700"
                        : "bg-green-600 hover:bg-green-700"
                      }`}
                    onClick={
                      confirmType === "DEACTIVATE"
                        ? deactivateAgent
                        : reactivateAgent
                    }
                  >
                    {confirmType === "DEACTIVATE" ? "Deactivate" : "Reactivate"}
                  </button>
                </div>
              </div>
            </Modal>
          )}

          {passwordModalOpen && (
            <Modal
              open={passwordModalOpen}
              onClose={() => setPasswordModalOpen(false)}
              title="Reset Password"
            // subtitle="Enter a new password for this agent"
            // primaryAction={{
            //   label: updating ? "Updating..." : "Submit",
            //   onClick: submitPassword,
            //   disabled: updating,
            //   loading: updating,
            // }}
            // secondaryAction={{
            //   label: "Cancel",
            //   onClick: () => setPasswordModalOpen(false),
            // }}
            >
              <div className="space-y-4 mt-2">
                <Field label="Password" required>
                  <TextInput
                    type="password"
                    value={passwordForm.password}
                    onChange={(e) =>
                      handlePasswordChange("password", e.target.value)
                    }
                    placeholder="Password"
                    leftIcon={<Lock size={18} />}
                  />
                </Field>

                <Field label="Confirm Password" required>
                  <TextInput
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      handlePasswordChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirm Password"
                    leftIcon={<Lock size={18} />}
                  />
                </Field>
              </div>
              <div className="flex items-end justify-end gap-3 pt-4">
                <button
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                  onClick={() => setPasswordModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-Gordita-Medium px-5 py-2 rounded-lg shadow-lg transition duration-200 ease-in-out  disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={submitPassword}
                >
                  update
                </button>
              </div>
            </Modal>
          )}

          <Drawer
            open={OpenModal}
            handleDrawerToggle={() => setOpenModal(false)}
            panelCls="w-[95%] md:w-[80%] lg:w-[calc(82%-190px)] overflow-x-hidden bg-white shadow-xl z-[9999999]"
            overLayCls="bg-gray-100 bg-opacity-10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-black font-Gordita-Bold text-lg">
                {isEditMode ? (
                  <Pencil size={18} className=" text-purple-600" />
                ) : (
                  <UserPlus size={18} className=" text-purple-600" />
                )}
                <span
                  className="flex items-center gap-2 font-Gordita-Bold text-lg
    bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600
    bg-clip-text text-transparent"
                >
                  {isEditMode ? "Edit Agent" : "Add New Agent"}
                </span>
              </div>
            </div>

            <div className="mb-6 text-sm font-Gordita-Medium text-gray-500">
              {isEditMode
                ? "Update agent details and save changes."
                : "Fill details to create a new agent."}
            </div>

            <div className="flex flex-col md:gap-3 gap-2 border border-gray-200 shadow-sm rounded-md md:p-4 p-2 md:mb-6 mb-3 bg-gray-50">
              <h2
                className="font-Gordita-Bold text-[12px] md:text-[16px] tracking-wide 
  text-indigo-700 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2 mt-2">
                <Field label="First Name" required error={errors.firstName}>
                  <TextInput
                    value={form.firstName}
                    onChange={(e: any) => update("firstName", e.target.value)}
                    placeholder="First Name"
                    leftIcon={<User size={18} />}
                    error={!!errors.firstName}
                  />
                </Field>

                <Field label="Last Name" required error={errors.lastName}>
                  <TextInput
                    value={form.lastName}
                    onChange={(e: any) => update("lastName", e.target.value)}
                    placeholder="Last Name"
                    leftIcon={<User size={18} />}
                    error={!!errors.lastName}
                  />
                </Field>

                <Field label="Email" required error={errors.email}>
                  <TextInput
                    type="email"
                    value={form.email}
                    onChange={(e: any) => update("email", e.target.value)}
                    placeholder="Login Username"
                    leftIcon={<Mail size={18} />}
                    error={!!errors.email}
                  />
                </Field>

                <Field label="Password" required>
                  <TextInput
                    type="password"
                    value={form.password}
                    onChange={(e: any) => update("password", e.target.value)}
                    placeholder="Password"
                    leftIcon={<Lock size={18} />}
                  />
                </Field>

                <Field label="DOB" required error={errors.dob}>
                  <TextInput
                    type="date"
                    value={form.dob}
                    onChange={(e: any) => update("dob", e.target.value)}
                    placeholder="Select DOB"
                    leftIcon={<Calendar size={18} />}
                    error={!!errors.dob}
                  />
                </Field>

                <Field label="SSN">
                  <TextInput
                    value={form.ssn}
                    onChange={(e: any) =>
                      update("ssn", normalizeSSN(e.target.value))
                    }
                    placeholder="SSN"
                  />
                </Field>

                <Field label="Contact Number" error={errors.phone}>
                  <TextInput
                    value={form.phone}
                    onChange={(e: any) =>
                      update("phone", normalizePhone(e.target.value))
                    }
                    placeholder="Contact Number"
                    leftIcon={<Phone size={18} />}
                    error={!!errors.phone}
                  />
                </Field>
              </div>
            </div>

            <div className="flex flex-col md:gap-3 gap-2 border border-gray-200 shadow-sm rounded-md md:p-4 p-2 md:mb-6 mb-3 bg-gray-50">
              <h2
                className="font-Gordita-Bold text-[12px] md:text-[16px] tracking-wide 
  text-indigo-700 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>Work
                Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Field label="Designation" required error={errors.designation}>
                  <SingleSelect
                    value={form.designation}
                    onChange={(v: any) => update("designation", v as any)}
                    options={designationOptions}
                    placeholder="Select Designation"
                    placement="auto"
                  />
                </Field>

                <Field label="Reports To" required error={errors.reportsTo}>
                  <SingleSelect
                    value={form.reportsTo}
                    onChange={(v: any) => update("reportsTo", v as any)}
                    options={reportsToOptions}
                    placeholder="Select Manager"
                    placement="auto"
                  />
                </Field>

                <Field label="NPN">
                  <TextInput
                    value={form.npn}
                    onChange={(e: any) => update("npn", e.target.value)}
                    placeholder="NPN"
                  />
                </Field>

                <Field label="Chase Ext.">
                  <TextInput
                    value={form.chaseExt}
                    onChange={(e: any) => update("chaseExt", e.target.value)}
                    placeholder="Chase Ext."
                  />
                </Field>
              </div>
            </div>

            <div className="flex flex-col md:gap-3 gap-2 border border-gray-200 shadow-sm rounded-md md:p-4 p-2 md:mb-6 mb-3 bg-gray-50">
              <h2
                className="font-Gordita-Bold text-[12px] md:text-[16px] tracking-wide 
  text-indigo-700 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                Login Credentials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Field label="Chase Data Username">
                  <TextInput
                    value={form.chaseDataUsername}
                    onChange={(e: any) =>
                      update("chaseDataUsername", e.target.value)
                    }
                    placeholder="Chase Data Login"
                  />
                </Field>

                <Field label="Chase Data Password">
                  <TextInput
                    type="password"
                    value={form.chaseDataPassword}
                    onChange={(e: any) =>
                      update("chaseDataPassword", e.target.value)
                    }
                    placeholder="Chase Data Password"
                    leftIcon={<Lock size={18} />}
                  />
                </Field>

                <Field label="HealthSherpa Username">
                  <TextInput
                    value={form.healthSherpaUsername}
                    onChange={(e: any) =>
                      update("healthSherpaUsername", e.target.value)
                    }
                    placeholder="HealthSherpa Login"
                  />
                </Field>

                <Field label="HealthSherpa Password">
                  <TextInput
                    type="password"
                    value={form.healthSherpaPassword}
                    onChange={(e: any) =>
                      update("healthSherpaPassword", e.target.value)
                    }
                    placeholder="HealthSherpa Password"
                    leftIcon={<Lock size={18} />}
                  />
                </Field>

                <Field label="MyMFG Username">
                  <TextInput
                    value={form.myMfgUsername}
                    onChange={(e: any) =>
                      update("myMfgUsername", e.target.value)
                    }
                    placeholder="MyMFG Username"
                  />
                </Field>

                <Field label="MyMFG Password">
                  <TextInput
                    type="password"
                    value={form.myMfgPassword}
                    onChange={(e: any) =>
                      update("myMfgPassword", e.target.value)
                    }
                    placeholder="MyMFG Password"
                    leftIcon={<Lock size={18} />}
                  />
                </Field>

                <Field label="FFM Username">
                  <TextInput
                    value={form.ffmUsername}
                    onChange={(e: any) => update("ffmUsername", e.target.value)}
                    placeholder="FFM Username"
                  />
                </Field>
              </div>
            </div>

            <div className="flex flex-col md:gap-3 gap-2 border border-gray-200 shadow-sm rounded-md md:p-4 p-2 md:mb-6 mb-3 bg-gray-50">
              <h2
                className="font-Gordita-Bold text-[12px] md:text-[16px] tracking-wide 
  text-indigo-700 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                Other Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Field label="Forwarding">
                  <TextInput
                    value={form.forwarding}
                    onChange={(e: any) => update("forwarding", e.target.value)}
                    placeholder="Forwarding"
                  />
                </Field>

                <Field label="Pay Structure">
                  <TextInput
                    value={form.payStructure}
                    onChange={(e: any) =>
                      update("payStructure", e.target.value)
                    }
                    placeholder="Pay Structure"
                  />
                </Field>
              </div>
            </div>

            <div className="flex flex-col md:gap-3 gap-2 border border-gray-200 shadow-sm rounded-md md:p-4 p-2 md:mb-6 mb-3 bg-gray-50">
              <h2
                className="font-Gordita-Bold text-[12px] md:text-[16px] tracking-wide 
  text-indigo-700 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                Access & Apps
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Field label="Access" required error={errors.access}>
                  <SingleSelect
                    value={form.access}
                    onChange={(v: any) => update("access", v as any)}
                    options={DEFAULT_ACCESS_OPTIONS}
                    placeholder="Training"
                    placement="auto"
                  />
                </Field>

                <Field label="Apps" required error={errors.apps}>
                  <MultiSelect
                    values={form.apps}
                    onChange={(v: any) => update("apps", v)}
                    options={DEFAULT_APPS_OPTIONS}
                    placeholder="Select"
                    placement="auto"
                    error={!!errors.apps}
                  />
                </Field>
              </div>
            </div>

            <div className="mt-6 mb-2 md:mb-4 flex justify-end gap-3">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-Gordita-Medium px-5 py-2 rounded-lg shadow-sm transition duration-200 ease-in-out cursor-pointer "
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>

              <button
                className="bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-Gordita-Medium px-5 py-2 rounded-lg shadow-lg transition duration-200 ease-in-out  disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={saving}
              >
                {isEditMode ? "Update" : "Submit"}
              </button>
            </div>
          </Drawer>

          <CSVUploadModal
            open={openFileModal}
            onClose={() => {
              setOpenFileModal(false);
              setSelectedFile(null);
            }}
            selectedFile={selectedFile}
            onFileSelect={handleFileUpload}
            onUpload={handleUpload}
            fileInputRef={fileInputRef}
            isLoading={isAgentsLoading}
          />
        </div>
      </div>
    </>
  );
}
