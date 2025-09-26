import { FormControl } from "@mui/material";
import * as React from "react";
import { useUploadFileMutation } from "../../../Api/CommonApi";
import UploadModal from "../../Loading/Uploadloading";
import { getFileIcon } from "../../display/component/fileIcon";
// import { useEffect } from "react";

type AllowedType =
  | "pdf"
  | "image"
  | "word"
  | "excel"
  | "ppt"
  | "text"
  | "csv"
  | "zip"
  | "video"
  | "audio"
  | "all";

interface Props {
  onChange: (filename: string | null) => void;
    allowFile?: AllowedType[];
    value?:string | null
}

const mimeMap: Record<AllowedType, string[]> = {
  pdf: ["application/pdf"],
  image: ["image/*"],
  word: [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  excel: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  ppt: [
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
  text: ["text/plain"],
  csv: ["text/csv", "application/vnd.ms-excel"],
  zip: ["application/zip", "application/x-zip-compressed"],
  video: ["video/*"],
  audio: ["audio/*"],
  all: ["*/*"],
};

const FormUploadImage: React.FC<Props> = ({
  onChange,
  allowFile = ["all"],
  value,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL + "/uploads/";
    const tempUrl = import.meta.env.VITE_BASE_URL + "/uploads/temp/";
    

  const [isDragging, setIsDragging] = React.useState(false);
  const [isFileUploaded, setIsFileUploaded] = React.useState(false);
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [error, setError] = React.useState<string | null>(null);

  const allowedMimeTypes = allowFile.flatMap((type) => mimeMap[type]);

  const isAllowedFileType = (file: File): boolean => {
    if (allowFile.includes("all")) return true;
    return allowedMimeTypes.some((mime) =>
      mime.endsWith("/*")
        ? file.type.startsWith(mime.split("/")[0] + "/")
        : file.type === mime
    );
  };

  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
    
    



  const handleUpload = async (file: File) => {
    if (!isAllowedFileType(file)) {
      setError("File type not allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsFileUploaded(false);
      setError(null);
      const result = await uploadFile(formData).unwrap();
      const uploadedFileName = result?.fileName;
      setFileUrl(uploadedFileName);
      onChange(uploadedFileName);
      setIsFileUploaded(true);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error("Upload error:", err);
    }
  };


  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleUpload(file);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleUpload(file);
  };

  const inputAccept = allowFile.includes("all")
    ? "*/*"
    : allowedMimeTypes.join(",");

 
  return (
    <FormControl
      component="fieldset"
      style={{
        position: "relative",
        height: "200px",
        border: isDragging ? "2px solid #007bff" : "2px dashed #606060",
        backgroundColor: isDragging ? "#f0f0f0" : "#dedede",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        transition: "border 0.2s ease-in-out",
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label
        htmlFor="file-input"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : isLoading ? (
          "Uploading..."
        ) : isFileUploaded ? (
          "File Uploaded Successfully!"
        ) : isDragging ? (
          "Drop file here"
        ) : (
          "Drag & Drop or Click to Upload a File"
        )}
      </label>

      <input
        id="file-input"
        type="file"
        accept={inputAccept}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "pointer",
        }}
        onChange={handleFileChange}
      />
      {(fileUrl || value) && (
        <div style={{ position: "relative", width: "100%", height: "90%" }}>
          {!imageError ? (
      <img
        src={fileUrl === null ? `${baseUrl}${value}` : `${tempUrl}${fileUrl}`}
        alt="Uploaded Preview"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        onError={() => setImageError(true)}
      />
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {getFileIcon(value || fileUrl || "", 48)}
      </div>
    )}
        </div>
      )}

      <UploadModal isOpen={isLoading} />
    </FormControl>
  );
};

export default FormUploadImage;
