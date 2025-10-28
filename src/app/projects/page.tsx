"use client";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Desktop App Project",
      description:
        "A modern desktop application built with Electron and Next.js",
      status: "active",
      technologies: ["Next.js", "Electron", "TypeScript"],
    },
    {
      id: 2,
      title: "Web Platform",
      description: "Full-stack web platform with clean architecture",
      status: "completed",
      technologies: ["React", "Node.js", "PostgreSQL"],
    },
    {
      id: 3,
      title: "Mobile App",
      description: "Cross-platform mobile application",
      status: "planning",
      technologies: ["React Native", "TypeScript"],
    },
  ];

  const getStatusSeverity = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "info";
      case "planning":
        return "warning";
      default:
        return undefined;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid">
        <div className="col-12">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-gray-600 mb-6">
            Explore our portfolio of innovative software solutions
          </p>
        </div>

        {projects.map((project) => (
          <div key={project.id} className="col-12 md:col-6 lg:col-4">
            <Card title={project.title} className="shadow-2 h-full">
              <div className="flex flex-column gap-3">
                <p className="m-0 text-gray-700">{project.description}</p>

                <div className="flex align-items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <Tag
                    value={project.status.toUpperCase()}
                    severity={getStatusSeverity(project.status)}
                  />
                </div>

                <div>
                  <span className="font-semibold block mb-2">
                    Technologies:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Tag key={index} value={tech} severity="secondary" />
                    ))}
                  </div>
                </div>

                <Button
                  label="View Details"
                  icon="pi pi-arrow-right"
                  className="w-full mt-2"
                  outlined
                />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
