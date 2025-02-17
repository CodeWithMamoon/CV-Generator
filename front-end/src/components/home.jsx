import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../style/home.css";

export default function Home() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    linkedin: "",
    github: "",
    skills: "",
    education: "",
    certifications: "",
    languages: "",
    summary: "",
    profilePic: null,
    experience: [],
  });

  const [showCV, setShowCV] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...userData.experience];
    updatedExperience[index][field] = value;
    setUserData({ ...userData, experience: updatedExperience });
  };

  const addExperience = () => {
    setUserData({
      ...userData,
      experience: [...userData.experience, { company: "", role: "", startDate: "", endDate: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCV(true);
  };

  const handleEdit = () => {
    setShowCV(false);
  };

  const generatePDF = () => {
    const cvElement = document.getElementById("cv-template");
    const buttons = document.querySelectorAll(".noprint");
    buttons.forEach((btn) => (btn.style.display = "none"));

    html2canvas(cvElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.text("Developer:Muhammad Mamoon", 10, pdf.internal.pageSize.height - 10);
      pdf.save("Your_CV.pdf");
      buttons.forEach((btn) => (btn.style.display = "block"));
    });
  };

  return (
    <div className="container">
      <h1>Professional CV Generator</h1>
      {!showCV ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" onChange={handleChange} placeholder="Full Name" required />
          <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
          <input type="text" name="contact" onChange={handleChange} placeholder="Contact Number" required />
          <input type="text" name="address" onChange={handleChange} placeholder="Address" />
          <input type="text" name="linkedin" onChange={handleChange} placeholder="LinkedIn Profile" />
          <input type="text" name="github" onChange={handleChange} placeholder="GitHub Profile" />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <textarea name="summary" onChange={handleChange} placeholder="Professional Summary"></textarea>
          <textarea name="skills" onChange={handleChange} placeholder="Skills (comma separated)"></textarea>
          <textarea name="education" onChange={handleChange} placeholder="Education (comma separated)"></textarea>
          <textarea name="certifications" onChange={handleChange} placeholder="Certifications (comma separated)"></textarea>

          <h3>Work Experience</h3>
          {userData.experience.map((exp, index) => (
            <div key={index}>
              <input type="text" placeholder="Company Name" onChange={(e) => handleExperienceChange(index, "company", e.target.value)} />
              <input type="text" placeholder="Role" onChange={(e) => handleExperienceChange(index, "role", e.target.value)} />
              <input type="date" placeholder="Start Date" onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)} />
              <input type="date" placeholder="End Date" onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={addExperience}>Add More Experience</button>

          <button type="submit">Generate CV</button>
        </form>
      ) : (
        <div className="cv-container">
          <div id="cv-template" className="cv-template">
            <div className="cv-header">
              {userData.profilePic && <img src={userData.profilePic} alt="Profile" className="profile-pic" />}
              <div className="header-info">
                <h2>{userData.name}</h2>
                <p>Email: {userData.email} | Contact: {userData.contact}</p>
                <p>Linkedin: <a href={userData.linkedin} target="_blank" rel="noopener noreferrer">{userData.linkedin}</a></p>
                <p>GitHub: <a href={userData.github} target="_blank" rel="noopener noreferrer">{userData.github}</a></p>
              </div>
            </div>
            <div className="cv-body">
              {userData.summary && <h3>Summary</h3>}
              <p>{userData.summary}</p>
              {userData.skills && <h3>Skills</h3>}
              <ul>{userData.skills.split(",").map((skill, index) => <li key={index}>{skill.trim()}</li>)}</ul>
              {userData.experience.length > 0 && <h3>Experience</h3>}
              <ul>{userData.experience.map((exp, index) => <li key={index}>{exp.company} - {exp.role} ({exp.startDate} to {exp.endDate})</li>)}</ul>
              {userData.education && <h3>Education</h3>}
              <ul>{userData.education.split(",").map((edu, index) => <li key={index}>{edu.trim()}</li>)}</ul>
              {userData.certifications && <h3>Certifications</h3>}
              <ul>{userData.certifications.split(",").map((cert, index) => <li key={index}>{cert.trim()}</li>)}</ul>
            </div>
            <div className="btn-group">
              <button onClick={generatePDF} className="btn-green noprint">Download PDF</button>
              <button onClick={handleEdit} className="btn-gray noprint">Edit CV</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
