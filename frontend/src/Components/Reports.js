import { useState } from "react";
import { UseAuthorizationContext } from "../hooks/UseAuthorizationContext"

const Reports = () => {

    const {user} = UseAuthorizationContext();

    const [isExporting, setIsExporting] = useState(false);

    const handleReportDownload = async()=>{
        setIsExporting(true);

        const response = await fetch(`${process.env.REACT_APP_RENDER_URL}/api/visitors/export`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-Type": "text/csv"
            },
        });
        
        if(response.ok){

            setIsExporting(false);
            const blob = await response.blob();
        

        // Creating Download link
        const d_link = window.URL.createObjectURL(blob);
        const anchor_tag = document.createElement("a");
        anchor_tag.href=d_link;
        anchor_tag.setAttribute("download", "Visitor.csv");
        document.body.appendChild(anchor_tag);
        anchor_tag.click();
        anchor_tag.remove();
        }
    }
  return (
    <div className='reports'>
        <button type="button" onClick={handleReportDownload} disabled={isExporting}>
            {isExporting ? "Exporting Visitors..." : "Export All Visitors"}
        </button>
    </div>
  )
}

export default Reports