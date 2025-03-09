/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "../../lib/utils";
import uploads from "../../assets/icons/upload.svg";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <img
          src={convertFileToUrl(files[0])}
          alt="uploaded image"
          className="max-h-[100px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <img
            src={uploads}
            alt="upload"
            style={{ height: "40px", width: "40px" }}
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-blue-500">Click to upload</span> or drag and
              drop
            </p>
            <p></p>
          </div>
          SVG, PNG, JPG (max 800×400)
        </>
      )}
    </div>
  );
};

export default FileUploader;
