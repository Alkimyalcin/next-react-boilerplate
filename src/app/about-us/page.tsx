"use client";

import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid">
        <div className="col-12">
          <Card title="About Us" className="shadow-2">
            <p className="m-0 mb-4">
              We are a team dedicated to building high-quality desktop
              applications using modern web technologies and clean architecture
              principles.
            </p>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card className="shadow-2">
            <div className="flex flex-column align-items-center text-center">
              <Avatar
                icon="pi pi-user"
                size="xlarge"
                shape="circle"
                className="mb-3"
              />
              <h3 className="mt-0 mb-2">Team Member 1</h3>
              <p className="text-gray-600 mb-0">Lead Developer</p>
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card className="shadow-2">
            <div className="flex flex-column align-items-center text-center">
              <Avatar
                icon="pi pi-user"
                size="xlarge"
                shape="circle"
                className="mb-3"
              />
              <h3 className="mt-0 mb-2">Team Member 2</h3>
              <p className="text-gray-600 mb-0">UI/UX Designer</p>
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card className="shadow-2">
            <div className="flex flex-column align-items-center text-center">
              <Avatar
                icon="pi pi-user"
                size="xlarge"
                shape="circle"
                className="mb-3"
              />
              <h3 className="mt-0 mb-2">Team Member 3</h3>
              <p className="text-gray-600 mb-0">Backend Developer</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
