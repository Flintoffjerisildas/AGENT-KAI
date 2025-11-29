import React from "react";
import InfoCard from "./InfoCard";

export default function ResumeDashboard({ resumeData }) {
  if (!resumeData) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No resume data available yet.
      </div>
    );
  }

  const {
    name,
    location,
    email,
    phone,
    linkedin,
    summary,
    skills = {},
    experience = [],
    education = [],
    certifications = [],
  } = resumeData;

  // Normalize arrays
  const safeEducation = Array.isArray(education) ? education : [education];
  const safeExperience = Array.isArray(experience) ? experience : [experience];
  const safeCertifications = Array.isArray(certifications)
    ? certifications
    : [certifications];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fbff] to-[#eef3ff] p-8 rounded-3xl shadow-inner overflow-y-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
        Dashboard of {name || "Candidate"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Personal Info */}
        <InfoCard
          title="Personal Details"
          data={{
            Name: name,
            Location: location,
            Email: email,
            Phone: phone,
            LinkedIn: linkedin,
          }}
          className="col-span-1"
        />

        {/* Summary */}
        <InfoCard
          title="Professional Summary"
          data={{ Summary: summary }}
          className="col-span-2"
        />

        {/* Skills */}
        <InfoCard
          title="Skills"
          data={{
            "Design Tools": skills?.designTools?.join?.(", "),
            "Frontend": skills?.frontend?.join?.(", "),
            "Soft Skills": skills?.softSkills?.join?.(", "),
          }}
          className="col-span-1"
        />

        {/* Experience */}
        <InfoCard
          title="Experience"
          data={Object.fromEntries(
            safeExperience.map((exp, i) => [
              exp.role || `Experience ${i + 1}`,
              `${exp.company || ""} ${exp.period ? `(${exp.period})` : ""}`,
            ])
          )}
          className="col-span-1"
        />

        {/* Education */}
        <InfoCard
          title="Education"
          data={Object.fromEntries(
            safeEducation.map((ed, i) => [
              ed.degree || `Education ${i + 1}`,
              ed.institution || "",
            ])
          )}
          className="col-span-1"
        />

        {/* Certifications */}
        <InfoCard
          title="Certifications"
          data={Object.fromEntries(
            safeCertifications.map((c, i) => [`#${i + 1}`, c])
          )}
          className="col-span-1"
        />
      </div>
    </div>
  );
}
