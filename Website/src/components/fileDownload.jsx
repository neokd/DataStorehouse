import React, { useState } from 'react';

const FileDownload = () => {
    const [fileData, setFileData] = useState(null);

    const handleDownload = async () => {
       await fetch('/files/lego.json')
       .then((response) => response.blob())
       .then((blob) => {
         const url = window.URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = 'lego.json'; // Specify the filename here
         link.click();
         window.URL.revokeObjectURL(url);
       })
       .catch((error) => {
         // Handle any errors
       });
     

    };

    return (
        <div>
            <button onClick={handleDownload}>Download File</button>
            {fileData && (
                <div>
                    {/* Display the downloaded file data */}
                    <pre>{JSON.stringify(fileData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FileDownload;
