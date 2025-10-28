"use client";

// import * as k8s from "@kubernetes/client-node";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useState } from "react";
import { useAuth } from "@/presentation/hooks/useAuth";

export default function Home() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [testResult, setTestResult] = useState<string>("");

  const testUserCreation = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: `test${Date.now()}@example.com`,
          password: "password123",
        }),
      });
      const data = await response.json();
      if (data.success) {
        setTestResult(`User created: ${data.user.name}`);
      } else {
        setTestResult("Failed to create user");
      }
    } catch (error) {
      setTestResult("Error: " + error);
    }
  };

  const handleLogin = async () => {
    await login("demo@example.com", "password123");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid">
        <div className="col-12">
          <Card
            title="Welcome to NextJS & ReactJS Boilerplate App (With electron)"
            className="shadow-2"
          >
            <p className="m-0 mb-4">
              This is a Next.js + Electron desktop application with SQLite
              database and Clean Architecture.
            </p>

            {/* Auth Section */}
            <div className="mb-4 p-3 bg-blue-50 border-round">
              {isAuthenticated ? (
                <div>
                  <p className="font-bold mb-2">Logged in as: {user?.name}</p>
                  <Button
                    label="Logout"
                    icon="pi pi-sign-out"
                    onClick={logout}
                    size="small"
                  />
                </div>
              ) : (
                <div>
                  <p className="mb-2">Not logged in</p>
                  <Button
                    label="Test Login"
                    icon="pi pi-sign-in"
                    onClick={handleLogin}
                    size="small"
                  />
                </div>
              )}
            </div>

            {/* Database Test Section */}
            <div className="mb-4 p-3 bg-green-50 border-round">
              <p className="font-bold mb-2">Database Test:</p>
              <Button
                label="Create Test User"
                icon="pi pi-user-plus"
                onClick={testUserCreation}
                size="small"
                className="mr-2"
              />
              {testResult && <p className="mt-2">{testResult}</p>}
            </div>

            <div className="flex gap-2">
              <Button
                label="View Database"
                icon="pi pi-database"
                onClick={() => (window.location.href = "/database")}
              />
              <Button
                label="Learn More"
                icon="pi pi-book"
                severity="secondary"
                outlined
              />
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card title="Feature 1" className="shadow-2">
            <p className="m-0">
              <i className="pi pi-check-circle text-green-500 mr-2"></i>
              SQLite database integration
            </p>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card title="Feature 2" className="shadow-2">
            <p className="m-0">
              <i className="pi pi-check-circle text-green-500 mr-2"></i>
              Real-time database monitoring
            </p>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card title="Feature 3" className="shadow-2">
            <p className="m-0">
              <i className="pi pi-check-circle text-green-500 mr-2"></i>
              Clean Architecture pattern
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
