"use client";

import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface TableStat {
  name: string;
  rowCount: number;
}

export default function DatabasePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [tables, setTables] = useState<TableStat[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTables = async () => {
    try {
      const response = await fetch("/api/database");
      const data = await response.json();
      if (data.success) {
        setTables(data.tables);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const handleSeedData = async () => {
    try {
      const response = await fetch("/api/database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "seed" }),
      });
      const data = await response.json();
      if (data.success) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Data seeded successfully",
        });
        fetchUsers();
        fetchTables();
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Failed to seed data ${error}`,
      });
    }
  };

  const handleClearData = async () => {
    try {
      const response = await fetch("/api/database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear" }),
      });
      const data = await response.json();
      if (data.success) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Data cleared successfully",
        });
        fetchUsers();
        fetchTables();
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Failed to clear data ${error}`,
      });
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTables();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Toast ref={toast} />

      <div className="grid">
        <div className="col-12">
          <h1 className="text-4xl font-bold mb-4">Database Monitor</h1>
          <p className="text-gray-600 mb-6">
            SQLite database monitoring and management
          </p>
        </div>

        <div className="col-12 md:col-6">
          <Card title="Database Statistics" className="shadow-2">
            {tables.map((table) => (
              <div
                key={table.name}
                className="flex justify-content-between align-items-center mb-2"
              >
                <span className="font-semibold">{table.name}:</span>
                <span className="text-blue-600">{table.rowCount} rows</span>
              </div>
            ))}
          </Card>
        </div>

        <div className="col-12 md:col-6">
          <Card title="Quick Actions" className="shadow-2">
            <div className="flex flex-column gap-2">
              <Button
                label="Seed Sample Data"
                icon="pi pi-plus"
                onClick={handleSeedData}
                severity="success"
              />
              <Button
                label="Clear All Data"
                icon="pi pi-trash"
                onClick={handleClearData}
                severity="danger"
                outlined
              />
              <Button
                label="Refresh Data"
                icon="pi pi-refresh"
                onClick={() => {
                  fetchUsers();
                  fetchTables();
                }}
              />
            </div>
          </Card>
        </div>

        <div className="col-12">
          <Card title="Users Table" className="shadow-2">
            <DataTable
              value={users}
              loading={loading}
              paginator
              rows={10}
              emptyMessage="No users found"
            >
              <Column field="id" header="ID" />
              <Column field="name" header="Name" />
              <Column field="email" header="Email" />
              <Column
                field="createdAt"
                header="Created At"
                body={(rowData) => new Date(rowData.createdAt).toLocaleString()}
              />
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  );
}
