import { useState, useEffect } from "react";
import { client } from "../../client"
import "./Navbar.scss";
  

const DownloadResume = () => {
    const [files, setFiles] = useState([]);
    console.log('files: ', files);

  useEffect(() => {
    const fetchFiles = async () => {
      const query = `*[_type == "resume"] { title, "fileUrl": file.asset->url }`;
      const data = await client.fetch(query);
      setFiles(data);
    };

    fetchFiles();
  }, []);

  const handleDownload = (fileUrl, fileName) => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", fileName || "download");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => console.error("Download error:", error));
  };

  return (
    <button type="button" className="p-text" onClick={() => handleDownload(files[0].fileUrl, files[0].title)}>
    Download Resume
</button>
  )
}

export default DownloadResume;
