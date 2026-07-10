"// Small sample CSV string users can download to see the expected format.
export const SAMPLE_CSV = `customer_id,name,signup_date,last_active,mrr,status
C1001,Aarav Patel,2024-01-15,2026-02-01,49.00,active
C1002,Priya Singh,2023-08-10,2025-11-20,29.00,churned
C1003,Liam Chen,2024-06-22,2026-01-28,99.00,active
C1004,Mia Lopez,2024-11-05,2025-12-15,19.00,active
C1005,Noah Khan,2023-05-01,2025-09-01,199.00,churned
`;

export const downloadSampleCsv = () => {
  const blob = new Blob([SAMPLE_CSV], { type: \"text/csv\" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement(\"a\");
  a.href = url;
  a.download = \"sample_customers.csv\";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
"