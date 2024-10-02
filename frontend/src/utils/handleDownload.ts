import axios from "axios";

const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await axios.get(fileUrl, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Create a virtual anchor element
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;

      // Simulate a click on the anchor element to trigger the download
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      // Release the Object URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  export default handleDownload;