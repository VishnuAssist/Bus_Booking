import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface BulkImportDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
}

const BulkImportDialog: React.FC<BulkImportDialogProps> = ({ open, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("Please select a CSV file.");
      return;
    }
    setIsUploading(true);
    try {
      await onUpload(selectedFile);
      toast.success("Bulk import successful!");
      setSelectedFile(null);
      onClose();
    } catch (error) {
      toast.error("Bulk import failed.");
      console.error("Bulk import error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Bulk Import Sales</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Upload a CSV file with sales data. Columns must match backend expectations.
          </Typography>
          <Box mt={2}>
            <input type="file" accept=".csv" onChange={handleFileChange} />
          </Box>
          {selectedFile && (
            <Typography mt={1} variant="body2">
              Selected file: <strong>{selectedFile.name}</strong>
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleUpload} 
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BulkImportDialog;
