import axios from "axios";

const API_BASE = "http://localhost:8000"; // change if your backend runs elsewhere

export const sendEmailWithReport = async (email: string, name: string, pdfBlob: Blob) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);
  formData.append("report", pdfBlob, `${name}_DR_Report.pdf`);

  return axios.post(`${API_BASE}/send-report`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
